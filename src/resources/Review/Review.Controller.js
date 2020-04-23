import mongoose from "mongoose";
import Review from "./Review.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";
import Product from "../Product/Product.model";
import StoreModel from "../Store/Store.model";
export default class reviewController {
  static async create(req, res, next) {
    try {
      const product = await Product.findOne({ _id: req.params.productId });
      if (!product) {
        throw createError(
          statusCode.notfound,
          "sorry product no longer exists, thanks for your effort for giving a review"
        );
      }
      const store = await StoreModel.findOne({ _id: product.storeId });
      if (!store) {
        throw createError(
          statusCode.notfound,
          "sorry the store for this product no longer exists, thanks you"
        );
      }
      const review = new Review({
        customer: req.user.toJSON(),
        rating: Math.floor(req.body.rating),
        store: store.toJSON(),
        comment: req.body.comment,
      });

      await review.save();
      return res.status(statusCode.created).json({
        status: successMessage.status,
        message: "review was created",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getreview(req, res, next) {
    try {
      const review = await Review.findOne({ _id: req.params.reviewId });
      if (!review) {
        throw createError(statusCode.notfound, "review was not found");
      }
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: [review.toJSON()] });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const review = await Review.findByIdAndDelete({
        _id: req.params.reviewId,
      });
      if (!review) {
        throw createError(statusCode.notfound, "review was not deleted");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        message: "review was deleted",
        data: review,
      });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const review = await Review.findByIdAndUpdate(
        { _id: req.params.reviewId },
        { ...req.body }
      );
      if (!review) {
        throw createError(statusCode.notfound, "review was not found");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        data: review,
        message: "review was updated succesfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const reviews = await Review.find({});
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: reviews });
    } catch (err) {
      next(err);
    }
  }
}
