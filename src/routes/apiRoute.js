import { Router } from "express";
import userRouter from "../resources/User/User.router";
import productRouter from "../resources/Product/Product.router";
import storeRouter from "../resources/Store/Store.router";
import orderRouter from "../resources/Order/Order.router";

export function setup() {
  const apiRouter = Router();

  // add api routes here
  // apiRouter.use('/admin', adminRouter);
  apiRouter.use("/users", userRouter);
  apiRouter.use("/products", productRouter);
  apiRouter.use("/stores", storeRouter);
  // apiRouter.use('/cart', cartRouter);
  apiRouter.use("/order", orderRouter);
  // apiRouter.use('/review', reviewRouter);

  return apiRouter;
}
