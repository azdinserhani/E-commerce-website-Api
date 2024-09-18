import { tryCatch } from "../utils/tryCatch.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY);
export const payment = tryCatch(async (req, res) => {
  const { products } = req.body;
  console.log(process.env.SECRET_KEY);

  console.log(products);

  const lineItems = products.products.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        images: [item.img],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/",
    cancel_url: "http://localhost:5173/failed",
  });
  res.status(200).json({ id: session.id });
});
