import { Router } from "express";
import userController from "./User.controller";
import { signUpValidator } from "../../routes/middlewares/validateReq";
const userRouter = Router();

userRouter.post("/signup", signUpValidator, userController.createUser);
userRouter.post("/login", userController.login);

export default userRouter;
