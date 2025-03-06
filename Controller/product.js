import AppError from "../AppError.js";
import Orders from "../models/order.js";
import Product from "../models/productModel.js";
import APiFeatures from "../utils/ApiFeatures.js";
import { tryCatch } from "../utils/tryCatch.js";
//create product
export const createProduct = tryCatch(async (req, res) => {
  const {
    title,
    desc,
    img,
    category,
    colors,
    price,
    isStock,
    quantity,
    brand,
    battery,
  } = req.body;
  const newProduct = new Product({
    title,
    desc,
    img,
    category,
    colors,
    price,
    isStock,
    quantity,
    brand,
    battery,
  });
  const savedProduct = await newProduct.save();
  res.status(200).json({
    status: "success",
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
export const getAllProduct = tryCatch(async (req, res, next) => {
  const features = new APiFeatures(Product.find(), req.query)
    .filter()
    .sorting()
    .limiting()
    .pagination();
  const productsData = await features.query;

  res.status(200).json({
    status: "success",
    result: productsData.length,
    data: { products: productsData },
  });
});

export const getTopSellingProducts = tryCatch(async (req, res) => {
  const topSellingProducts = await Orders.aggregate([
    {
      $unwind: "$products", // Unwind the products array
    },
    {
      $addFields: {
        "products.productId": {
          $convert: {
            input: "$products.productId",
            to: "objectId", // Convert productId to ObjectId
            onError: null, // Handle conversion errors gracefully
            onNull: null,
          },
        },
      },
    },
    {
      $lookup: {
        from: "products", // The name of the products collection
        localField: "products.productId", // After conversion, productId is now ObjectId
        foreignField: "_id", // Match with the _id in the products collection
        as: "productDetail",
      },
    },
    {
      $unwind: "$productDetail", // Unwind the productDetail array
    },
    {
      $group: {
        _id: "$productDetail.title", // Group by product name
        totalQuantity: { $sum: "$products.quantity" }, // Sum the quantity of each product
        totalAmount: { $sum: "$totalAmount" }, // Optionally sum total amounts if needed
        price: { $first: "$products.price" },
        img: { $first: "$productDetail.img" },
      },
    },
    {
      $sort: { totalQuantity: -1 }, // Sort by total quantity to get top-selling products
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: topSellingProducts,
  });
});
