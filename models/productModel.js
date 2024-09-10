import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    isStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Product", ProductSchema);

export default Products;
