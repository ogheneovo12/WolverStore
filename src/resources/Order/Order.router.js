import Router from "express";
import orderController from "./Order.controller";
import verifyAuth from "../../routes/middlewares/verifyAuth";
import verifyUser from "../../routes/middlewares/verifyUser";
const orderRouter = Router();

orderRouter.get("/all", orderController.getAll);
orderRouter.get("/get/:orderId", orderController.getorder);
orderRouter.post("/create", [verifyAuth, verifyUser], orderController.create);
orderRouter.put(
  "/update/:orderId",
  [verifyAuth, verifyUser],
  orderController.update
);
orderRouter.delete(
  "/delete/:orderId",
  [verifyAuth, verifyUser],
  orderController.delete
);

export default orderRouter;
