import React, { useState, useEffect } from "react";
import { budgetAPI } from "../utils/api";
import { BudgetProgressBar, Modal } from "../components";
import { Plus } from "lucide-react";
import { getCurrentMonth, getCurrentYear } from "../utils/helpers";

export const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(getCurrentYear());
  const [formData, setFormData] = useState({
    category: "Food & Dining",
    limitAmount: "",
    alertThreshold: 80,
  });

  const categories = [
    "Food & Dining",
    "Shopping",
    "Transportation",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Other",
  ];

  useEffect(() => {
    fetchBudgets();
  }, [month, year]);

  const fetchBudgets = async () => {
    try {
      const response = await budgetAPI.getBudgets({ month, year });
      setBudgets(response.data.budgets);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "limitAmount" || name === "alertThreshold"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        month,
        year,
      };

      if (editingBudget) {
        await budgetAPI.updateBudget(editingBudget._id, data);
      } else {
        await budgetAPI.createBudget(data);
      }

      fetchBudgets();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving budget:", error);
      alert(error.response?.data?.message || "Error saving budget");
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      limitAmount: budget.limitAmount,
      alertThreshold: budget.alertThreshold,
    });
    setShowModal(true);
  };

  const handleDelete = async (budgetId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await budgetAPI.deleteBudget(budgetId);
        fetchBudgets();
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      category: "Food & Dining",
      limitAmount: "",
      alertThreshold: 80,
    });
    setEditingBudget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Budget</span>
        </button>
      </div>

      {/* Month/Year Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-end space-x-4">
        <div>
          <label className="block text-sm font-medium mb-2">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input"
          >
            {Array.from({ length: 12 }, (_, i) =>
              (i + 1).toString().padStart(2, "0"),
            ).map((m) => (
              <option key={m} value={m}>
                {new Date(`2024-${m}-01`).toLocaleString("en-US", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="input"
          >
            {[year - 1, year, year + 1].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budgets List */}
      {loading ? (
        <div className="text-center py-8">Loading budgets...</div>
      ) : budgets.length > 0 ? (
        <div className="space-y-4">
          {budgets.map((budget) => (
            <div
              key={budget._id}
              className="bg-white rounded-lg shadow-md p-6"
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{budget.category}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(budget._id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <BudgetProgressBar
                category={budget.category}
                spent={budget.spentAmount}
                limit={budget.limitAmount}
                alertThreshold={budget.alertThreshold}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">No budgets set for this month</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn-primary"
          >
            Create Your First Budget
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingBudget ? "Edit Budget" : "Add Budget"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Budget Limit
            </label>
            <input
              type="number"
              name="limitAmount"
              value={formData.limitAmount}
              onChange={handleChange}
              className="input"
              placeholder="1000"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Alert Threshold (%)
            </label>
            <input
              type="number"
              name="alertThreshold"
              value={formData.alertThreshold}
              onChange={handleChange}
              className="input"
              min="0"
              max="100"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {editingBudget ? "Update Budget" : "Create Budget"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Budget;
