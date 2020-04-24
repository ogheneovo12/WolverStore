import Router from "express";
import productController from "./Product.controller";
import verifyAuth from "../../routes/middlewares/verifyAuth";
import verifyAdmin from "../../routes/middlewares/verifyAdmin";
const productRouter = Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/data/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  // fileFilter: fileFilter
});
productRouter.get("/all", productController.getAll);
productRouter.get("/get/:productId", productController.getProduct);
productRouter.post(
  "/create",
  verifyAuth,
  verifyAdmin,
  upload.single("productImage"),
  productController.create
);
productRouter.put(
  "/update/:productId",
  [verifyAuth, verifyAdmin],
  productController.update
);
productRouter.delete(
  "/delete/:productId",
  [verifyAuth, verifyAdmin],
  productController.delete
);

export default productRouter;
