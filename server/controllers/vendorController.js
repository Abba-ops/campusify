import asyncHandler from "../middlewares/asyncHandler.js";
import { Product } from "../models/productModel.js";
import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";

/**
 * @desc       Get all vendors
 * @route      GET /api/vendors
 * @access     Private/Admin
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
 * @desc       Get a vendor by ID
 * @route      GET /api/vendors/:id
 * @access     Private/Admin
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
  const vendorProducts = await Product.find({ vendor: req.vendor._id });
  res.status(200).json({
    success: true,
    data: vendorProducts,
  });
});

/**
 * @desc   Apply as a vendor
 * @route  POST /api/vendors/application
 * @access Private
 */
const vendorApplication = asyncHandler(async (req, res) => {
  const { businessEmail, businessName, businessPhone, businessDescription } =
    req.body;

  const newVendorData = {
    businessName,
    businessDescription,
    user: req.user._id,
    businessEmail,
    businessPhone,
  };

  const createdVendor = await Vendor.create(newVendorData);

  res.status(201).json({
    success: true,
    data: createdVendor,
  });
});

/**
 * @desc    Approve a vendor
 * @route   PUT /api/vendors/approve/:vendorId
 * @access  Private/Admin
 */
const approveVendor = asyncHandler(async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      res.status(404);
      throw new Error("Vendor not found");
    }

    const user = await User.findById(vendor.user);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.isVendor = true;
    await user.save();

    vendor.isApproved = true;
    vendor.approvalStatus = "approved";
    await vendor.save();

    res.status(200).json({
      success: true,
      message: "Vendor approved successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

/**
 * @desc    Reject a vendor
 * @route   PUT /api/vendors/reject/:vendorId
 * @access  Private/Admin
 */
const rejectVendor = asyncHandler(async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      res.status(404);
      throw new Error("Vendor not found");
    }

    const user = await User.findById(vendor.user);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await vendor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Vendor rejected successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

export {
  getVendors,
  getVendorById,
  getVendorProducts,
  vendorApplication,
  approveVendor,
  rejectVendor,
};
