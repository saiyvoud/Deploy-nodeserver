import { EMessage } from "../service/message.js";
import { SendError400, SendError500 } from "../service/response.js";
import { VerifyToken } from "../service/service.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) return SendError400(res, EMessage.NotFoundToken);
    const user = await VerifyToken(token);
    if (!user) return SendError400(res, EMessage.InvaildToken);
    // res.locals._id = user._id;
    next();
  } catch (error) {
    console.log(err);
    SendError500(res, "Error", error);
  }
};
