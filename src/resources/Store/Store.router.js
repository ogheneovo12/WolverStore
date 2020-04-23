import Router from "express";
import storeController from "./Store.controller";
const storeRouter = Router();

storeRouter.get("/all", storeController.getAll);
storeRouter.get("/get/:storeId", storeController.getstore);
storeRouter.post("/create", storeController.create);
storeRouter.put("/update/:storeId", storeController.update);
storeRouter.delete("/delete/:storeId", storeController.delete);

export default storeRouter;
