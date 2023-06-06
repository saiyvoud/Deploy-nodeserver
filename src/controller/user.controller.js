import UploadImage from "../config/cloudinary.js";
import { Models } from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendError400,
  SendError401,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import {
  GenerateToken,
  ComparePassword,
  VerifyRefreshToken
} from "../service/service.js";
import {
  ValidateRegister,
  ValidateLogin,
  ValidateUser,
  ValidateRefreshToken,
} from "../service/validate.js";

export default class UserController {
  static async RefreshToken(req, res) {
    try {
      const validate = ValidateRefreshToken(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.Please_input + validate.join(","));
      }
      const { token, refreshToken } = req.body;
      const data = await VerifyRefreshToken(token, refreshToken);
      if (!data) {
        return SendError400(res, "Error RefreshToken");
      }
      return SendSuccess(res, "RefreshToken Success", data);
    } catch (error) {
      return SendError500(res, "Error Server RefreshToken", error);
    }
  }
  static async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;
      const validate = ValidateLogin(req.body);
      if (validate.length > 0) {
        SendError404(res, EMessage.Please_input + validate.join(","));
      }

      const user = await Models.User.findOne({ phoneNumber });

      if (!user) {
        SendError401(
          res,
          EMessage.Not_found_user + "with phone number:" + phoneNumber
        );
      }

      const isMatch = await ComparePassword(user, password);
      if (!isMatch) {
        SendError404(res, EMessage.invaildPhonumberOrPassword, isMatch);
      }
      const token = await GenerateToken(user);
      const data = Object.assign(
        JSON.parse(JSON.stringify(user)),
        JSON.parse(JSON.stringify(token))
      );
      SendSuccess(res, SMessage.Login, data);
    } catch (error) {
      SendError500(res, EMessage.LoginError);
    }
  }

  static async register(req, res) {
    try {
      const { firstName, lastName, phoneNumber, password } = req.body;

      const validate = ValidateRegister(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.Please_input + validate.join(","));
      }
      const checkExist = await Models.User.findOne({ phoneNumber });

      if (checkExist) {
        return SendError401(res, SMessage.PhoneNumbered);
      }
      const newUser = new Models.User({
        firstName,
        lastName,
        phoneNumber,
        password,
      });
      const users = await newUser.save();
      const token = await GenerateToken(users);

      const data = Object.assign(
        JSON.parse(JSON.stringify(users)),
        JSON.parse(JSON.stringify(token))
      );
      SendSuccess(res, SMessage.Register, data);
    } catch (error) {
      console.log(error);
      SendError500(res, EMessage.RegisterError, error);
    }
  }
  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const { firstName, lastName, profile } = req.body;
      const validate = ValidateUser(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      const image = await UploadImage(profile);
      if (!image) {
        SendError400(res, "you must send file base64", image);
      }
      const user = await Models.User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        profile: image,
      });
      SendSuccess(res, "update user successful", user);
    } catch (error) {
      console.log("error update:", error);
      SendError400(res, "update user error", error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await Models.User.findByIdAndUpdate(id, {
        is_Active: false,
      });
      if (!user) {
        SendError401(res, EMessage.Not_found_user);
      }
      SendSuccess(res, "Delete User Successful", user);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Delete User", error);
    }
  }
}
