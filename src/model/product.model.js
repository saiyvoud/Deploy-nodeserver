import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    detail: {
      type: String,
      default: "",
    },
    amount: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
      type: String,
      default: "",
    },
    is_Active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("product", productSchema);
export default Product;
