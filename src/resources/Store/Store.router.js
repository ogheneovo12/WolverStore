import Router from "express";
import storeController from "./Store.controller";
import verifyAuth from "../../routes/middlewares/verifyAuth";
import verifyAdmin from "../../routes/middlewares/verifyAdmin";
const storeRouter = Router();

storeRouter.get("/all", storeController.getAll);
storeRouter.get("/get/:storeId", storeController.getstore);
storeRouter.post("/create", [verifyAuth, verifyAdmin], storeController.create);
storeRouter.put(
  "/update/:storeId",
  [verifyAuth, verifyAdmin],
  storeController.update
);
storeRouter.delete(
  "/delete/:storeId",
  [verifyAuth, verifyAdmin],
  storeController.delete
);

export default storeRouter;
