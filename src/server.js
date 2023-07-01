
//es6  // common js
import express from 'express';
import { PORT } from './config/globalKey.js';
import cors from "cors"
import './config/db.js'
import router from './router/index.js';
import bodyParser from 'body-parser';
import passport from "passport";
import configPassport from "./config/passport.js"
const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true,limit: '500mb' , parameterLimit: 500})),
app.use(bodyParser.urlencoded({extended: true,limit: '500mb', parameterLimit: 500})),
app.use('/api/v1', router)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    // res.header("Access-Control-Allow-Headers", true);
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
app.use('/api/v1/test', (req,res)=>{
    res.status(200).json({status: true, data: "hello world"})
})
// Passport middleware
app.use(passport.initialize());
// Passport Config
configPassport(passport)
app.listen(PORT,()=>{
    console.log(`Server is runing on http://localhost:${PORT}`);
});