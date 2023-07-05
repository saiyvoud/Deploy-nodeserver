import { SECRET_KEY } from "../config/globalKey.js";
import { EMessage } from "../service/message.js";
import { SendError400, SendError500 } from "../service/response.js";
import { VerifyToken } from "../service/service.js";

export const auth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    
    if (!authorization) return SendError400(res, "EMessage.invalidToken");
    const token = authorization.replace("Bearer ", "");
    console.log(token);
    if (!token) return SendError400(res, EMessage.notFound + "token");
    const decode = await VerifyToken(token);
    console.log(decode);
    // const _id = await Decrypt(decode);
    // req.user = _id;
    next();
  } catch (error) {
    console.log(error);
    SendError500(res, "Error", error);
  }
};
export const jwtVerify = async (req,res,header) => {
  try {
    if (!req.header.authorization) throw null;
    let authorization = req.header.authorization.split(" ");
    if (authorization.length > 1) {
      authorization = authorization[1];
    } else {
      authorization = authorization[0];
    }
    const decoded = verify(authorization, SECRET_KEY);
    console.log(decoded);
    next();
  } catch (error) {
    console.log("jwtVerify===> ", error);
    return null;
  }
};
