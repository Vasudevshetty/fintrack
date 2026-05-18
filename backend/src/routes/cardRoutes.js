import express from "express";
import {
  createCreditCard,
  getCreditCards,
  getCreditCard,
  updateCreditCard,
  deleteCreditCard,
} from "../controllers/cardController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createCreditCard);
router.get("/", auth, getCreditCards);
router.get("/:id", auth, getCreditCard);
router.put("/:id", auth, updateCreditCard);
router.delete("/:id", auth, deleteCreditCard);

export default router;
