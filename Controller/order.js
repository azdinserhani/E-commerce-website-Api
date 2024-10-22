import { tryCatch } from "../utils/tryCatch.js";
import Orders from "../models/order.js";
import { matchedData, validationResult } from "express-validator";
import AppError from "../AppError.js";

//create order
export const createOrder = tryCatch(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new AppError(100, "validation Error", 400, result.array());
  }
  const data = matchedData(req);
  console.log(data);

  const newOrder = new Orders({
    userId: req.user._id,
    products: data.products,
  });
  // const savedOrder = await newOrder.save();
  res.status(200).json({
    status: "succuss",
    data: savedOrder,
  });
});

//update order
export const updateOrder = tryCatch(async (req, res) => {
  const updatedOrder = await Orders.findByIdAndUpdate(
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
    data: updatedOrder,
  });
});

//delete order
export const deleteOrder = tryCatch(async (req, res) => {
  await Orders.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "succuss",
    data: "order has been deleted",
  });
});

//find order by user ID
export const getOrder = tryCatch(async (req, res) => {
  const findOrder = await Orders.find({ userId: req.params.userId })
    .populate({
      path: "products.productId",
      select: ["img", "title"],
    })
    .populate({
      path: "userId", // Populate the userId field to get user info
      select: "username email", // Include the fields you need from the User model
    });

  if (findOrder.isEmpty) {
    throw new AppError(200, "Order not found", 400);
  }

  res.status(200).json({
    status: "succuss",
    data: findOrder,
  });
});
export const getOrderById = tryCatch(async (req, res) => {
  const findOrder = await Orders.findById(req.params.id)
    .populate({
      path: "products.productId",
      select: ["img", "title"],
    })
    .populate({
      path: "userId", // Populate the userId field to get user info
      select: "username email", // Include the fields you need from the User model
    });

  if (findOrder.isEmpty) {
    throw new AppError(200, "Order not found", 400);
  }

  res.status(200).json({
    status: "succuss",
    data: findOrder,
  });
});

//get all order
export const getAllOrder = tryCatch(async (req, res) => {
  const findOrder = await Orders.find();

  if (findOrder.isEmpty) {
    throw new AppError(200, "Order not found", 400);
  }

  res.status(200).json({
    status: "succuss",
    data: findOrder,
  });
});

//get income

export const getIncome = tryCatch(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const income = await Orders.aggregate([
    {
      $match: {
        createdAt: { $gte: prevMonth },
      },
    },
    {
      $project: {
        month: {
          $month: "$createdAt",
        },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  res.status(200).json({
    status: "succuss",
    data: income,
  });
});


