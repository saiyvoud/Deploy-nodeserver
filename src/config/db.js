import mongoose from "mongoose";
import {  URL_DATABASE_DEV } from "./globalKey.js";
//atlas
mongoose
  .connect(URL_DATABASE_DEV, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected Database!");
  })
  .catch((e) => {
    console.log(`Connect Fail ${e}`);
  });
