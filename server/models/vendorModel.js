import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    contactInformation: {
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
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
