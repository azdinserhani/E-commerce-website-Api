import { tryCatch } from "../utils/tryCatch.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY);
export const payment = tryCatch(async (req, res) => {
  const { products } = req.body;

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
  const productMetaData = products.products.map((item) => ({
    productId: item._id,
    quantity: item.quantity,

    price: item.price,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/",
    cancel_url: "http://localhost:5173/failed",
    shipping_address_collection: {
      allowed_countries: ["MA"],
    },
    payment_intent_data: {
      metadata: {
        userId: req.user.id,
        products: JSON.stringify(productMetaData),
      },
    },
  });

  res.status(200).json({ id: session.id });
});
