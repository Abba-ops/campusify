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
import { isLoggedIn } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", isLoggedIn, getUserProfile);
router.put("/update-password", isLoggedIn, updateUserPassword);
router.delete("/delete-account", isLoggedIn, deleteMyAccount);
router.route("/").get(isLoggedIn, getUsers).post(registerUser);
router
  .route("/:id")
  .delete(isLoggedIn, deleteUser)
  .get(isLoggedIn, getUserById);

export default router;
