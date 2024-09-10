import { tryCatch } from "../utils/tryCatch.js";
import Carts from "../models/cart.js";
import AppError from "../AppError.js";

//CREATE CART
export const createCart = tryCatch(async (req, res) => {
  const newCart = new Carts(req.body);
  const savedCart = await newCart.save();
  res.status(200).json({
    status: "succuss",
    data: savedCart,
  });
});

//UPDATE CART
export const updateCart = tryCatch(async (req, res) => {
  const updatedCart = await Carts.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "succuss",
    data: updatedCart,
  });
});

//DELETE CART
export const deleteCart = tryCatch(async (req, res) => {
  await Carts.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "succuss",
    data: "cart has been deleted",
  });
});
//get  CART
export const getCart = tryCatch(async (req, res) => {
  const findCart = await Carts.findOne({ userId: req.params.userId });

  if (!findCart) {
    throw new AppError(200, "Cart not found", 400);
  }
  res.status(200).json({
    status: "succuss",
    data: findCart,
  });
});
//get All  CART
export const getAllCart = tryCatch(async (req, res) => {
  const findCart = await Carts.find();

  res.status(200).json({
    status: "succuss",
    result: findCart.length,
    data: findCart,
  });
});
