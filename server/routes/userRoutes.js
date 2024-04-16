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

router.get("/current", isLoggedIn, getCurrentUser);
router.post("/auth", validateLogin, authUser);
router.post("/logout", isLoggedIn, logoutUser);
router.get("/profile/:userId", getUserProfile);
router.put("/update-password", isLoggedIn, updateUserPassword);
router.delete("/delete-account", isLoggedIn, deleteMyAccount);
router
  .route("/")
  .get(isLoggedIn, isAdmin, getUsers)
  .post(validateRegister, registerUser);
router
  .route("/:userId")
  .delete(isLoggedIn, isAdmin, deleteUser)
  .get(isLoggedIn, isAdmin, getUserById);

export default router;
