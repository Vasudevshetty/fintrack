import mongoose from "mongoose";

const creditCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardName: {
      type: String,
      required: [true, "Please provide card name"],
      maxlength: [50, "Card name cannot exceed 50 characters"],
    },
    cardNumber: {
      type: String,
      required: [true, "Please provide card number"],
      unique: true,
    },
    cardHolder: {
      type: String,
      required: [true, "Please provide cardholder name"],
    },
    expiryDate: {
      type: String,
      required: [true, "Please provide expiry date"],
    },
    cardType: {
      type: String,
      enum: ["Visa", "Mastercard", "Amex", "Discover"],
      required: true,
    },
    creditLimit: {
      type: Number,
      required: [true, "Please provide credit limit"],
      min: 0,
    },
    currentBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("CreditCard", creditCardSchema);
