import asyncHandler from "../middleware/asyncHandler.js";
import Vendor from "../models/vendorModel.js";

/**
 * @desc       Get all vendors
 * @route      GET /api/vendors
 * @access     Private/Admin
 */
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate("user");

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
  const vendor = await Vendor.findById(req.params.id).populate("user");

  if (!vendor) {
    res.status(404).json({ success: false, message: "Vendor not found" });
    return;
  }

  res.status(200).json({ success: true, data: vendor });
});

export { getVendors, getVendorById };
