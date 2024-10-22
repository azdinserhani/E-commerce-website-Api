import express from "express";
import { webHookHandler } from "../Controller/webHookhandler.js";
import bodyParser from "body-parser";
const router = express.Router();

router.post(
  "/webHook",
  bodyParser.raw({ type: "application/json" }),
  webHookHandler
);

export default router;
