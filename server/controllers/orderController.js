import {
  asyncHandler,
  calculateOrderPrices,
  generateOrderID,
} from "../utilities/index.js";
import Notification from "../models/notificationSchema.js";
import Order from "../models/orderModel.js";

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user").sort({ createdAt: -1 });

  res.status(200).json({ data: orders, success: true });
});

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createNewOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    deliveryAddress,
    itemsPrice,
    totalPrice,
    taxPrice,
    comment,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const orderID = generateOrderID();

  const order = new Order({
    orderID,
    orderItems: orderItems.map((orderItem) => ({
      ...orderItem,
      product: orderItem._id,
    })),
    user: req.user._id,
    deliveryAddress,
    itemsPrice,
    totalPrice,
    taxPrice,
    comment,
    isPaid: true,
    paidAt: new Date(),
  });

  const createdOrder = await order.save();

  const uniqueVendorIds = new Set(
    orderItems.map((orderItem) => orderItem.vendor)
  );

  for (const vendorId of uniqueVendorIds) {
    const notification = new Notification({
      recipientId: vendorId,
      orderId: orderID,
      message: `New order (${orderID}) has been placed.`,
      type: "new_order",
    });

    await notification.save();
  }

  res.status(201).json({
    data: createdOrder,
    success: true,
    message: "Order created successfully",
  });
});

/**
 * @desc    Get logged-in user orders
 * @route   GET /api/orders/mine
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({
      createdAt: -1,
    })
    .populate("user");

  res.status(200).json({ data: orders, success: true });
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:orderId
 * @access  Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderID: req.params.orderId })
    .populate("user")
    .populate({
      path: "orderItems.vendor",
      model: "Vendor",
    });

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json({ data: order, success: true });
});

/**
 * @desc    Get vendor orders
 * @route   GET /api/orders/vendor
 * @access  Private/Vendor
 */
export const getVendorOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    "orderItems.vendor": req.vendor._id,
  })
    .populate({
      path: "orderItems.product",
      match: {
        vendor: req.vendor._id,
      },
    })
    .populate("user")
    .sort({ createdAt: -1 });

  orders.forEach((order) => calculateOrderPrices(order));

  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.status(200).json({ data: orders, success: true });
});

/**
 * @desc    Get a vendor's single order
 * @route   GET /api/orders/vendor/:orderId
 * @access  Private/Vendor
 */
export const getVendorOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    orderID: req.params.orderId,
    "orderItems.vendor": req.vendor._id,
  })
    .populate({
      path: "orderItems.product",
      match: {
        vendor: req.vendor._id,
      },
    })
    .populate("user");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const updatedOrder = calculateOrderPrices(order);

  res.status(200).json({ data: updatedOrder, success: true });
});

/**
 * @desc    Mark order as delivered by vendor
 * @route   PUT /api/orders/vendor/:orderId
 * @access  Private/Vendor
 */
export const markOrderAsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    orderID: req.params.orderId,
    "orderItems.vendor": req.vendor._id,
  })
    .populate({
      path: "orderItems.product",
      match: {
        vendor: req.vendor._id,
      },
    })
    .populate("user");

  order.orderItems.forEach((product) => {
    if (product.vendor.toString() === req.vendor._id.toString()) {
      product.isDelivered = true;
      product.deliveredAt = new Date();
    }
  });

  await order.save();

  res
    .status(200)
    .json({ success: true, message: "Order updated successfully" });
});

/**
 * @desc    Mark order item as received
 * @route   PUT /api/orders/:orderId/items/:itemId
 * @access  Private
 */
export const markOrderAsReceived = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  const itemId = req.params.itemId;

  const order = await Order.findOne({ orderID: orderId });

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const orderItem = order.orderItems.find(
    (item) => item._id.toString() === itemId
  );

  if (!orderItem) {
    res.status(404);
    throw new Error("Order item not found");
  }

  orderItem.isReceived = true;

  const allReceived = order.orderItems.every((item) => item.isReceived);

  if (allReceived) {
    order.isOrderDelivered = true;
  }

  await order.save();

  const notification = new Notification({
    recipientId: orderItem.vendor._id,
    message: `Order ${orderId} item ${itemId} received.`,
    type: "order_received",
  });

  await notification.save();

  res
    .status(200)
    .json({ message: "Order item marked as received", success: true });
});
