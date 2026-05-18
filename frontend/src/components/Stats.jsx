import React from "react";
import { formatCurrency, calculatePercentage } from "../utils/helpers";

const neonColors = {
  blue: { bg: "bg-neon-cyan/15", text: "text-neon-cyan", border: "border-neon-cyan/40" },
  purple: { bg: "bg-neon-magenta/15", text: "text-neon-magenta", border: "border-neon-magenta/40" },
  green: { bg: "bg-neon-lime/15", text: "text-neon-lime", border: "border-neon-lime/40" },
};

export const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "blue",
  neon = false,
}) => {
  if (neon) {
    const c = neonColors[color] || neonColors.blue;
    return (
      <div className={`neon-card p-6 border-2 ${c.border} hover:shadow-neon transition-shadow`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-neon-muted text-sm uppercase tracking-wider">{title}</p>
            <p className={`text-2xl font-display font-bold mt-2 ${c.text}`}>{value}</p>
            {subtitle && <p className="text-neon-muted text-xs mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg border ${c.border} ${c.bg}`}>
            <Icon size={24} className={c.text} />
          </div>
        </div>
      </div>
    );
  }

  return (
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
};

export const BudgetProgressBar = ({
  category,
  spent,
  limit,
  alertThreshold,
  neon = false,
}) => {
  const percentage = calculatePercentage(spent, limit);
  const isOverBudget = spent > limit;
  const isNearLimit = percentage >= alertThreshold;

  let barColor = neon ? "bg-neon-lime" : "bg-green-500";
  if (isOverBudget) {
    barColor = neon ? "bg-neon-magenta" : "bg-red-500";
  } else if (isNearLimit) {
    barColor = neon ? "bg-amber-400" : "bg-yellow-500";
  }

  const wrapperClass = neon ? "neon-card p-4 mb-4" : "bg-white rounded-lg shadow-md p-4 mb-4";

  return (
    <div className={wrapperClass}>
      <div className="flex justify-between items-center mb-2">
        <h4 className={`font-semibold ${neon ? "text-neon-text font-display" : "text-gray-800"}`}>
          {category}
        </h4>
        <span
          className={`text-sm font-semibold ${isOverBudget ? (neon ? "text-neon-magenta" : "text-red-600") : neon ? "text-neon-muted" : "text-gray-600"}`}
        >
          {formatCurrency(spent)} / {formatCurrency(limit)}
        </span>
      </div>
      <div className={`w-full rounded-full h-2 ${neon ? "bg-neon-bg border border-cyan-500/20" : "bg-gray-200"}`}>
        <div className={`${barColor} h-2 rounded-full transition-all`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isOverBudget && (
        <p className={`text-xs mt-2 ${neon ? "text-neon-magenta" : "text-red-600"}`}>
          Over budget by {formatCurrency(spent - limit)}
        </p>
      )}
    </div>
  );
};

export default { StatCard, BudgetProgressBar };
