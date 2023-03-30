import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { EUserType } from "../service/message.js";
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
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
    password: {
      type: String,
      require: true,
    },
    facebookid: {
      type: String,
    },
    googleid: {
      type: String,
    },
    profile: {
      type: String,
    },
    deviceToken: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
      values: Object.values(EUserType),
      defaultValue: EUserType.customer,
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
userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next();
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next();
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
// userSchema.method.comparePassword = function (loginPassword , cb){
//   bcrypt.compare(loginPassword,this.password), (err,isMatch)=>{
//       if(err) return cb(err)
//       cb(null,isMatch)
//   }
// }

const User = mongoose.model("user", userSchema);
export default User;
