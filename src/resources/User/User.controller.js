import mongoose from "mongoose";
import User from "./User.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";

export default class UserController {
  static createUser(req, res, next) {
    getExistingUser()
      .then(abortIfUserExists)
      .then(createNewUser)
      .then(saveUser)
      .then(handleResponse)
      .catch(next);

    function getExistingUser() {
      return User.findOne({ email: req.body.email });
    }
    function abortIfUserExists(user) {
      if (user) throw createError(statusCode.conflict, "user already exists");
    }
    function createNewUser() {
      const userObj = { ...req.body };
      return new User(userObj);
    }
    function saveUser(user) {
      return user.save();
    }

    function handleResponse(user) {
      res.status(statusCode.success).json({
        status: successMessage.status,
        message: "user account created",
      });
    }
  }
  static login(req, res, next) {
    getValidUser()
      .then(checkIfUserExists)
      .then(generateUserToken)
      .then(sendResponse)
      .catch(next);

    function getValidUser() {
      return User.getByValidCredentials(req.body.username, req.body.password);
    }

    function checkIfUserExists(user) {
      if (!user)
        throw createError(statusCode.notfound, "Account was not found");
      return user;
    }
    function generateUserToken(user) {
      return user.generateAuthToken();
    }
    function sendResponse({ user, token }) {
      res.status(statusCode.success).json({
        status: successMessage,
        message: "Employee logged in",
        data: [
          {
            token,
            userId: user._id,
          },
        ],
      });
    }
  }
  static upDateUser(req, res, next) {
    user = req.user;
  }
}
