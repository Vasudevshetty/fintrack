import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createTransaction);
router.get("/", auth, getTransactions);
router.get("/:id", auth, getTransaction);
router.put("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);

export default router;
