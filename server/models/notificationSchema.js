import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    orderId: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["new_order", "order_delivered", "new_product", "order_received"],
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
