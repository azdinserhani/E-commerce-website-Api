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
    battery: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
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
    quantity: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Product", ProductSchema);

export default Products;
