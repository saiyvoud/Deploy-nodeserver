import {
  SECRET_KEY,
  JWT_TIMEOUT,
  JWT_REFRECH_TIMEOUT,
} from "../config/globalKey.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Models } from "../model/index.js";
import crypto from "crypto-js";
export const checkPermission = (data) => {
  return new Promise(async (resolve, reject) => {
    // --------- Decript type --------- //
    try {
      let typeDecript = crypto.AES.decrypt(data.type, SECRET_KEY);
      let type = typeDecript.toString(crypto.enc.Utf8);
      if (type) {
        type = type.replace(/"/g, "");
        let user = await Models.User.findOne({
          $and: [
            { _id: data.id },
            { is_active: true },
            //{ login_version: data.login_version },
          ],
        }).select("-password  -login_version -__v -created_at -updated_at");
        if (!user) throw user;
        user = JSON.parse(JSON.stringify(user));
        user = Object.assign(user, { type: USER_MANUAL });
        resolve(user);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const GeneratePassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const encriptPass = crypto.AES.encrypt(
        JSON.stringify(password),
        SECRET_KEY
      ).toString();
      resolve(encriptPass);
    } catch (error) {
      reject(error);
    }
  });
};
export const GenToken = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      // Create JWT Payload
      const payload = {
        id: data._id,
        type: data.type,
        login_version: data.login_version,
      };

      var encryptID = crypto.AES.encrypt(
        JSON.stringify(payload.id),
        SECRET_KEY
      ).toString();

      const payload_refress = {
        id: encryptID,
        type: data.type,
        login_version: data.login_version,
      };

      const jwtData = {
        expiresIn: parseInt(JWT_TIMEOUT),
      };
      const jwtDataRefresh = {
        expiresIn: parseInt(JWT_REFRECH_TIMEOUT),
      };
      //Generated JWT token with Payload and secret.
      const token = jwt.sign(payload, SECRET_KEY, jwtData);
      const refreshToken = jwt.sign(
        payload_refress,
        SECRET_KEY,
        jwtDataRefresh
      );
      const resultData = {
        token: token,
        refreshToken: refreshToken,
      };
      // tokenList[refreshToken] = resultData;
      resovle(resultData);
    } catch (error) {
      reject(error);
    }
  });
};
export const VerifyRefreshToken = (token, refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(refreshToken, `${SECRET_KEY}`, async (err, decode) => {
        if (err) return reject(err);
        console.log(`decode===>${decode.token}`);
        console.log(`token===>${token}`);
        if (decode.token == token) {
          const newToken = await GenerateToken(decode);
          resolve(newToken);
        } else {
          reject("Invalid RefreshToken");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const GenerateRefreshToken = (token, user) => {
  return new Promise(async (resovle, reject) => {
    try {
      let refreshToken = jwt.sign(
        { _id: user._id, phoneNumber: user.phoneNumber, token },
        `${SECRET_KEY}`
      );
      refreshToken
        ? resovle(refreshToken)
        : reject("Error Generate RefreshToken");
    } catch (error) {
      reject(error);
    }
  });
};
export const GenerateToken = (user) => {
  return new Promise(async (resovle, reject) => {
    try {
      let token = jwt.sign(
        {
          _id: user._id,
          phoneNumber: user.phoneNumber,
        },
        `${SECRET_KEY}`,
        { expiresIn: "7d" }
      );
      const refreshToken = await GenerateRefreshToken(token, user);
      resovle({ token, refreshToken });
    } catch (error) {
      reject(error);
    }
  });
};
//
export const CheckPric = (price, priceTotal) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (price != priceTotal) {
        return reject("Error PriceTotal is not Match");
      }
      resovle(true);
    } catch (error) {
      reject(error);
    }
  });
};
export const VerifyToken = (token) => {
  return new Promise(async (resovle, reject) => {
    try {
      jwt.verify(token, `${SECRET_KEY}`, async (err, decode) => {
        if (err) return reject(err);
        let passDecript = crypto.AES.decrypt(
          decode.id.toString(),
          SECRET_KEY
        );
        let decriptPass = passDecript.toString(crypto.enc.Utf8);
        if (!decriptPass) {
          return SendError404(res, EMessage.LoginError);
        }
        decriptPass = decriptPass.replace(/"/g, "");
        const user = await Models.User.findOne({ _id: decriptPass});
        resovle(user._id);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const ComparePassword = (user, password) => {
  return new Promise(async (resovle, reject) => {
    try {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return reject(err);
        resovle(isMatch);
      });
    } catch (error) {
      reject(error);
    }
  });
};
