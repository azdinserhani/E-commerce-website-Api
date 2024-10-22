import express from "express";
import {
  verifyAdmin,
  verifyAuth,
  verifyToken,
} from "../middleware/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getTopSellingProducts,
  searchProduct,
  updateProduct,
} from "../Controller/product.js";

const router = express.Router();

router.get("/find/:id", verifyAuth, getProduct);
router.post("/", verifyAdmin, createProduct);
router.get("/", verifyAuth, getAllProduct);
router.get("/search", verifyAuth, searchProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);
router.get("/top-selling-products", verifyAdmin, getTopSellingProducts);
export default router;
