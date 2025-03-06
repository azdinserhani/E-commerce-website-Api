import express from "express";
import { payment } from "../Controller/payment.js";
import { verifyAuth, verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken,payment);
export default router;
