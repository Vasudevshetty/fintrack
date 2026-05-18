export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getCategoryColor = (category) => {
  const colors = {
    "Food & Dining": "#F59E0B",
    Shopping: "#EC4899",
    Transportation: "#06B6D4",
    Entertainment: "#8B5CF6",
    "Bills & Utilities": "#6366F1",
    Healthcare: "#EF4444",
    Education: "#3B82F6",
    Travel: "#10B981",
    Other: "#6B7280",
  };
  return colors[category] || "#9CA3AF";
};

export const getCardTypeColor = (cardType) => {
  const colors = {
    Visa: "#1434CB",
    Mastercard: "#EB001B",
    Amex: "#006FCF",
    Discover: "#FF6000",
  };
  return colors[cardType] || "#6B7280";
};

export const calculatePercentage = (spent, limit) => {
  if (limit === 0) return 0;
  return Math.min((spent / limit) * 100, 100);
};

export const getCurrentMonth = () => {
  const date = new Date();
  return (date.getMonth() + 1).toString().padStart(2, "0");
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};
