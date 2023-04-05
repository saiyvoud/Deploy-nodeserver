import { EMessage } from "../service/message.js";
import {
  SendError400,
  SendError401,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateParts } from "../service/validate.js";
import { Models } from "../model/index.js";
import UploadImage from "../config/cloudinary.js";
import mongoose from "mongoose";
export default class PartsController {
  static async insert(req, res) {
    try {
      const { vehicleId, name, detail, amount, price, image } = req.body;
      const validate = ValidateParts(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        SendError400(res, "Error VehilceId Invaild", vehicleId);
      }
      const vehicle = await Models.Vehicle.findById(vehicleId);
      if (!vehicle) {
        SendError401(res, "Not Found VehicleId", vehicle);
      }
      const imageUrl = await UploadImage(image);
      if (!imageUrl) {
        SendError400(res, "You Must File Base64");
      }
      const parts = await Models.Parts.create({
        vehicleId: vehicle,
        name,
        detail,
        amount,
        price,
        image: imageUrl,
      });
      SendSuccess(res, "Insert Parts Successful", parts);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert Parts", error);
    }
  }
  static async getOne(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        SendError401(res, "Error ID Invalid");
      }
      const parts = await Models.Parts.findById(id).populate({
        path: "vehicleId",
        select: "name vehicleType image createdAt updatedAt",
      });
      if (!parts) {
        SendError401(res, "Not Found Parts");
      }
      SendSuccess(res, "Get One Parts Successful", parts);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get One Parts");
    }
  }
  static async getAll(req, res) {
    try {
      const parts = await Models.Parts.find({ is_Active: true })
      .populate({
        path: "vehicleId",
        select: "name vehicleType image createdAt updatedAt",
      });
      console.log(parts);
      if (!parts) {
        SendError401(res, "Not Found Parts");
      }
      SendSuccess(res, "Get All Parts Successful", parts);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get All Parts");
    }
  }
  static async updateParts(req, res) {
    try {
      const id = req.params.id;
      const { vehicleId, name, detail, amount, price, image } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        SendError400(res, "Error ID Invalid");
      }
      if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        SendError400(res, "Error VehicleID Invalid");
      }
      const validate = ValidateParts(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      const partID = await Models.Parts.findById(id);
      const imageUrl = await UploadImage(image, partID.image);
      const parts = await Models.Parts.findByIdAndUpdate(id, {
        vehicleId: partID.vehicleId,
        name,
        detail,
        amount,
        price,
        image: imageUrl,
      });
      SendSuccess(res, "Update Parts Successful", parts);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Update Parts");
    }
  }
  static async deletePart(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        SendError400(res, "Error ID Invalid");
      }
      const parts = await Models.Parts.findByIdAndUpdate(id, {
        is_Active: false,
      });
     return SendSuccess(res, "Delete Parts Successful", parts);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Delete Parts");
    }
  }
}
