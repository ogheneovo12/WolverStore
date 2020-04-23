import Router from "express";
import reviewController from "./Review.controller";
import verifyAuth from "../../routes/middlewares/verifyAuth";
import verifyUser from "../../routes/middlewares/verifyUser";
const reviewRouter = Router();

reviewRouter.get("/all", reviewController.getAll);
reviewRouter.get("/get/:reviewId", reviewController.getreview);
reviewRouter.post(
  "/create/:productId",
  [verifyAuth, verifyUser],
  reviewController.create
);
reviewRouter.put(
  "/update/:reviewId",
  [verifyAuth, verifyUser],
  reviewController.update
);
reviewRouter.delete(
  "/delete/:reviewId",
  [verifyAuth, verifyUser],
  reviewController.delete
);

export default reviewRouter;
