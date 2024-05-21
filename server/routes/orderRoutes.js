import express from "express";
import {
  isAdmin,
  isLoggedIn,
  isVendor,
} from "../middlewares/authMiddleware.js";
import {
  createNewOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  getVendorOrder,
  getVendorOrders,
  markOrderAsDelivered,
  markOrderAsReceived,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, isAdmin, getOrders)
  .post(isLoggedIn, createNewOrder);

router.get("/orders/vendor", isLoggedIn, isVendor, getVendorOrders);
router
  .route("/:orderId/vendor")
  .get(isLoggedIn, isVendor, getVendorOrder)
  .put(isLoggedIn, isVendor, markOrderAsDelivered);

router.get("/mine", isLoggedIn, getMyOrders);
router.put("/:orderId/items/:itemId", isLoggedIn, markOrderAsReceived);
router.route("/:orderId").get(isLoggedIn, getOrderById);

export default router;
