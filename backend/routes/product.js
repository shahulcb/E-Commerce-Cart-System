import express from "express";
import {
  newProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { uploadFiles } from "../middlewares/multer.js";
const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), uploadFiles, newProduct);

router
  .route("/admin/products/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    uploadFiles,
    updateProduct
  );
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

export default router;
