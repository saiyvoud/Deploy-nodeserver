import express from "express";
import { BannerController } from "../controller/banner.controller.js";
import PartsController from "../controller/parts.controller.js";
import UserController from "../controller/user.controller.js";
import { VehicleController } from "../controller/vehicle.controller.js";
import { auth } from "../middleware/auth.js";
import passport from "passport";
const auths = passport.authenticate("jwt", {session: false})
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
// ------------ vehicle -----------
router.post('/vehicle/insert',auth,VehicleController.insert);
router.get('/vehicle/getOne/:id',auth,VehicleController.getVehicleOne);
router.get('/vehicle/getAll',auth,VehicleController.getVehicleAll);
router.put('/vehicle/update/:id',auth,VehicleController.updateVehicle);
router.put('/vehicle/delete/:id',auth,VehicleController.deleteVehicle);
// ------------- parts -------------
router.post('/parts/insert', auth,PartsController.insert);
router.get('/parts/getOne/:id', auth,PartsController.getOne);
router.get('/parts/getAll', auths,PartsController.getAll);
router.put('/parts/update/:id', auth,PartsController.updateParts);
router.put('/parts/delete/:id', auth,PartsController.deletePart);
export default router;