import { Schema, model } from "mongoose";

const vendorSchema = new Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    vendorEmail: {
      type: String,
      required: true,
    },
    vendorPhone: {
      type: String,
      required: true,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    productsDescription: {
      type: String,
      required: true,
    },
    vendorLogo: {
      type: String,
      required: true,
    },
    socialMediaLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
    },
    estimatedDeliveryTime: {
      type: String,
      required: true,
    },
    vendorDescription: {
      type: String,
      required: true,
    },
    approvalDate: {
      type: Date,
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Vendor = model("Vendor", vendorSchema);

export default Vendor;
