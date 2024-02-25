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
} from "../controllers/userController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validateData.js";

const router = express.Router();

router.post("/auth", validateLogin, authUser);
router.post("/logout", logoutUser);
router.get("/profile", isLoggedIn, getUserProfile);
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
