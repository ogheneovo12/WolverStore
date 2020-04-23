import { Router } from "express";
import userRouter from "../resources/User/User.router";
import productRouter from "../resources/Product/Product.router";
import storeRouter from "../resources/Store/Store.router";
import orderRouter from "../resources/Order/Order.router";
import cartRouter from "../resources/Cart/Cart.router";
import reviewRouter from "../resources/Review/Review.router";
export function setup() {
  const apiRouter = Router();

  // add api routes here

  apiRouter.use("/users", userRouter);
  apiRouter.use("/products", productRouter);
  apiRouter.use("/stores", storeRouter);
  apiRouter.use("/carts", cartRouter);
  apiRouter.use("/orders", orderRouter);
  apiRouter.use("/reviews", reviewRouter);

  return apiRouter;
}
