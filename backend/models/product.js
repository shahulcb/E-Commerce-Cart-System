import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [5, "Product price cannot exceed 200 characters"],
    },
    image: {
      type: String,
      required: [true, "Please enter product image"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("Product", productSchema);
