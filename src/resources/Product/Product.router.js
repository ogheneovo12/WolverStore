import Router from "express";
import productController from "./Product.controller";
const productRouter = Router();

productRouter.get("/all", productController.getAll);
productRouter.get("/get/:productId", productController.getProduct);
productRouter.post("/create", productController.create);
productRouter.put("/update/:productId", productController.update);
productRouter.delete("/delete/:productId", productController.delete);

export default productRouter;
