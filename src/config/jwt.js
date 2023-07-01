import jwts from "jsonwebtoken";
import crypto from "crypto-js";
import { JWT_REFRECH_TIMEOUT, JWT_TIMEOUT, SECRET_KEY } from "./globalKey.js";

// Keys

export const jwt = async (data) => {
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
    const token = jwts.sign(payload, SECRET_KEY, jwtData);
    const refreshToken = jwts.sign(payload_refress, SECRET_KEY, jwtDataRefresh);
    const resultData = {
      token: token,
      refreshToken: refreshToken,
    };
    return resultData;
  } catch (err) {
    console.log(err);
    return false;
  }
};
