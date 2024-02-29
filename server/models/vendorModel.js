import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
    },
    numberOfSales: {
      type: Number,
      default: 0,
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
