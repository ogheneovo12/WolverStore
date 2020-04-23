import mongoose from "mongoose";
import Review from "./Review.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";

export default class reviewController {
  static async create(req, res, next) {
    try {
      const review = new Review({});

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
      const review = await review.findOne({ _id: req.params.reviewId });
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
