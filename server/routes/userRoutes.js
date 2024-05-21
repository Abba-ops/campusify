import express from "express";
import {
  getUsers,
  authUser,
  logoutUser,
  deleteUser,
  getUserById,
  registerUser,
  getUserProfile,
  updateUserPassword,
  deleteMyAccount,
  getCurrentUser,
} from "../controllers/userController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validateData.js";

const router = express.Router();

router.post("/auth", validateLogin, authUser);
router.post("/logout", isLoggedIn, logoutUser);

router.get("/me", isLoggedIn, getCurrentUser);
router.put("/me/password", isLoggedIn, updateUserPassword);
router.delete("/me", isLoggedIn, deleteMyAccount);

router.get("/profile/:userId", getUserProfile);

router
  .route("/")
  .get(isLoggedIn, isAdmin, getUsers)
  .post(validateRegister, registerUser);

router
  .route("/:userId")
  .get(isLoggedIn, isAdmin, getUserById)
  .delete(isLoggedIn, isAdmin, deleteUser);

export default router;
