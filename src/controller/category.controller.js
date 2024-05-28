import { Models } from "../model/index.js";
import {
  SendError400,
  SendCreated,
  SendSuccess,
  SendError500,
  SendError404,
} from "../service/response.js";
export default class CategoryController {
  static async getOne(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError400(res, "Not Found category");
      }
      const category = await Models.Category.findOne({
        is_Active: true,
        _id: categoryId,
      });
      return SendSuccess(res, "Get One Succee", category);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get One category", error);
    }
  }
  static async getAll(req, res) {
    try {
      const category = await Models.Category.find({ is_Active: true });
      return SendSuccess(res, "Get All Succee", category);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Get All category", error);
    }
  }
  static async insert(req, res) {
    try {
      const { title } = req.body;
      if (title) {
        return SendError404(res, "title is required!");
      }

      const category = await Models.Category.create({
        title,
      });
      SendSuccess(res, "Insert Category Successful", category);
    } catch (error) {
      console.log(error);
      SendError500(res, "Error Insert category", error);
    }
  }
}
