import express from "express";
import {
  loginUser,
  logout,
  registerUser,
  getUserProfile,
} from "../controllers/authControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/logout").get(logout);

export default router;
