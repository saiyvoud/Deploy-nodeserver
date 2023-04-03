import express from "express";
import UserController from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
// method http get post put delete 
router.post('/user/login',UserController.login);
router.post('/user/register',UserController.register);
router.put('/user/update/:id',auth,UserController.updateUser);
router.put('/user/delete/:id',auth,UserController.deleteUser);

export default router;