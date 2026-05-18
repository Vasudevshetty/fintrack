import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
};

export const cardAPI = {
  createCard: (data) => api.post("/cards", data),
  getCards: () => api.get("/cards"),
  getCard: (id) => api.get(`/cards/${id}`),
  updateCard: (id, data) => api.put(`/cards/${id}`, data),
  deleteCard: (id) => api.delete(`/cards/${id}`),
};

export const transactionAPI = {
  createTransaction: (data) => api.post("/transactions", data),
  getTransactions: (params) => api.get("/transactions", { params }),
  getTransaction: (id) => api.get(`/transactions/${id}`),
  updateTransaction: (id, data) => api.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/transactions/${id}`),
};

export const budgetAPI = {
  createBudget: (data) => api.post("/budgets", data),
  getBudgets: (params) => api.get("/budgets", { params }),
  getBudget: (id) => api.get(`/budgets/${id}`),
  updateBudget: (id, data) => api.put(`/budgets/${id}`, data),
  deleteBudget: (id) => api.delete(`/budgets/${id}`),
};

export default api;
