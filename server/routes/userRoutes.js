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
  getAdminDashboard,
  createTask,
  updateTask,
} from "../controllers/userController.js";
import {
  isAdmin,
  isAdminOrVendor,
  isLoggedIn,
} from "../middlewares/authMiddleware.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validateData.js";

const router = express.Router();

router.post("/tasks", isLoggedIn, isAdminOrVendor, createTask);
router.put("/tasks/:taskId", isLoggedIn, isAdminOrVendor, updateTask);

router.get("/dashboard", isLoggedIn, isAdmin, getAdminDashboard);
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
