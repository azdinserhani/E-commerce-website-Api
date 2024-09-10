import express from "express";
import {
  verifyAdmin,
  verifyAuth,
  verifyToken,
} from "../middleware/verifyToken.js";
import {
  deleteUser,
  getAllUser,
  getUser,
  getUserStat,
  updateUser,
} from "../Controller/user.js";

const router = express.Router();

router.get("/find/:id", verifyAuth, getUser);
router.get("/", verifyAdmin, getAllUser);
router.put("/:id", verifyAuth, updateUser);
router.delete("/:id", verifyAuth, deleteUser);
router.get("/stats", verifyAdmin, getUserStat);
export default router;
