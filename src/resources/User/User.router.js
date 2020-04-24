import { Router } from "express";
import userController from "./User.controller";
import {
  signUpValidator,
  loginValidator,
  upDatevalidator,
} from "../../routes/middlewares/validateReq";
import verifyAuth from "../../routes/middlewares/verifyAuth";
const userRouter = Router();
userRouter.get("/getuser/:userId", userController.getUser);
userRouter.post("/signup", signUpValidator, userController.createUser);
userRouter.post("/adminsignup", signUpValidator, userController.createAdmin);
userRouter.post("/login", loginValidator, userController.login);
userRouter.put(
  "/update/:id",
  [upDatevalidator, verifyAuth],
  userController.upDateUser
);
userRouter.delete("/delete/:id", [verifyAuth], userController.deletUser);

export default userRouter;
