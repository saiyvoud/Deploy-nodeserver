import UploadImage from "../config/cloudinary.js";
import { Models } from "../model/index.js";
import { EMessage } from "../service/message.js";
import { ValidateVehicle } from "../service/validate.js";
import {
  SendError400,
  SendError401,
  SendError500,
  SendSuccess,
} from "../service/response.js";

export class VehicleController {
  static async insert(req, res) {
    try {
      const { vehicleType, name, image } = req.body;
      const validate = ValidateVehicle(req.body);
      if (validate.length > 0) {
         SendError400(res, EMessage.Please_input + validate.join(","));
      }
      const imageUrl = await UploadImage(image);
      if (!imageUrl) {
         SendError400(res, "Your Must File Base64");
      }
      const vehicle = await Models.Vehicle.create({
        vehicleType,
        name,
        image: imageUrl,
      });
       SendSuccess(res, "Insert Vehicle Successful", vehicle);
    } catch (error) {
      console.log(error);
       SendError500(res, "Error Insert Vehicle", error);
    }
  }
  static async getVehicleOne(req, res) {
    try {
      const id = req.params.id;
      const vehicle = await Models.Vehicle.findOne({ _id: id });
      if (!vehicle) {
         SendError401(res, "Not Found Vehicle", vehicle);
      }
       SendSuccess(res, "Get One Vehicle Successful", vehicle);
    } catch (error) {
      console.log(error);
       SendError500(res, "Error Get One Vehicle", error);
    }
  }
  static async getVehicleAll(req, res) {
    try {
      const vehicle = await Models.Vehicle.find({ is_Active: true });
      if (!vehicle) {
         SendError401(res, "Not Found Vehicle", vehicle);
      }
       SendSuccess(res, "Get All Vehicle Successful", vehicle);
    } catch (error) {
      console.log(error);
       SendError500(res, "Error Get All Vehicle", error);
    }
  }
  static async updateVehicle(req, res) {
    try {
      const id = req.params.id;
      const { vehicleType, name, image } = req.body;
      const validateExit = ValidateVehicle(req.body);
      if (validateExit.length > 0) {
         SendError400(
          res,
          EMessage.Please_input + validateExit.join(",")
        );
      }
      const validate = await Models.Vehicle.findById(id);
      if (!validate) {
         SendError401(res, "Not Found Vehicle", validate);
      }
      const imageUrl = await UploadImage(image, validate.image);
      if(!imageUrl){
         SendError401(res,"Your Must File Base64")
      }
      const vehicle = await Models.Vehicle.findByIdAndUpdate(validate._id, {
        vehicleType,
        name,
        image: imageUrl,
      });
      if(!vehicle){
         SendError401(res, "Not Found Vehicle", validate);
      }
       SendSuccess(res, "Update Vehicle Successful", vehicle);
    } catch (error) {
      console.log(error);
       SendError500(res, "Error Update Vehicle", error);
    }
  }
  static async deleteVehicle(req, res) {
    try {
      const id = req.params.id;
      const vehicle = await Models.Vehicle.findByIdAndUpdate(id, {
        is_Active: false,
      });
      if (!vehicle) {
         SendError401(res, "Not Found Vehicle");
      }
      SendSuccess(res, "Delete Vehicle Successful", vehicle);
    } catch (error) {
      console.log(error);
       SendError500(res, "Error Delete Vehicle", error);
    }
  }
}
