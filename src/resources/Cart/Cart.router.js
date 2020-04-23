import Router from "express";
import cartController from "./cart.controller";
import verifyAuth from "../../routes/middlewares/verifyAuth";
import verifyUser from "../../routes/middlewares/verifyUser";
const cartRouter = Router();

cartRouter.get("/all", cartController.getAll);
cartRouter.get("/get/:cartId", cartController.getcart);
cartRouter.post("/create", [verifyAuth, verifyUser], cartController.create);
cartRouter.put(
  "/update/:cartId",
  [verifyAuth, verifyUser],
  cartController.update
);
cartRouter.delete(
  "/delete/:cartId",
  [verifyAuth, verifyUser],
  cartController.delete
);

export default cartRouter;
