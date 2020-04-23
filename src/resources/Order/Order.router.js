import Router from "express";
import orderController from "./Order.controller";
const orderRouter = Router();

orderRouter.get("/all", orderController.getAll);
orderRouter.get("/get/:orderId", orderController.getorder);
orderRouter.post("/create", orderController.create);
orderRouter.put("/update/:orderId", orderController.update);
orderRouter.delete("/delete/:orderId", orderController.delete);

export default orderRouter;
