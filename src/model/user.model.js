import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { EUserType } from "../service/message.js";
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String, // bee 3 // sasfsdsd /... // 
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    login_version: {
      type: Number,
      default: 1
    },
    password: {
      type: String,
      require: true,  //10 /20
    },
    profile: {
      type: String,
      default: ""
    },
    is_Active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.pre("save", function (next) {
//   let user = this;
//   if (user.isModified("password")) {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) return next();
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         if (err) return next();
//         user.password = hash
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });


const User = mongoose.model("user", userSchema);
export default User;
