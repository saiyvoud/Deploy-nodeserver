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
      const userId = req.user;
      const { village, district, province, latitude, longitude, detail } =
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
        latitude,
        longitude,
        detail,
      });
      SendSuccess(res, "Insert Address Successful", address);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert Address", error);
    }
  }
  static async updateAddress(req, res) {
    try {
      const addressId = req.params.addressId;
      const userId = req.user;

      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        SendError400(res, "address Invalid");
      }
      const { village, district, province, latitude, longitude, detail } =
        req.body;
      const validate = ValidateAddress(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      const address = await Models.Address.create({
        userId,
        village,
        district,
        province,
        latitude,
        longitude,
        detail,
      });
      SendSuccess(res, "Insert Address Successful", address);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert Address", error);
    }
  }
  static async getAll(req, res) {
    try {
      const address = await Models.Address.find({ is_Active: true });
      SendSuccess(res, "Get All Address Successful", address);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get All Address", error);
    }
  }
  static async getByUser(req, res) {
    try {
      const userId = req.user;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        SendError400(res, "userId Invalid");
      }
      const address = await Models.Address.find({
        is_Active: true,
        userId: userId,
      });
      SendSuccess(res, "Get  Address Success", address);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get  Address", error);
    }
  }
}
