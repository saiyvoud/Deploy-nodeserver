import { SECRET_KEY } from "../config/globalKey.js";
import jwt from 'jsonwebtoken';

export const GenerateToken = (user) => {
  return new Promise(async (resovle, reject) => {
    try {
      let token = jwt.sign(
        {
          _id: user._id,
          phoneNumber: user.phoneNumber,
        },
        `${SECRET_KEY}`,{expiresIn: "7d"}
      );
      // console.log("token=====>", token);
      resovle({ token });
    } catch (error) {
      reject(error);
    }
  });
};
