import mongoose from "mongoose";

const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  deliveredAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  isReceived: { type: Boolean, default: false },
});

const orderSchema = new Schema(
  {
    orderID: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [orderItemSchema],
    deliveryAddress: {
      building: { type: String, required: true },
      locationNumber: { type: String, required: true },
      campus: { type: String, required: true },
    },
    taxPrice: { type: Number, default: 0 },
    itemsPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false },
    isOrderDelivered: { type: Boolean, default: false },
    paymentMethod: { type: String },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    comment: { type: String },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
