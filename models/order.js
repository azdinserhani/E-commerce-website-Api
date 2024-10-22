import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
          ref: "Product", // Referencing the Product model
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: "Pending" },
    paymentMethod: { type: String, required: true },
    shippingAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Order", OrderSchema);

export default Orders;
