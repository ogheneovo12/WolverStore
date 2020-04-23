import mongoose from "mongoose";
import Cart from "./Cart.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";

export default class cartController {
  static async create(req, res, next) {
    try {
      const cart = new cart({
        userId: req.user._id,
        products: req.body.items,
        totalAmount: req.body.totalAmount,
      });

      await cart.save();
      return res.status(statusCode.created).json({
        status: successMessage.status,
        message: "cart was created",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getcart(req, res, next) {
    try {
      const cart = await Cart.findOne({ _id: req.params.cartId });
      if (!cart) {
        throw createError(statusCode.notfound, "cart was not found");
      }
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: [cart.toJSON()] });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const cart = await Cart.findByIdAndDelete({
        _id: req.params.cartId,
      });
      if (!cart) {
        throw createError(statusCode.notfound, "cart was not deleted");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        message: "cart was deleted",
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const cart = await Cart.findByIdAndUpdate(
        { _id: req.params.cartId },
        { ...req.body }
      );
      if (!cart) {
        throw createError(statusCode.notfound, "cart was not found");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        data: cart,
        message: "cart was updated succesfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const carts = await Cart.find({});
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: carts });
    } catch (err) {
      next(err);
    }
  }
}
