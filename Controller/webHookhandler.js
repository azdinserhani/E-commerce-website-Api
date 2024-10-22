import Orders from "../models/order.js";
import { tryCatch } from "../utils/tryCatch.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY);
export const webHookHandler = tryCatch(async (req, res) => {
  const event = req.body;
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata.userId;
      const products = JSON.parse(paymentIntent.metadata.products);
      // Assuming products are serialized as JSON in metadata
      const totalAmount = paymentIntent.amount; // The total amount charged
      const paymentMethod = paymentIntent.payment_method_types[0]; // Payment method used
      const shippingAddress =
        paymentIntent.shipping.address.city +
        " " +
        paymentIntent.shipping.address.line1 +
        " " +
        paymentIntent.shipping.address.postal_code;

      try {
        const newOrder = await Orders.create({
          userId,
          products,
          totalAmount,
          paymentMethod,
          orderStatus: "paid",
          shippingAddress,
        });
        await newOrder.save();
      } catch (error) {
        console.error("Error saving order:", error);
      }

      break;
    case "payment_method.attached":
      const paymentMethods = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
});

// export const webHookHandler = tryCatch(async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;
//   console.log(req.body);

//   console.log("segnator:", process.env.WEBHOOK_SECRET);

//   // Ensure that the signature exists
//   if (!sig) {
//     console.warn(
//       "No stripe-signature header present; skipping verification for testing"
//     );

//     // Simulate an event for testing if you want to skip verification
//     event = req.body;
//     event.type = "payment_intent.succeeded"; // Simulate event type for testing
//   } else {
//     try {
//       event = await stripe.webhooks.constructEventAsync(
//         req.body,
//         sig,
//         process.env.WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error(`Webhook signature verification failed: ${err.message}`);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//   }
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const paymentIntent = event.data.object;
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       const userId = paymentIntent.metadata.userId;
//       const products = JSON.parse(paymentIntent.metadata.products); // Assuming products are serialized as JSON in metadata
//       const totalAmount = paymentIntent.amount; // The total amount charged
//       const paymentMethod = paymentIntent.payment_method_types[0]; // Payment method used
//       const shippingAddress = paymentIntent;

//       console.log(paymentIntent);

//       await Orders.create({
//         userId,
//         products,
//         totalAmount,
//         paymentMethod,
//         orderStatus: "paid",
//         shippingAddress,
//       });
//       console.log("Order saved:", paymentIntent.id);
//       break;
//     case "payment_method.attached":
//       //   const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   res.json({ received: true });
// });
