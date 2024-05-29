
//es6  
import express from 'express';
import { PORT } from './config/globalKey.js';
import cors from "cors"
import './config/db.js'
import router from './router/index.js';
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json({extended: true,limit: '500mb' , parameterLimit: 500})),
app.use(bodyParser.urlencoded({extended: true,limit: '500mb', parameterLimit: 500})),
app.use('/api/v1', router)
app.use('/api/v1/test', (req,res)=>{
    res.status(200).json({status: true, data: "hello world"})
})
app.listen(PORT,()=>{
    console.log(`Server is runing on http://localhost:${PORT}`);
});