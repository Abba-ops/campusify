import {
  asyncHandler,
  calculateOrderPrices,
  extractPublicId,
} from "../utilities/index.js";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/notificationSchema.js";
import Order from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import Task from "../models/taskModel.js";

/**
 * @desc    Get all vendors
 * @route   GET /api/vendors
 * @access  Private/Admin
 */
export const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({}).populate("user");

  res.status(200).json({
    success: true,
    count: vendors.length,
    data: vendors,
  });
});

/**
 * @desc    Get a vendor by ID
 * @route   GET /api/vendors/:vendorId
 * @access  Private/Vendor|Admin
 */
export const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.vendorId).populate("user");

  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  res.status(200).json({
    success: true,
    data: vendor,
  });
});

/**
 * @desc    Get products of the logged-in vendor
 * @route   GET /api/vendors/products
 * @access  Private/Vendor
 */
export const getVendorProducts = asyncHandler(async (req, res) => {
  const vendorProducts = await Product.find({
    vendor: req.vendor._id,
  }).populate("category");

  res.status(200).json({
    success: true,
    count: vendorProducts.length,
    data: vendorProducts,
  });
});

/**
 * @desc    Apply as a vendor
 * @route   POST /api/vendors
 * @access  Private
 */
export const vendorApplication = asyncHandler(async (req, res) => {
  const {
    vendorEmail,
    vendorName,
    vendorPhone,
    vendorDescription,
    estimatedDeliveryTime,
    vendorLogo,
    productsDescription,
  } = req.body;

  const newVendorData = {
    vendorName,
    vendorDescription,
    user: req.user._id,
    vendorEmail,
    vendorPhone,
    vendorLogo,
    productsDescription,
    estimatedDeliveryTime,
  };

  const createdVendor = await Vendor.create(newVendorData);

  const userData = {
    id: req.user._id,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    isVendor: req.user.isVendor,
    userType: req.user.userType,
    lastName: req.user.lastName,
    otherNames: req.user.otherNames,
    phoneNumber: req.user.phoneNumber,
    profilePictureURL: req.user.profilePictureURL,
    vendor: createdVendor,
  };

  res.status(201).json({
    success: true,
    data: userData,
  });
});

/**
 * @desc    Update vendor status
 * @route   PUT /api/vendors/:vendorId/status/:status
 * @access  Private/Admin
 */
export const updateVendorStatus = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;
  const { status } = req.params;

  let vendor = await Vendor.findById(vendorId);

  if (!vendor) {
    res.status(404).json({ success: false, message: "Vendor not found" });
    return;
  }

  let user = await User.findById(vendor.user);

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  if (status === "approved") {
    user.isVendor = true;
    vendor.isApproved = true;
    vendor.approvalStatus = "approved";
    vendor.approvalDate = new Date();
    await user.save();
    await vendor.save();
  } else if (status === "rejected") {
    await vendor.deleteOne();
  }

  res.status(200).json({
    success: true,
    message: `Vendor ${status} successfully`,
  });
});

/**
 * @desc    Delete a vendor and associated products, removing their images from Cloudinary
 * @route   DELETE /api/vendors/:vendorId
 * @access  Private/Admin
 */
export const deleteVendor = asyncHandler(async (req, res) => {
  const vendorId = req.params.vendorId;

  const vendor = await Vendor.findById(vendorId);

  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  const user = await User.findOne({ _id: vendor.user });

  const products = await Product.find({ vendor: vendor._id });

  for (const product of products) {
    const publicId = extractPublicId(product.imageUrl);
    await cloudinary.uploader.destroy(`campusify/${publicId}`);
    await product.deleteOne();
  }

  if (user) {
    user.isVendor = false;
    user.save();
  }

  await vendor.deleteOne();

  res.json({ success: true, message: "Vendor deleted successfully" });
});

/**
 * @desc    Retrieve products associated with a specific vendor
 * @route   GET /api/vendors/:vendorId/products
 * @access  Private/Admin
 */
export const getProductsByVendor = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  const products = await Product.find({ vendor: vendorId });

  if (!products || products.length === 0) {
    res.status(404);
    throw new Error("No products found for this vendor");
  }

  return res.status(200).json({ success: true, data: products });
});

/**
 * @desc    Retrieve customers associated with a specific vendor
 * @route   GET /api/vendors/customers
 * @access  Private/Vendor
 */
export const getVendorCustomers = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    "orderItems.vendor": req.vendor._id,
  })
    .populate({
      path: "orderItems.product",
      match: {
        vendor: req.vendor._id,
      },
    })
    .populate("user");

  const customersSet = new Set();
  orders.forEach((order) => {
    if (order.user) {
      customersSet.add(order.user);
    }
  });

  const customers = Array.from(customersSet);

  res.status(200).json({ data: customers, success: true });
});

/**
 * @desc    Retrieve customers associated with all vendors
 * @route   GET /api/vendors/all-customers
 * @access  Private/Admin
 */
export const getAllVendorCustomers = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user");

  const customersSet = new Set();
  orders.forEach((order) => {
    if (order.user) {
      customersSet.add(order.user);
    }
  });

  const customers = Array.from(customersSet);

  res.status(200).json({ data: customers, success: true });
});

/**
 * @desc    Retrieve vendor notifications
 * @route   GET /api/vendors/notifications
 * @access  Private (Vendor)
 */
export const getVendorNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    recipientId: req.vendor._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    data: notifications,
    success: true,
  });
});

/**
 * @desc    Mark a notification as read
 * @route   PUT /api/vendors/notifications/:notificationId/mark-as-read
 * @access  Private (Vendor)
 */
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.read = true;
  await notification.save();

  res.json({
    success: true,
    message: "Notification marked as read successfully",
  });
});

/**
 * @desc    Delete a notification
 * @route   DELETE /api/vendors/notifications/:notificationId
 * @access  Private (Vendor)
 */
export const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  await notification.deleteOne();

  res.json({ success: true, message: "Notification deleted successfully" });
});

/**
 * @desc    Get products for a specific vendor
 * @route   GET /api/vendors/profile/products/:vendorId
 * @access  Public
 */
export const getUserVendorProduct = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  const vendorProducts = await Product.find({ vendor: vendorId });

  res.status(200).json({ success: true, data: vendorProducts });
});

/**
 * @desc    Get vendor profile by ID
 * @route   GET /api/vendors/profile/:vendorId
 * @access  Public
 */
export const getVendorProfile = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  const vendor = await Vendor.findById(vendorId);

  res.status(200).json({ success: true, data: vendor });
});

/**
 * @desc    Get vendor dashboard data
 * @route   GET /api/vendors/dashboard
 * @access  Private (Vendor)
 */
export const getVendorDashboard = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;

  const orders = await Order.find({}).populate("user");

  const customersSet = new Set();
  orders.forEach((order) => {
    if (order.user) {
      customersSet.add(order.user._id);
    }
  });

  const recentOrders = await Order.find({
    "orderItems.vendor": vendorId,
  })
    .populate({
      path: "orderItems.product",
      match: {
        vendor: vendorId,
      },
    })
    .populate("user");

  recentOrders.forEach((order) => calculateOrderPrices(order));

  const totalCustomers = customersSet.size;

  const totalOrders = await Order.countDocuments({
    "orderItems.vendor": vendorId,
  });

  const notifications = await Notification.find({
    recipientId: vendorId,
  }).sort({ createdAt: -1 });

  const totalProduct = await Product.countDocuments({ vendor: vendorId });

  const totalRevenue = recentOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  const tasks = await Task.find({ role: "vendor", userId: req.user._id });

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalOrders,
        totalRevenue,
        totalProduct,
        totalCustomers,
      },
      recentOrders,
      notifications,
      tasks,
    },
  });
});
