import mongoose from "mongoose";
import UploadImageFormData from "../config/cloudinarys.js";
import { Models } from "../model/index.js";
import { EMessage, Status } from "../service/message.js";
import {
  SendError400,
  SendError401,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { CheckPric } from "../service/service.js";
import { ValidateData, ValidateOrder } from "../service/validate.js";

export default class OrderController {
  static async insert(req, res) {
    try {
      const { products, addressId, totalPrice } = req.body;
      const user = req.user;
      const validate = ValidateData({
        products,
        addressId,
        totalPrice,
      });
      if (validate.length > 0) {
        return SendError400(res, EMessage.Please_input + validate.join(","));
      }

      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return SendError401(res, "Not Found addressID");
      }
      const billQR = req.files;
      if (!billQR) return SendError400(res, "billQR is required!");
      const image_url = await UploadImageFormData(billQR.billQR.data);
      if (!image_url) return SendError400(res, "Error Upload billQR");
      console.log(products);
      const order = await Models.Order.create({
        userId: user,
        products: products,
        addressId,
        totalPrice,
        billQR: image_url,
      });

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
