import AppError from "../AppError.js";
import Product from "../models/productModel.js";
import APiFeatures from "../utils/ApiFeatures.js";
import { tryCatch } from "../utils/tryCatch.js";
import CryptoJS from "crypto-js";

//create product
export const createProduct = tryCatch(async (req, res) => {
  const { title, desc, img, category, colors, price, isStock } = req.body;
  const newProduct = new Product({
    title,
    desc,
    img,
    category,
    colors,
    price,
    isStock,
  });

  const savedProduct = await newProduct.save();
  res.status(200).json({
    status: "succuss",
    data: savedProduct,
  });
});

//get Product by id
export const getProduct = tryCatch(async (req, res) => {
  const findProduct = await Product.findById(req.params.id);
  if (!findProduct) {
    throw new AppError(400, "Product not found", 400);
  }

  res.status(200).json({
    status: "success",
    data: findProduct,
  });
});

//update Product
export const updateProduct = tryCatch(async (req, res) => {
  const findProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: findProduct,
  });
});

//delete Product
export const deleteProduct = tryCatch(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: "Product has been deleted",
  });
});
//search product
export const searchProduct = tryCatch(async (req, res) => {
  const searchTerm = req.query.q;

  const findProduct = await Product.find({
    title: { $regex: searchTerm, $options: "i" },
  });

  if (findProduct.length === 0) {
    res.status(201).json({
      status: "succuss",
      msg: "No products with this name ",
    });
  }
  res.status(200).json({
    status: "succuss",
    data: findProduct,
  });
});
//get all Product
export const getAllProduct = tryCatch(async (req, res) => {
  const features = new APiFeatures(Product.find(), req.query)
    .filter()
    .sorting()
    .limiting()
    .pagination();
  const products = await features.query;
  res.status(200).json({
    status: "succuss",
    result: products.length,
    data: { products },
  });
});
