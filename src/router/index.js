import express from "express";
import { BannerController } from "../controller/banner.controller.js";
import PartsController from "../controller/parts.controller.js";
import UserController from "../controller/user.controller.js";
import { VehicleController } from "../controller/vehicle.controller.js";
import { auth } from "../middleware/auth.js";
import AddressController from "../controller/address.controller.js";
import OrderController from "../controller/order.controller.js";
import CategoryController from "../controller/category.controller.js";

const router = express.Router();
// method http get post put delete
// ---------- Auth -------------
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);
router.post("/user/refreshToken", UserController.RefreshToken);
router.put("/user/update/:id", auth, UserController.updateUser);
router.put("/user/delete/:id", auth, UserController.deleteUser);
// ------------ Banner -------------
router.post("/banner/insert", BannerController.insert);
router.get("/banner/getOne/:bannerId", BannerController.getOne);
router.get("/banner/getAll", BannerController.getAll);
router.put("/banner/update/:id", BannerController.updateBanner);
router.put("/banner/delete/:id", BannerController.deleteBanner);
// ------------ Category -------------
router.post("/banner/insert", CategoryController.insert);
router.get("/banner/getOne/:bannerId", CategoryController.getOne);
router.get("/banner/getAll", CategoryController.getAll);

// ------------ vehicle -----------
const product = "/product";
router.post(`${product}/insert`, VehicleController.insert);
router.get(`${product}/getOne/:id`, VehicleController.getVehicleOne);
router.get(`${product}/getAll`, VehicleController.getVehicleAll);
router.put(`${product}/update/:id`, VehicleController.updateVehicle);
router.put(`${product}/delete/:id`, VehicleController.deleteVehicle);
// ------------- parts -------------
router.post("/parts/insert", auth, PartsController.insert);
router.get("/parts/getOne/:id", auth, PartsController.getOne);
router.get(
  "/parts/getByVehicle/:vehicleId",
  auth,
  PartsController.getByVehicleId
);
router.get("/parts/getAll", auth, PartsController.getAll);
router.put("/parts/update/:id", auth, PartsController.updateParts);
router.put("/parts/delete/:id", auth, PartsController.deletePart);
// ------------- address ------------
router.post("/address/insert", auth, AddressController.insert);
router.get("/address/getAll", auth, AddressController.getAll);
router.get("/address/getByUser/:userId", auth, AddressController.getByUser);
// ------------ order ------------
router.post("/order/insert", auth, OrderController.insert);
router.get("/order/getAll", auth, OrderController.getAll);
router.get("/order/getOne/:id", auth, OrderController.getOne);
router.get(
  "/order/getOrderStatusAwait/:userId",
  auth,
  OrderController.getOrderStatusAwait
);
router.get(
  "/order/getOrderStatusPadding/:userId",
  auth,
  OrderController.getOrderStatusPadding
);
router.get(
  "/order/getOrderStatusSuccess/:userId",
  auth,
  OrderController.getOrderStatusSuccess
);
router.get(
  "/order/getOrderStatusCancel/:userId",
  auth,
  OrderController.getOrderStatusCancel
);
router.put(
  "/order/updateStatusPadding/:orderId",
  auth,
  OrderController.updateOrderStatusPadding
);
router.put(
  "/order/updateStatusSuccess/:orderId",
  auth,
  OrderController.updateOrderStatusSuccess
);
router.put(
  "/order/updateStatusCancel/:orderId",
  auth,
  OrderController.updateOrderStatusCancel
);
export default router;
