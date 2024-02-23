import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    res.status(401);
    throw new Error("Authorization failed: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Authorization failed: Invalid token");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error("Forbidden: Not authorized as admin");
  }

  next();
});

export const isVendor = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.isVendor) {
    res.status(403);
    throw new Error("Forbidden: Not authorized as vendor");
  }

  next();
});
