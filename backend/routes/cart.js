import express from "express";
import {
  addToCart,
  getCart,
  removeItem,
  updateQuantity,
} from "../controllers/cartControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/cart")
  .post(isAuthenticatedUser, addToCart)
  .get(isAuthenticatedUser, getCart)
  .put(isAuthenticatedUser, updateQuantity);

router.route("/cart-delete/:product").delete(isAuthenticatedUser, removeItem);

export default router;
