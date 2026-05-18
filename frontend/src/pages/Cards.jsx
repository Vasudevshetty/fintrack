import React, { useState, useEffect } from "react";
import { cardAPI } from "../utils/api";
import { CreditCardComponent, Modal } from "../components";
import { Plus } from "lucide-react";

export const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cardType: "Visa",
    creditLimit: "",
    color: "#3B82F6",
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await cardAPI.getCards();
      setCards(response.data.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
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
      if (editingCard) {
        await cardAPI.updateCard(editingCard._id, formData);
      } else {
        await cardAPI.createCard(formData);
      }
      fetchCards();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving card:", error);
      alert(error.response?.data?.message || "Error saving card");
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      cardName: card.cardName,
      cardNumber: card.cardNumber,
      cardHolder: card.cardHolder,
      expiryDate: card.expiryDate,
      cardType: card.cardType,
      creditLimit: card.creditLimit,
      color: card.color,
    });
    setShowModal(true);
  };

  const handleDelete = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await cardAPI.deleteCard(cardId);
        fetchCards();
      } catch (error) {
        console.error("Error deleting card:", error);
        alert("Error deleting card");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      cardName: "",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cardType: "Visa",
      creditLimit: "",
      color: "#3B82F6",
    });
    setEditingCard(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Credit Cards</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Card</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading cards...</div>
      ) : cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <CreditCardComponent
              key={card._id}
              card={card}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">No credit cards added yet</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn-primary"
          >
            Add Your First Card
          </button>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingCard ? "Edit Card" : "Add New Card"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Name</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              className="input"
              placeholder="e.g., My Visa Card"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="input"
              placeholder="4111111111111111"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Card Holder
            </label>
            <input
              type="text"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              className="input"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="input"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Card Type
              </label>
              <select
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                className="input"
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Amex">Amex</option>
                <option value="Discover">Discover</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Credit Limit
            </label>
            <input
              type="number"
              name="creditLimit"
              value={formData.creditLimit}
              onChange={handleChange}
              className="input"
              placeholder="10000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Card Color</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {editingCard ? "Update Card" : "Add Card"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Cards;
