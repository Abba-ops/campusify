import mongoose from "mongoose";

// Subschema for social media links
const socialMediaSchema = new mongoose.Schema({
  facebook: String,
  twitter: String,
  instagram: String,
});

// Subschema for reviews
const reviewSchema = new mongoose.Schema({
  profilePictureURL: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// Schema for vendors
const vendorSchema = new mongoose.Schema(
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
    socialMediaLinks: socialMediaSchema,
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema], // Embedding the review schema
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
