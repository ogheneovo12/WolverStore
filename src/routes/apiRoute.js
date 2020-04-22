import { Router } from "express";
import userRouter from "../resources/User/User.router";

export function setup() {
  const apiRouter = Router();

  // add api routes here
  // apiRouter.use('/admin', adminRouter);
  apiRouter.use("/users", userRouter);
  // apiRouter.use('/product', productRouter);
  // apiRouter.use('/store', storeRouter);
  // apiRouter.use('/cart', cartRouter);
  // apiRouter.use('/order', orderRouter);
  // apiRouter.use('/review', reviewRouter);

  return apiRouter;
}
