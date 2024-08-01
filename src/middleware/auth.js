import { EMessage } from "../service/message.js";
import { SendError400, SendError500 } from "../service/response.js";
import { VerifyToken } from "../service/service.js";

export const auth = async (req, res, next) => {
  try {
    const authorized = req.headers["authorization"];
    if (!authorized) {
      return SendError400(res, EMessage.NotFoundToken);
    }
    const token = authorized.replace("Bearer ", "");
    if (!token) return SendError400(res, EMessage.NotFoundToken);
    const user = await VerifyToken(token);
    const id = JSON.stringify(user._id);
    req.user = id;
    next();
  } catch (error) {
    console.log(error);
    SendError500(res, "Error", error);
  }
};
