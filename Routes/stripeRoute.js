import express from "express";
import { payment } from "../Controller/payment.js";
import { verifyAuth } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyAuth,payment);
export default router;
