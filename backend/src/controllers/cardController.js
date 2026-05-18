import CreditCard from "../models/CreditCard.js";

export const createCreditCard = async (req, res, next) => {
  try {
    const {
      cardName,
      cardNumber,
      cardHolder,
      expiryDate,
      cardType,
      creditLimit,
      color,
    } = req.body;

    const card = await CreditCard.create({
      userId: req.user.id,
      cardName,
      cardNumber,
      cardHolder,
      expiryDate,
      cardType,
      creditLimit,
      color,
    });

    res.status(201).json({
      success: true,
      card,
    });
  } catch (error) {
    next(error);
  }
};

export const getCreditCards = async (req, res, next) => {
  try {
    const cards = await CreditCard.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      cards,
    });
  } catch (error) {
    next(error);
  }
};

export const getCreditCard = async (req, res, next) => {
  try {
    const card = await CreditCard.findById(req.params.id);

    if (!card || card.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({
      success: true,
      card,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCreditCard = async (req, res, next) => {
  try {
    let card = await CreditCard.findById(req.params.id);

    if (!card || card.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Card not found" });
    }

    card = await CreditCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      card,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCreditCard = async (req, res, next) => {
  try {
    const card = await CreditCard.findById(req.params.id);

    if (!card || card.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Card not found" });
    }

    await CreditCard.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Card deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createCreditCard,
  getCreditCards,
  getCreditCard,
  updateCreditCard,
  deleteCreditCard,
};
