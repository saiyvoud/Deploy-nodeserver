import express from "express";
import UserController from "../controller/user.controller.js";
const router = express.Router();
// method http get post put delete 
router.post('/user/login',UserController.login);
router.post('/user/register',UserController.register);

export default router;