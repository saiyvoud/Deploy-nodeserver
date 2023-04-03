import express from "express";
import { BannerController } from "../controller/banner.controller.js";
import UserController from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
// method http get post put delete 
// ---------- Auth -------------
router.post('/user/login',UserController.login);
router.post('/user/register',UserController.register);
router.put('/user/update/:id',auth,UserController.updateUser);
router.put('/user/delete/:id',auth,UserController.deleteUser);
// ------------ Banner -------------
router.post('/banner/insert',auth,BannerController.insert);
router.put('/banner/update/:id',auth,BannerController.updateBanner);
router.put('/banner/delete/:id',auth,BannerController.deleteBanner)
export default router;