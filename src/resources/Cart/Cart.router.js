import Router from "express";
import cartController from "./cart.controller";
const cartRouter = Router();

cartRouter.get("/all", cartController.getAll);
cartRouter.get("/get/:cartId", cartController.getcart);
cartRouter.post("/create", cartController.create);
cartRouter.put("/update/:cartId", cartController.update);
cartRouter.delete("/delete/:cartId", cartController.delete);

export default cartRouter;
