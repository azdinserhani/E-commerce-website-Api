import express from "express";
import { payment } from "../Controller/payment.js";
const router = express.Router();

router.post("/",payment)
export default router;
