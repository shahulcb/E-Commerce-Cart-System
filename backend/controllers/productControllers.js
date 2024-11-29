import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import fs from "fs";

export const getProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
});

export const newProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
    stock: req.body.stock,
    user: req.user._id,
  };
  const product = await Product.create(newProduct);
  res.status(200).json({ product });
});

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  if (req.file) {
    fs.unlink(`backend/uploads/${product.image}`, (err) => {
      if (err) {
        return next(new ErrorHandler("Error deleting the image file"));
      }
    });
    req.body.image = req.file.filename;
  } else {
    req.body.image = product.image;
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({ product });
});

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const imagePath = product.image;
  await product.deleteOne();

  if (imagePath) {
    fs.unlink(`backend/uploads/${imagePath}`, (err) => {
      if (err) {
        return next(new ErrorHandler("Error deleting the image file"));
      }
    });
  }

  res.status(200).json({ message: "Product deleted" });
});
