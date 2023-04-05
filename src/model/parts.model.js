import mongoose from "mongoose";
const partsSchema = mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
  is_Active: {
    type: Boolean,
    default: true
  },
} , {timestamps: true} );
const Parts = mongoose.model('parts',partsSchema);
export default Parts;
