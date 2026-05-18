import React from "react";
import { formatCurrency } from "../utils/helpers";
import { Trash2, Edit2 } from "lucide-react";

export const CreditCardComponent = ({ card, onEdit, onDelete }) => {
  return (
    <div
      className="relative w-full max-w-sm h-56 rounded-xl p-6 text-white shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
      }}
    >
      {/* Card Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-75">Card</p>
            <p className="text-lg font-semibold">{card.cardName}</p>
          </div>
          <p className="text-xs bg-white bg-opacity-20 px-3 py-1 rounded">
            {card.cardType}
          </p>
        </div>

        {/* Card Number */}
        <div>
          <p className="text-sm opacity-75">Card Number</p>
          <p className="text-lg font-mono tracking-widest">
            •••• •••• •••• {card.cardNumber.slice(-4)}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs opacity-75">Card Holder</p>
            <p className="font-semibold">{card.cardHolder}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-75">Expires</p>
            <p className="font-semibold">{card.expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(card)}
          className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
          title="Edit card"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(card._id)}
          className="p-2 bg-red-500 bg-opacity-80 hover:bg-opacity-100 rounded-lg transition-all"
          title="Delete card"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Balance Info */}
      <div className="absolute bottom-4 right-4 text-right">
        <p className="text-xs opacity-75">Available</p>
        <p className="text-sm font-semibold">
          {formatCurrency(card.creditLimit - card.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default CreditCardComponent;
