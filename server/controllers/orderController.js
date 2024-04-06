import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user");

  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found");
  }

  res.status(200).json({ data: orders, success: true });
});

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const createNewOrder = asyncHandler(async (req, res) => {
  try {
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

    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined,
      })),
      user: req.user._id,
      deliveryAddress,
      itemsPrice,
      totalPrice,
      taxPrice,
      comment,
    });

    const createdOrder = await order.save();

    res.status(201).json({
      data: createdOrder,
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
});

/**
 * @desc    Get logged-in user orders
 * @route   GET /api/orders/mine
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }).populate('user');

    res.status(200).json({ data: orders, success: true });
  } catch (error) {
    console.log(error.message);
  }
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate("user");

  console.log("orderId", req.params.orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json({ data: order, success: true });
});

export { createNewOrder, getOrders, getMyOrders, getOrderById };
