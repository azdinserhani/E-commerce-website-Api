import { tryCatch } from "../utils/tryCatch.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY);
export const payment = tryCatch(async (req, res) => {
  await stripe.charges.create(
    {
      source: req.body.tokenId,
      currency: "usd",
      amount: req.body.amount,
    },
    (stripeErr, stripRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripRes);
      }
    }
  );
});
