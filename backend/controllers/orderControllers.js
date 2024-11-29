import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import order from "../models/order.js";

export const createOrder = catchAsyncErrors(async (req, res, next) => {
  const data = {
    ...req.body,
    user: req.user._id,
    paymentMethod: "Card",
    paymentInfo: "123456",
    orderStatus: "Processing",
  };
  const cartItems = await Cart.find({ user: req.user._id }).populate("product");
  for (let item of cartItems) {
    const product = await Product.findById(item.product._id);
    if (!product) {
      return next(
        new ErrorHandler(`Product not found: ${item.productId}`, 404)
      );
    }

    if (product.stock < item.quantity) {
      return next(
        new ErrorHandler(`Insufficient stock for product: ${product.name}`, 400)
      );
    }

    product.stock -= item.quantity;
    await product.save();
  }
  await Cart.deleteMany({ user: req.user._id });
  const order = await Order.create(data);
  res.status(200).json({});
});

export const getOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({ orders });
});
