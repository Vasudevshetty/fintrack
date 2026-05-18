import React from "react";
import { formatCurrency, formatDate, getCategoryColor } from "../utils/helpers";
import { Trash2, Edit2 } from "lucide-react";

export const TransactionList = ({
  transactions,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Merchant
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {transactions.map((transaction) => (
            <tr
              key={transaction._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatDate(transaction.transactionDate)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                {transaction.merchant}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                  style={{
                    backgroundColor: getCategoryColor(transaction.category),
                  }}
                >
                  {transaction.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    transaction.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(transaction._id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
