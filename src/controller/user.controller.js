import { Models } from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendError400,
  SendError401,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { GenerateToken } from "../service/service.js";
import { ValidateRegister } from "../service/validate.js";

export default class UserController {
  static async login(req, res) {
    try {
      const {phoneNumber,password} = req.body;
    } catch (error) {}
  }
  static async register(req, res) {
    try {
      const {firstName,lastName,phoneNumber,password} = req.body;

      const validate = ValidateRegister(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.Please_input+ validate.join(","));
      }
       const checkExist = await Models.User.findOne({phoneNumber})

       if(checkExist){
        return SendError401(res,SMessage.PhoneNumbered)
       }
      const newUser = new Models.User({firstName,lastName,phoneNumber,password});
      const users = await newUser.save();
      const token = await GenerateToken(users);

      const data = Object.assign(
        JSON.parse(JSON.stringify(users)),
        JSON.parse(JSON.stringify(token))
      )
      return SendSuccess(res, SMessage.Register, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.RegisterError, error);
    }
  }
}
