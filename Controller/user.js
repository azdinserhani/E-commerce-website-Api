import AppError from "../AppError.js";
import User from "../models/user.js";
import { tryCatch } from "../utils/tryCatch.js";
import CryptoJS from "crypto-js";
//get user by id
export const getUser = tryCatch(async (req, res) => {
  const findUser = await User.findById(req.params.id);
  if (!findUser) {
    throw new AppError(400, "user not found", 400);
  }
  const { password, ...info } = findUser._doc;
  res.status(200).json({
    status: "success",
    data: info,
  });
});

//update user
export const updateUser = tryCatch(async (req, res) => {
  const { ...other } = req.body;
  console.log(req.user);
  
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    // If not an admin, do not allow changing the isAdmin field    
    delete other.isAdmin; // Remove isAdmin from the update object
  }
  

  if (other.password) {
    other.password = CryptoJS.AES.encrypt(
      other.password,
      process.env.HASHING_STRING
    ).toString();
  }
  const findUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: other },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: findUser,
  });
});

//delete user
export const deleteUser = tryCatch(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: "user has been deleted",
  });
});

//get all user
export const getAllUser = tryCatch(async (req, res) => {
  const findUser = await User.find();

  //get user without password
  const userWithoutPass = findUser.map((User) => {
    const { password, ...info } = User._doc;
    return info;
  });
  res.status(200).json({
    status: "success",
    data: userWithoutPass,
  });
});

//get user stat
export const getUserStat = tryCatch(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: lastYear },
      },
    },
    {
      $project: {
        month: {
          $month: "$createdAt",
        },
      },
    },
    {
      $group: {
        _id: "$month",
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: data.sort((a, b) => a._id - b._id),
  });
});
