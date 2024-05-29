import UploadImageFormData from "../config/cloudinarys.js";
import { Models } from "../model/index.js";
import { EMessage } from "../service/message.js";
import { ValidateProduct } from "../service/validate.js";
import {
  SendError400,
  SendError401,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import mongoose from "mongoose";
export class ProductController {
  static async insert(req, res) {
    try {
      const { category_id, name, detail, price, amount } = req.body;
      const validate = ValidateProduct(req.body);
      if (validate.length > 0) {
        SendError400(res, EMessage.Please_input + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return SendError400(res, "Not Found Category");
      }
      const imagePath = req.files;
      const imageUrl = await UploadImageFormData(imagePath.image.data);
      if (!imageUrl) {
        SendError400(res, "Your Must File Base64");
      }
      const product = await Models.Product.create({
        category_id,
        name,
        detail,
        price,
        amount,
        image: imageUrl,
      });
      SendSuccess(res, "Insert Product Successful", product);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert Product", error);
    }
  }
  static async getProductOne(req, res) {
    try {
      const id = req.params.id;
      const Product = await Models.Product.findOne({ _id: id });
      if (!Product) {
        SendError401(res, "Not Found Product", Product);
      }
      SendSuccess(res, "Get One Product Successful", Product);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get One Product", error);
    }
  }
  static async getProductAll(req, res) {
    try {
      const Product = await Models.Product.find({ is_Active: true });
      if (!Product) {
        SendError401(res, "Not Found Product", Product);
      }
      SendSuccess(res, "Get All Product Successful", Product);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Get All Product", error);
    }
  }
  static async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const { ProductType, name, image } = req.body;
      const validateExit = ValidateProduct(req.body);
      if (validateExit.length > 0) {
        SendError400(res, EMessage.Please_input + validateExit.join(","));
      }
      const validate = await Models.Product.findById(id);
      if (!validate) {
        SendError401(res, "Not Found Product", validate);
      }
      const imageUrl = await UploadImage(image, validate.image);
      if (!imageUrl) {
        SendError401(res, "Your Must File Base64");
      }
      const Product = await Models.Product.findByIdAndUpdate(validate._id, {
        ProductType,
        name,
        image: imageUrl,
      });
      if (!Product) {
        SendError401(res, "Not Found Product", validate);
      }
      SendSuccess(res, "Update Product Successful", Product);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Update Product", error);
    }
  }
  static async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const Product = await Models.Product.findByIdAndUpdate(id, {
        is_Active: false,
      });
      if (!Product) {
        SendError401(res, "Not Found Product");
      }
      SendSuccess(res, "Delete Product Successful", Product);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Delete Product", error);
    }
  }
}
