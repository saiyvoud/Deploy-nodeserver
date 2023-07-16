import UploadImage from "../config/cloudinary.js";
import { Models } from "../model/index.js";
import { EMessage } from "../service/message.js";
import { ValidateBanner } from "../service/validate.js";
import {
  SendError400,
  SendError401,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import mongoose from "mongoose";
import { checkPermission } from "../service/service.js";

export class BannerController {
  static async getOne(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError400(res, "Not Found Banner");
      }
      const banner = await Models.Banner.findOne({
        is_Active: true,
        _id: bannerId,
      });
      return SendSuccess(res, "Get One Succee", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One Banner", error);
    }
  }
  static async getAll(req, res) {
    try {
      const banner = await Models.Banner.find({ is_Active: true });
      return SendSuccess(res, "Get All Succee", banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get All Banner", error);
    }
  }
  static async insert(req, res) {
    try {
      // const result = await checkPermission(req.header.auth);
      // if (!result) return SendError401(res,"Uanthorization");
      
      // const validate = ValidateBanner(req.body);
      // if (validate.length > 0) {
      //   SendError400(res, EMessage.Please_input + validate.join(","));
      // }
      if (!req.body.files || Object.keys(req.body.files).length === 0){
        return SendError400(res, "file is required");
      }
      const { name, detail, image } = req.body;
      const imageUrl = await UploadImage(image);
      if (!imageUrl) {
        SendError400(res, "Your must base64", imageUrl);
      }
      const banner = await Models.Banner.create({
        name,
        detail,
        image: imageUrl,
      });
      SendSuccess(res, "Insert Banner Successful", banner);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert Banner", error);
    }
  }
  static async updateBanner(req, res) {
    try {
      const id = req.params.id;
      const bannerID = await Models.Banner.findOne({ _id: id });
      const { name, detail, image } = req.body;
      const validate = ValidateBanner(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      const imageUrl = await UploadImage(image, bannerID.image);
      if (!image) {
        SendError401(res, "Your Must Base64", imageUrl);
      }

      const banner = await Models.Banner.findByIdAndUpdate(bannerID._id, {
        name,
        detail,
        image: imageUrl,
      });
      SendSuccess(res, "Update Banner Successful", banner);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Update Banner", error);
    }
  }
  static async deleteBanner(req, res) {
    try {
      const id = req.params.id;
      const validate = await Models.Banner.findOne({ _id: id });
      if (!validate) {
        SendError401(res, "Not Found Banner");
      }
      const banner = await Models.Banner.findByIdAndUpdate(validate._id, {
        is_Active: false,
      });
      SendSuccess(res, "Delete Banner Successful", banner);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Delete Banner", error);
    }
  }
}
