import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import { asyncHandler } from "../utilities/index.js";
import jwt from "jsonwebtoken";

/**
 * Middleware to check if the user is logged in.
 * Sets `req.user` if the user is authenticated.
 */
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

/**
 * Middleware to check if the user is an admin.
 * Returns a 403 Forbidden error if the user is not an admin.
 */
export const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error("Forbidden: Not authorized as admin");
  }

  next();
});

/**
 * Middleware to check if the user is a vendor.
 * Sets `req.vendor` if the user is a vendor.
 */
export const isVendor = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.isVendor) {
    res.status(403);
    throw new Error("Forbidden: Not authorized as vendor");
  }

  req.vendor = await Vendor.findOne({ user: req.user._id });
  next();
});

/**
 * Middleware to check if the user is an admin or a vendor.
 * Sets `req.vendor` if the user is a vendor.
 */
export const isAdminOrVendor = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isVendor)) {
    if (req.user.isVendor) {
      req.vendor = await Vendor.findOne({ user: req.user._id });
    }
    return next();
  } else {
    res.status(403);
    throw new Error("Forbidden: Not authorized as vendor or administrator");
  }
});
