import Router from "express";
import storeController from "./Store.controller";
import verifyAuth from "../../routes/middlewares/verifyAuth";
import verifyAdmin from "../../routes/middlewares/verifyAdmin";
import {
  createStoreValidator,
  UpdateStoreValidator,
} from "../../routes/middlewares/validateStore";
const storeRouter = Router();

storeRouter.get("/all", storeController.getAll);
storeRouter.get("/get/:storeId", storeController.getStore);
storeRouter.post(
  "/create",
  [createStoreValidator, verifyAuth, verifyAdmin],
  storeController.create
);
storeRouter.put(
  "/update/:storeId",
  [UpdateStoreValidator, verifyAuth, verifyAdmin],
  storeController.update
);
storeRouter.delete(
  "/delete/:storeId",
  [verifyAuth, verifyAdmin],
  storeController.delete
);

export default storeRouter;
