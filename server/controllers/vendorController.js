import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Product } from "../models/productModel.js";
import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import { extractPublicId } from "./productController.js";

/**
 * @desc    Get all vendors
 * @route   GET /api/vendors
 * @access  Private/Admin
 */
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({}).populate("user");

  res.status(200).json({
    success: true,
    count: vendors.length,
    data: vendors,
  });
});

/**
 * @desc    Get a vendor by ID
 * @route   GET /api/vendors/:id
 * @access  Private/Admin
 */
const getVendorById = asyncHandler(async (req, res) => {
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
 * @desc       Get products of a specific vendor
 * @route      GET /api/vendors/products
 * @access     Private
 */
const getVendorProducts = asyncHandler(async (req, res) => {
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
 * @route   POST /api/vendors/application
 * @access  Private
 */
const vendorApplication = asyncHandler(async (req, res) => {
  const { vendorEmail, vendorName, vendorPhone, vendorDescription } = req.body;

  const newVendorData = {
    vendorName,
    vendorDescription,
    user: req.user._id,
    vendorEmail,
    vendorPhone,
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
 * @route   PUT /api/vendors/:vendorId/status
 * @access  Private/Admin
 */
const updateVendorStatus = asyncHandler(async (req, res) => {
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
 * @desc    Delete a product and its associated image from Cloudinary
 * @route   DELETE /api/products/:productId
 * @access  Private/Admin
 */
const deleteVendor = asyncHandler(async (req, res) => {
  const vendorId = req.params.vendorId;

  const vendor = await Vendor.findById(vendorId);

  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  const user = await User.findOne({ _id: vendor.user });

  const products = await Product.find({ vendor: vendor._id });

  products.forEach((product) => {
    product.deleteOne();

    const deleteImage = async () => {
      const publicId = extractPublicId(product.imageUrl);
      await cloudinary.uploader.destroy(publicId);
    };

    deleteImage();
  });

  if (user) {
    user.isVendor = false;
    user.save();
  }

  await vendor.deleteOne();

  res.json({ success: true, message: "Vendor deleted successfully" });
});

export {
  getVendors,
  getVendorById,
  getVendorProducts,
  vendorApplication,
  updateVendorStatus,
  deleteVendor,
};
