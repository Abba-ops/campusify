import mongoose from "mongoose";

const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  paidAt: { type: Date },
  deliveredAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  isReceived: { type: Boolean, default: false },
});

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [orderItemSchema],
    deliveryAddress: {
      buildingName: { type: String, required: true },
      locationNumber: { type: String, required: true },
      campus: { type: String, required: true },
    },
    taxPrice: { type: Number, default: 0 },
    itemsPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false },
    comment: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
