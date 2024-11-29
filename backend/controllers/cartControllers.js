import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import Cart from "../models/cart.js";

export const addToCart = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const isItemExist = await Cart.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isItemExist) {
    res.status(409).json({
      message: "Item already in cart",
    });
  } else {
    await Cart.create(req.body);
  }
  res.status(201).json({
    message: "Item added to cart",
  });
});

export const getCart = catchAsyncErrors(async (req, res, next) => {
  const cartItems = await Cart.find({ user: req.user._id }).populate("product");

  const validCartItems = cartItems.filter((item) => {
    if (!item.product || item.product.stock <= 0) {
      Cart.findByIdAndDelete(item._id).catch((err) =>
        console.error(`Failed to remove cart item: ${item._id}`, err)
      );
      return false;
    }
    return true;
  });
  res.status(200).json({ cartItems: validCartItems });
});

export const removeItem = catchAsyncErrors(async (req, res, next) => {
  const cartItem = await Cart.findOneAndDelete({
    user: req.user._id,
    product: req.params.product,
  });

  if (!cartItem) {
    return next(new ErrorHandler("Product Not Found", 401));
  }

  res.status(200).json({
    message: "Product removed from the cart",
  });
});

export const updateQuantity = catchAsyncErrors(async (req, res, next) => {
  const { cartId, quantityType } = req.body;

  if (!cartId || !["inc", "dec"].includes(quantityType)) {
    return next(new ErrorHandler("Invalid input data", 400));
  }

  const isItemExistInCart = await Cart.findOne({
    user: req.user._id,
    _id: cartId,
  }).populate("product");

  if (!isItemExistInCart) {
    return next(new ErrorHandler("Product not found in cart", 404));
  }

  let updatedQuantity = isItemExistInCart.quantity;

  if (quantityType === "inc") {
    updatedQuantity += 1;
    if (updatedQuantity > isItemExistInCart.product.stock) {
      return next(new ErrorHandler("No more stock available", 400));
    }
  } else if (quantityType === "dec") {
    updatedQuantity -= 1;
    if (updatedQuantity < 1) {
      return next(new ErrorHandler("Quantity cannot be less than 1", 400));
    }
  }

  isItemExistInCart.quantity = updatedQuantity;
  await isItemExistInCart.save();

  res.status(200).json({
    message: "Cart quantity updated successfully",
  });
});
