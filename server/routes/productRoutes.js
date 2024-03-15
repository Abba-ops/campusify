import express from "express";
import {
  addCategory,
  createProduct,
  createProductReview,
  deleteCategory,
  deleteReview,
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isLoggedIn, isVendor } from "../middlewares/authMiddleware.js";
import { validateReview } from "../middlewares/validateData.js";

const router = express.Router();
router.get("/search", searchProducts);
router.get(
  "/subcategory/:subcategory/:subcategoryId",
  getProductsBySubcategory
);
router.get("/category/:category/:categoryId", getProductsByCategory);
router.route("/").get(getProducts).post(isLoggedIn, isVendor, createProduct);
router.route("/categories").get(getCategories).post(addCategory);
router
  .route("/:productId")
  .get(getProductById)
  .put(isLoggedIn, isVendor, updateProduct);
router
  .route("/:productId/reviews")
  .post(isLoggedIn, validateReview, createProductReview);
router.delete("/:productId/reviews/:reviewId", isLoggedIn, deleteReview);
router.delete("/categories/:categoryId", deleteCategory);

export default router;
