import mongoose from "mongoose";
import User from "./User.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";
import bcrypt from "bcrypt";

import Stores from "../Store/Store.model";
import Product from "../Product/Product.model";

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
      res.status(statusCode.created).json({
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
      return User.getByValidCredentials(req.body.email, req.body.password);
    }

    function checkIfUserExists(user) {
      if (!user) {
        throw createError(statusCode.notfound, "Account was not found");
      }

      return user;
    }

    function generateUserToken(user) {
      const day = new Date();
      user.lastLogin = `${day.getDate()}-${
        day.getMonth() + 1
      }-${day.getFullYear()}-${day.toLocaleTimeString()}`;
      return user.generateAuthToken();
    }
    function sendResponse({ user, token }) {
      res.status(statusCode.success).json({
        status: successMessage.status,
        message: "User is logged in",
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
    getUser()
      .then(checkIfUpdateInfoAlreadyExists)
      .then(update)
      .then(sendResponse)
      .catch((err) => {
        next(err);
      });
    function getUser() {
      return User.find({ email: req.user.id });
    }
    function checkIfUpdateInfoAlreadyExists(user) {
      if (req.body.username || req.body.email) {
        return User.find({ email: req.body.email });
      }
    }
    const userid = req.params.id;
    async function update(existingUser) {
      if (existingUser) {
        throw createError(
          statusCode.conflict,
          "user with this info already exists"
        );
      }
      const user = await User.findOne({ _id: req.params.id });
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.phonenumber = req.body.phonenumber || user.phonenumber;
      return await user.save();
    }

    function sendResponse() {
      return res.status(statusCode.success).json({
        status: successMessage.status,
        message: "User account was  updated",
      });
    }
  }
  static getUser(req, res, next) {
    User.findOne({
      $or: [{ _id: req.params.userId }, { email: req.params.userId }],
    })
      .then(sendResponse)
      .catch(next);

    function sendResponse(user) {
      if (user) {
        res.status(statusCode.success).json({
          status: successMessage.status,
          data: [user.toJSON()],
        });
      } else {
        res.status(statusCode.notfound).json({
          status: successMessage.status,
          message: "user was not found",
        });
      }
    }
  }
  static deletUser(req, res, next) {
    User.findById({ _id: req.params.id })
      .then(checkIfUserExists)
      .then(deleteUserStores)
      .then(deleteUser)
      .then(sendResponse)
      .catch(next);
    function checkIfUserExists(user) {
      if (!user) {
        res.status(statusCode.notfound).json({
          status: successMessage.status,
          message: "user was not found",
        });
      }
      return user;
    }
    function deleteUserStores(user) {
      Stores.deleteMany({ userId: user._id });
      return user;
    }
    function deleteUser(user) {
      return User.findByIdAndDelete({ _id: user._id });
    }
    function sendResponse(user) {
      if (user) {
        res.status(statusCode.success).json({
          status: successMessage.status,
          message: "user deleted sucesfully",
        });
      }
    }
  }
}
