import mongoose from "mongoose";
import { Models } from "../model/index.js";
import { EMessage } from "../service/message.js";
import {
  SendError400,
  SendError401,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { CheckPric } from "../service/service.js";
import { ValidateOrder } from "../service/validate.js";

export default class OrderController {
  static async insert(req, res) {
    try {
      const { userId, partsId, addressId, startTime, priceTotal } = req.body;
      const validate = ValidateOrder(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        SendError401(res, "Not Found UserId");
      }
      const user = Models.User.findById(userId);
      if (!mongoose.Types.ObjectId.isValid(partsId)) {
        SendError401(res, "Not Found PartsId");
      }
      const parts = await Models.Parts.findById(partsId);
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        SendError401(res, "Not Found AddressId");
      }
      //   const isMatch = await CheckPric(parts.price, priceTotal);
      //   if(!isMatch){
      //     SendError400(res, "Not Match Price");
      //   }
      const address = await Models.Address.findById(addressId);

      const order = await Models.Order.create({
        userId,
        partsId,
        addressId,
        priceTotal,
        startTime,
      });
    //   const newOject = Object.assign(
    //     JSON.parse(JSON.stringify(order)),
    //     JSON.parse(JSON.stringify(user)),
    //     JSON.parse(JSON.stringify(parts)),
    //     JSON.parse(JSON.stringify(address)),
    //   );
      SendSuccess(res, "Insert Order Successful", order);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert Order", error);
    }
  }
  static async getAll(req, res) {
    try {
      const order = await Models.Order.find({ is_Active: true });
      SendSuccess(res, "Get All Order Successful", order);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get All Order", error);
    }
  }
  static async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        SendError401(res, "Not Found Order ID");
      }
      const order = await Models.Order.findById(id);
      SendSuccess(res, "Get One Order Successful", order);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get One Order", error);
    }
  }
}
