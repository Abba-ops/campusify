import express from "express";
import {
  createProduct,
  createProductReview,
  deleteReview,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isLoggedIn, isVendor } from "../middlewares/authMiddleware.js";
import { validateReview } from "../middlewares/validateData.js";

const router = express.Router();

router.route("/").get(getProducts).post(isLoggedIn, isVendor, createProduct);
router
  .route("/:productId")
  .get(getProductById)
  .put(isLoggedIn, isVendor, updateProduct);
router
  .route("/:productId/reviews")
  .post(isLoggedIn, validateReview, createProductReview);
router.delete("/:productId/reviews/:reviewId", isLoggedIn, deleteReview);

export default router;
