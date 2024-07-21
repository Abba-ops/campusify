import express from "express";
import { createTask, updateTask } from "../controllers/taskController.js";
import { isAdminOrVendor, isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isLoggedIn, isAdminOrVendor, createTask);
router.put("/:taskId", isLoggedIn, isAdminOrVendor, updateTask);

export default router;
