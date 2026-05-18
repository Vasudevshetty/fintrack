import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreditCard",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide transaction description"],
      maxlength: [100, "Description cannot exceed 100 characters"],
    },
    category: {
      type: String,
      enum: [
        "Food & Dining",
        "Shopping",
        "Transportation",
        "Entertainment",
        "Bills & Utilities",
        "Healthcare",
        "Education",
        "Travel",
        "Other",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
      min: 0,
    },
    transactionDate: {
      type: Date,
      required: [true, "Please provide transaction date"],
    },
    merchant: {
      type: String,
      required: [true, "Please provide merchant name"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Completed",
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
