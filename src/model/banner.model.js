import mongoose from "mongoose";
const bannerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    detail: {
      type: String,
      require: true,
    },
    image: {
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

const Banner = mongoose.model('banner',bannerSchema);
export default Banner;
