import { tryCatch } from "../utils/tryCatch.js";
import User from "../models/user.js";
import CryptoJS from "crypto-js";
import AppError from "../AppError.js";
import jwt from "jsonwebtoken";
import { matchedData, validationResult } from "express-validator";

export const register = tryCatch(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new AppError(100, "validation Error", 400, result.array());
  }
  const data = matchedData(req);
  const password = CryptoJS.AES.encrypt(
    data.password,
    process.env.HASHING_STRING
  ).toString();

  const newUser = new User({
    username: data.username,
    email: data.email,
    password,
  });
  const savedUser = await newUser.save();
  const accessToken = jwt.sign(
    {
      id: savedUser._id,
      isAdmin: savedUser.isAdmin,
    },

    process.env.JWT_SECRET,
    { expiresIn: "90d" }
  );
  res.status(200).json({ info: savedUser, accessToken });
});

export const login = tryCatch(async (req, res) => {
  const { username } = req.body;

  const findUser = await User.findOne({ username });
  if (!findUser) {
    throw new AppError(400, "user not Found", 400);
  }
  const hashedPassword = CryptoJS.AES.decrypt(
    findUser.password,
    process.env.HASHING_STRING
  ).toString(CryptoJS.enc.Utf8);
  if (req.body.password !== hashedPassword) {
    throw new AppError(400, "wrong password", 401);
  }

  const accessToken = jwt.sign(
    {
      id: findUser._id,
      isAdmin: findUser.isAdmin,
    },

    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  const { password, ...info } = findUser._doc;
  res.status(200).json({ info, accessToken });
});
