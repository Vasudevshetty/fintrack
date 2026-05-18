import express from "express";
import {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createBudget);
router.get("/", auth, getBudgets);
router.get("/:id", auth, getBudget);
router.put("/:id", auth, updateBudget);
router.delete("/:id", auth, deleteBudget);

export default router;
