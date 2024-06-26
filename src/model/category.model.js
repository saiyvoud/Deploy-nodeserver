import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    is_Active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);
export default Category;
