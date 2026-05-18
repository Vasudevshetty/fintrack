import Transaction from "../models/Transaction.js";
import CreditCard from "../models/CreditCard.js";
import Budget from "../models/Budget.js";

export const createTransaction = async (req, res, next) => {
  try {
    const {
      cardId,
      description,
      category,
      amount,
      transactionDate,
      merchant,
      notes,
    } = req.body;

    // Verify card belongs to user
    const card = await CreditCard.findById(cardId);
    if (!card || card.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Card not found" });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      cardId,
      description,
      category,
      amount,
      transactionDate,
      merchant,
      notes,
    });

    // Update card balance
    card.currentBalance += amount;
    await card.save();

    // Update budget
    const date = new Date(transactionDate);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const budget = await Budget.findOne({
      userId: req.user.id,
      category,
      month,
      year,
    });

    if (budget) {
      budget.spentAmount += amount;
      await budget.save();
    }

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    const { cardId, category, startDate, endDate, limit = 50 } = req.query;

    const query = { userId: req.user.id };

    if (cardId) query.cardId = cardId;
    if (category) query.category = category;

    if (startDate || endDate) {
      query.transactionDate = {};
      if (startDate) query.transactionDate.$gte = new Date(startDate);
      if (endDate) query.transactionDate.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query)
      .populate("cardId", "cardName")
      .sort({ transactionDate: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate(
      "cardId",
    );

    if (!transaction || transaction.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction || transaction.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction || transaction.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Transaction deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
