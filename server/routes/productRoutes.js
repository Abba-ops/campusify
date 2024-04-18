import express from "express";
import {
  addCategory,
  addSubcategory,
  createProduct,
  createProductReview,
  deleteCategory,
  deleteProduct,
  deleteReview,
  deleteSubcategory,
  getBestSellingProducts,
  getCategories,
  getIsFeatured,
  getPopularProducts,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";
import {
  isAdmin,
  isAdminOrVendor,
  isLoggedIn,
  isVendor,
} from "../middlewares/authMiddleware.js";
import { validateReview } from "../middlewares/validateData.js";

const router = express.Router();

router.get("/search", searchProducts);
router.get("/popular", getPopularProducts);
router.get("/sellers/best", getBestSellingProducts);
router.get("/featured", getIsFeatured);
router.get(
  "/subcategory/:subcategory/:subcategoryId",
  getProductsBySubcategory
);
router.get("/category/:category/:categoryId", getProductsByCategory);

router
  .route("/")
  .get(isLoggedIn, isAdmin, getProducts)
  .post(isLoggedIn, isVendor, createProduct);

router
  .route("/categories")
  .get(getCategories)
  .post(isLoggedIn, isAdmin, addCategory);

router
  .route("/:productId")
  .get(getProductById)
  .put(isLoggedIn, isAdminOrVendor, updateProduct)
  .delete(isLoggedIn, isAdminOrVendor, deleteProduct);

router
  .route("/:productId/reviews")
  .post(isLoggedIn, validateReview, createProductReview);

router.delete("/:productId/reviews/:reviewId", isLoggedIn, deleteReview);
router.delete("/categories/:categoryId", isLoggedIn, isAdmin, deleteCategory);
router.post("/subcategory/add", isLoggedIn, isAdmin, addSubcategory);
router.delete(
  "/subcategory/delete/:categoryId/:subcategoryId",
  isLoggedIn,
  isAdmin,
  deleteSubcategory
);

export default router;
