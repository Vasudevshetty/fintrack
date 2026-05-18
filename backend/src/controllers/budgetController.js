import Budget from "../models/Budget.js";

export const createBudget = async (req, res, next) => {
  try {
    const { category, limitAmount, month, year, alertThreshold } = req.body;

    const budget = await Budget.create({
      userId: req.user.id,
      category,
      limitAmount,
      month,
      year,
      alertThreshold,
    });

    res.status(201).json({
      success: true,
      budget,
    });
  } catch (error) {
    next(error);
  }
};

export const getBudgets = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const query = { userId: req.user.id };

    if (month) query.month = month;
    if (year) query.year = parseInt(year);

    const budgets = await Budget.find(query).sort({ category: 1 });

    res.json({
      success: true,
      budgets,
    });
  } catch (error) {
    next(error);
  }
};

export const getBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget || budget.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({
      success: true,
      budget,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBudget = async (req, res, next) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget || budget.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Budget not found" });
    }

    budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      budget,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget || budget.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Budget not found" });
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Budget deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
};
