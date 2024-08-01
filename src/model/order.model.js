import mongoose from "mongoose";
import { Status } from "../service/message.js";
const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    products: [
      {
        productId: {
         type: mongoose.Types.ObjectId,
         ref: 'product'
        },
        name: String,
        detail: String,
        amount: Number,
        price: Number,
        image: String,
        size: String,
      },
    ],
    addressId: {
      type: mongoose.Types.ObjectId,
      ref: "address",
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    billQR: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      values: Object.values(Status),
      default: Status.success,
    },
    is_Active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("order", orderSchema);
export default Order;
