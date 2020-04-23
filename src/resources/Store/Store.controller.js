import mongoose from "mongoose";
import Store from "./Store.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";
import products from "../Product/Product.model";
import ProductModel from "../Product/Product.model";
export default class storeController {
  static async create(req, res, next) {
    try {
      const store = new Store({
        userId: req.admin._id,
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        address: req.body.address,
        category: req.body.category,
        logo: req.body.logo,
        phone: req.body.phone,
        banner: req.body.banner,
      });

      await store.save();
      return res.status(statusCode.created).json({
        status: successMessage.status,
        message: "store was created",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getStore(req, res, next) {
    try {
      const store = await Store.findOne({ _id: req.params.storeId });
      if (!store) {
        throw createError(statusCode.notfound, "store was not found");
      }
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: [store.toJSON()] });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const existingStore = await Store.findById({ _id: req.params.storeId });
      if (!existingStore) {
        throw createError(statusCode.notfound, "store was not found");
      }
      const products = await ProductModel.deleteMany({
        storeId: existingStore._id,
      });
      if (!products) {
        throw createError(statusCode.notfound, "store could not be deleted");
      }
      const store = await Store.findByIdAndDelete({
        _id: req.params.storeId,
      });
      if (!store) {
        throw createError(statusCode.notfound, "store could not be deleted");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        message: "store was deleted",
        data: store,
      });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const store = await Store.findByIdAndUpdate(
        { _id: req.params.storeId },
        { ...req.body }
      );
      if (!store) {
        throw createError(statusCode.notfound, "store was not found");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        data: store,
        message: "store was updated succesfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const stores = await Store.find({});
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: stores });
    } catch (err) {
      next(err);
    }
  }
}
