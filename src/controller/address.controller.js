import mongoose from "mongoose";
import { Models } from "../model/index.js";
import { EMessage } from "../service/message.js";
import {
  SendError400,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateAddress } from "../service/validate.js";

export default class AddressController {
  static async insert(req, res) {
    try {
      const { userId, village, district, province, lattitude, longtitude } =
        req.body;
      const validate = ValidateAddress(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        SendError400(res, "userId Invalid");
      }
      const address = await Models.Address.create({
        userId,
        village,
        district,
        province,
        lattitude,
        longtitude,
      });
      SendSuccess(res, "Insert Address Successful", address);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert Address", error);
    }
  }
  static async getAll(req, res) {
    try {
      const address = Models.Address.find({ is_Active: true });
      SendSuccess(res, "Get All Address Successful", address);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get All Address", error);
    }
  }
}
