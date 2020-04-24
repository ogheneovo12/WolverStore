import { Router } from "express";
import userRouter from "../resources/User/User.router";
import productRouter from "../resources/Product/Product.router";
import storeRouter from "../resources/Store/Store.router";
import orderRouter from "../resources/Order/Order.router";
import cartRouter from "../resources/Cart/Cart.router";
import reviewRouter from "../resources/Review/Review.router";
import verifyAuth from "./middlewares/verifyAuth";
import verifyAdmin from "./middlewares/verifyAdmin";
import verifyUser from "./middlewares/verifyUser";
export function setup() {
  const apiRouter = Router();

  apiRouter.use("/users", userRouter);
  apiRouter.use("/products", productRouter);
  apiRouter.use("/stores", storeRouter);
  //all user authenticated routes
  apiRouter.use("/carts", [verifyAuth, verifyUser], cartRouter);
  apiRouter.use("/orders", [verifyAuth, verifyUser], orderRouter);
  apiRouter.use("/reviews", [verifyAuth, verifyUser], reviewRouter);

  return apiRouter;
}
