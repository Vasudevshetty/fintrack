import React, { useState, useEffect } from "react";
import { transactionAPI, cardAPI } from "../utils/api";
import { TransactionList, Modal } from "../components";
import { Plus, Filter } from "lucide-react";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    cardId: "",
    category: "",
  });
  const [formData, setFormData] = useState({
    cardId: "",
    description: "",
    category: "Food & Dining",
    amount: "",
    transactionDate: new Date().toISOString().split("T")[0],
    merchant: "",
    notes: "",
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
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchInitialData = async () => {
    try {
      const [cardsRes, transRes] = await Promise.all([
        cardAPI.getCards(),
        transactionAPI.getTransactions(),
      ]);
      setCards(cardsRes.data.cards);
      setTransactions(transRes.data.transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getTransactions(filters);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await transactionAPI.updateTransaction(
          editingTransaction._id,
          formData,
        );
      } else {
        await transactionAPI.createTransaction(formData);
      }
      fetchTransactions();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert(error.response?.data?.message || "Error saving transaction");
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      cardId: transaction.cardId._id || transaction.cardId,
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount,
      transactionDate: transaction.transactionDate.split("T")[0],
      merchant: transaction.merchant,
      notes: transaction.notes,
    });
    setShowModal(true);
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await transactionAPI.deleteTransaction(transactionId);
        fetchTransactions();
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      cardId: "",
      description: "",
      category: "Food & Dining",
      amount: "",
      transactionDate: new Date().toISOString().split("T")[0],
      merchant: "",
      notes: "",
    });
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-end space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Filter by Card
          </label>
          <select
            value={filters.cardId}
            onChange={(e) => setFilters({ ...filters, cardId: e.target.value })}
            className="input"
          >
            <option value="">All Cards</option>
            {cards.map((card) => (
              <option key={card._id} value={card._id}>
                {card.cardName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Filter by Category
          </label>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="input"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card</label>
            <select
              name="cardId"
              value={formData.cardId}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select a card</option>
              {cards.map((card) => (
                <option key={card._id} value={card._id}>
                  {card.cardName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Merchant</label>
            <input
              type="text"
              name="merchant"
              value={formData.merchant}
              onChange={handleChange}
              className="input"
              placeholder="Amazon"
              required
            />
          </div>

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
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input"
              placeholder="100"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              placeholder="Groceries"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="Additional notes..."
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {editingTransaction ? "Update" : "Add"} Transaction
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Transactions;
