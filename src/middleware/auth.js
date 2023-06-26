import { SECRET_KEY } from "../config/globalKey.js";
import { EMessage } from "../service/message.js";
import { SendError400, SendError500 } from "../service/response.js";
import { VerifyToken } from "../service/service.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers['token'];
    if (!token) return SendError400(res, EMessage.NotFoundToken);
    const user = await VerifyToken(token);
    if (!user) return SendError400(res, EMessage.InvaildToken);
     res.locals._id = user._id;
    next();
  } catch (error) {
    console.log(error);
    SendError500(res, "Error", error);
  }
};
export const jwtVerify = async (header) => {
  try {
    if (!header.authorization) throw null;
    let authorization = header.authorization.split(" ");
    if (authorization.length > 1) {
      authorization = authorization[1];
    } else {
      authorization = authorization[0];
    }
    const decoded = verify(authorization, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log("jwtVerify===> ", error);
    return null;
  }
};
