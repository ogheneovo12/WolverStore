import mongoose from "mongoose";
import Product from "./Product.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";
import Store from "../Store/Store.model";
export default class productController {
  static async create(req, res, next) {
    try {
      const store = await Store.findOne({ _id: req.body.storeId });
      if (!store) {
        throw createError(statusCode.notfound, "sorry store isn't available");
      }
      const product = new Product({
        storeId: req.body.storeId,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        variations: req.body.variations,
        category: req.body.category,
      });

      await product.save();
      return res.status(statusCode.created).json({
        status: successMessage.status,
        message: "product was created",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getProduct(req, res, next) {
    try {
      const product = await Product.findOne({ _id: req.params.productId });
      if (!product) {
        throw createError(statusCode.notfound, "product was not found");
      }
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: [product.toJSON()] });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete({
        _id: req.params.productId,
      });
      if (!product) {
        throw createError(statusCode.notfound, "product was not deleted");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        message: "product was deleted",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const product = await Product.findByIdAndUpdate(
        { _id: req.params.productId },
        { ...req.body }
      );
      if (!product) {
        throw createError(statusCode.notfound, "product was not found");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        data: product,
        message: "product was updated succesfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const products = await Product.find({});
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: products });
    } catch (err) {
      next(err);
    }
  }
}
