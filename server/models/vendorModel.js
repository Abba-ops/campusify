import { Schema, model } from "mongoose";
import { reviewSchema } from "./productModel.js";

const vendorSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessPhone: {
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
    businessDescription: {
      type: String,
      required: true,
    },
    socialMediaLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
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
    vendorReviews: [reviewSchema],
  },
  { timestamps: true }
);

const Vendor = model("Vendor", vendorSchema);

export default Vendor;
