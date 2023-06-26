import mongoose from "mongoose";
import { Models } from "../model/index.js";
import { EMessage, Status } from "../service/message.js";
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
        return SendError400(res, EMessage.Please_input + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError401(res, "Not Found UserId");
      }
      const user = Models.User.findById(userId);
      if (!mongoose.Types.ObjectId.isValid(partsId)) {
        return SendError401(res, "Not Found PartsId");
      }
      const parts = await Models.Parts.findById(partsId);
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return SendError401(res, "Not Found AddressId");
      }
        const isMatch = await CheckPric(parts.price, priceTotal);
        if(!isMatch){
          SendError400(res, "Not Match Price");
        }
       await Models.Address.findById(addressId);

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
      return SendSuccess(res, "Insert Order Successful", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Insert Order", error);
    }
  }
  static async getAll(req, res) {
    try {
      const order = await Models.Order.find({ is_Active: true });
      return SendSuccess(res, "Get All Order Successful", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get All Order", error);
    }
  }
  static async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return SendError401(res, "Not Found Order ID");
      }
      const order = await Models.Order.findById(id);
      return SendSuccess(res, "Get One Order Successful", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Order", error);
    }
  }
  static async getOrderStatusAwait(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError401(res, "Not Found User ID");
      }
      const order = await Models.Order.find({
        userId: userId,
        is_Active: true,
        status: Status.await,
      }).populate({
        path: "userId addressId partsId",
        select:
          "fisrtName lastName phoneNumber profile village district province name detail amount price image ",
      });
      return SendSuccess(res, "Get Order Status Await Successful", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Order Status Await", error);
    }
  }
  static async getOrderStatusPadding(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError401(res, "Not Found User ID");
      }
      const order = await Models.Order.find({
        is_Active: true,
        userId: userId,
        status: Status.padding,
      }).populate({
        path: "userId addressId partsId",
        select:
          "fisrtName lastName phoneNumber profile village district province name detail amount price image ",
      });
      return SendSuccess(res, "Get Order Status Padding Successful", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Order Status Padding", error);
    }
  }
  static async getOrderStatusSuccess(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError401(res, "Not Found User ID");
      }
      const order = await Models.Order.find({
        is_Active: true,
        userId: userId,
        status: Status.success,
      }).populate({
        path: "userId addressId partsId",
        select:
          "fisrtName lastName phoneNumber profile village district province name detail amount price image ",
      });
      return SendSuccess(res, "Get Order Status Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Order Status Success", error);
    }
  }
  static async getOrderStatusCancel(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError401(res, "Not Found User ID");
      }
      const order = await Models.Order.find({
        is_Active: true,
        userId: userId,
        status: Status.cancel,
      }).populate({
        path: "userId addressId partsId",
        select:
          "fisrtName lastName phoneNumber profile village district province name detail amount price image ",
      });
      return SendSuccess(res, "Get Order Status Cancel Successful", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Order Status Cancel", error);
    }
  }
  static async updateOrderStatusPadding(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError401(res, "Not Found Order ID");
      }
      const order = await Models.Order.findByIdAndUpdate(orderId, {
        status: Status.padding,
      });
      if (!order) {
        return SendError401(res, "Not Found Order ID");
      }
      return SendSuccess(res, "Update Status Padding Successful", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Status Padding", error);
    }
  }
  static async updateOrderStatusSuccess(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        SendError401(res, "Not Found Order ID");
      }
      const order = await Models.Order.findByIdAndUpdate(orderId, {
        status: Status.success,
      });
      return SendSuccess(res, "Update Status Success", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Status Success", error);
    }
  }
  static async updateOrderStatusCancel(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        SendError401(res, "Not Found Order ID");
      }
      const order = await Models.Order.findByIdAndUpdate(orderId, {
        status: Status.cancel,
      });
      return SendSuccess(res, "Update Status Cancel", order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Update Status Cancel", error);
    }
  }
}
