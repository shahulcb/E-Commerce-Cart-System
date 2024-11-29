import express from "express";
import { createOrder, getOrders } from "../controllers/orderControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/order")
  .post(isAuthenticatedUser, createOrder)
  .get(isAuthenticatedUser, getOrders);

export default router;
