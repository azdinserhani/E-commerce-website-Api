import express from "express";
import { verifyAdmin, verifyAuth } from "../middleware/verifyToken.js";
import {
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  updateCart,
} from "../Controller/cart.js";

const router = express.Router();

router.post("/", verifyAuth, createCart);
router.put("/:id", verifyAuth, updateCart);
router.delete("/:id", verifyAuth, deleteCart);
router.get("/find/:userId", verifyAuth, getCart);
router.get("/", verifyAdmin, getAllCart);
export default router;
