import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    limitAmount: {
      type: Number,
      required: [true, "Please provide budget limit"],
      min: 0,
    },
    spentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    alertThreshold: {
      type: Number,
      default: 80,
      min: 0,
      max: 100,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Unique index for user, category, month, year combination
budgetSchema.index(
  { userId: 1, category: 1, month: 1, year: 1 },
  { unique: true },
);

export default mongoose.model("Budget", budgetSchema);
