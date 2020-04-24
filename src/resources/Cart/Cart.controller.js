import mongoose from "mongoose";
import Cart from "./Cart.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";
import Product from "../Product/Product.model";
export default class cartController {
  static async create(req, res, next) {
    try {
      const cart = new Cart({
        userId: req.user._id,
        items: req.body.items,
        totalAmount: req.body.amount,
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
      const cart = await Cart.findOne({
        $and: [{ _id: req.params.cartId }, { userId: req.user._id }],
      });
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
      const getUserCart = await Cart.findOne({
        $and: [{ _id: req.params.cartId }, { userId: req.user._id }],
      });
      if (!getUserCart) {
        throw createError(statusCode.notfound, "cart was not found");
      }
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

  static async getAll(req, res, next) {
    try {
      const carts = await Cart.find({ userId: req.user._id });
      return res.status(statusCode.success).json({
        status: successMessage.status,
        data: carts.map((cart) => cart.toJSON()),
      });
    } catch (err) {
      next(err);
    }
  }
  static async addToCart(req, res, next) {
    try {
      const cart = await Cart.findOne({ _id: req.params.cartId });
      if (!cart) {
        throw createError(statusCode.notfound, "cart was not found");
      }
      const product = await Product.findOne({ _id: req.body.productId });
      if (!product) {
        throw createError(statusCode.notfound, "product was not found");
      }
      if (product.inStock <= 0) {
        throw createError(statusCode.notfound, "sorry product is Out of Stock");
      }
      cart.items.push(product);
      await cart.save();
      res.status(statusCode.success).json({
        status: successMessage.status,
        message: "item  was added to cart succesfully",
        data: cart.toJSON(),
      });
    } catch (err) {
      next(err);
    }
  }
  static async removeItem(req, res, next) {
    try {
      const cart = await Cart.findOne({ _id: req.params.cartId });
      if (!cart) {
        throw createError(statusCode.notfound, "cart was not found");
      }
      const product = cart.items.find((item) => item._id == req.body.productId);
      if (!product) {
        throw createError(statusCode.notfound, "product was not found");
      }
      cart.items = cart.items.filter((item) => item._id == req.body.productId);
      await cart.save();
      res.status(statusCode.success).json({
        status: successMessage.status,
        message: "item  was removed from cart succesfully",
        data: cart.toJSON(),
      });
    } catch (err) {
      next(err);
    }
  }
}
