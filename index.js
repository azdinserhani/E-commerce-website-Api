import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/authRoute.js";
import userRoute from "./Routes/userRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoute from "./Routes/productRoute.js";
import orderRoute from "./Routes/orderRoute.js";
import cartRoute from "./Routes/cartRoute.js";
import paymentRoute from "./Routes/stripeRoute.js";
import webhookRoute from "./Routes/webHookRoute.js";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected success");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment", paymentRoute);
app.use("/api", webhookRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server run in port : ${port}`);
});
