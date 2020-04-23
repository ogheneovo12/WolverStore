import Router from "express";
import productController from "./Product.controller";
import verifyAuth from "../../routes/middlewares/verifyAuth";
import verifyAdmin from "../../routes/middlewares/verifyAdmin";
const productRouter = Router();

productRouter.get("/all", productController.getAll);
productRouter.get("/get/:productId", productController.getProduct);
productRouter.post(
  "/create",
  [verifyAuth, verifyAdmin],
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
