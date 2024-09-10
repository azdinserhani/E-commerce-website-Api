import express from "express";
import { login, register } from "../Controller/auth.js";
import {checkSchema} from "express-validator"
import { createUserSchema } from "../utils/validationSchema.js";

const router = express.Router();

router.post("/register",checkSchema(createUserSchema), register);
router.post("/login", login);
export default router;
