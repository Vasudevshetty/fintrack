import React from "react";
import { formatCurrency, calculatePercentage } from "../utils/helpers";

export const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "blue",
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <Icon size={24} className={`text-${color}-600`} />
      </div>
    </div>
  </div>
);

export const BudgetProgressBar = ({
  category,
  spent,
  limit,
  alertThreshold,
}) => {
  const percentage = calculatePercentage(spent, limit);
  const isOverBudget = spent > limit;
  const isNearLimit = percentage >= alertThreshold;

  let barColor = "bg-green-500";
  if (isOverBudget) {
    barColor = "bg-red-500";
  } else if (isNearLimit) {
    barColor = "bg-yellow-500";
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">{category}</h4>
        <span
          className={`text-sm font-semibold ${isOverBudget ? "text-red-600" : "text-gray-600"}`}
        >
          {formatCurrency(spent)} / {formatCurrency(limit)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${barColor} h-2 rounded-full transition-all`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      {isOverBudget && (
        <p className="text-xs text-red-600 mt-2">
          Over budget by {formatCurrency(spent - limit)}
        </p>
      )}
    </div>
  );
};

export default { StatCard, BudgetProgressBar };
