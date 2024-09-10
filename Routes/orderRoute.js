import express from "express";
import {
  createOrder,
  deleteOrder,
  getIncome,
  getOrder,
  updateOrder,
} from "../Controller/order.js";
const router = express.Router();
import { createOrderSchema } from "../utils/validationSchema.js";
import { checkSchema } from "express-validator";
import {
  verifyAdmin,
  verifyToken,
  verifyAuth,
} from "../middleware/verifyToken.js";

router.post("/", verifyAuth, checkSchema(createOrderSchema), createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyAdmin, deleteOrder);
router.get("/find/:userId", verifyAuth, getOrder);
router.get("/income", verifyAdmin, getIncome);

export default router;
