import mongoose from "mongoose";
import Order from "./Order.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";

export default class orderController {
  static async create(req, res, next) {
    try {
      const order = new Order({
        refrenceId: getRefId,
        customer: req.body.customer,
        shippingAddress: req.body.shippingAddress,
        status: req.body.status,
        paid: req.body.paid,
        items: req.body.items,
        amount: req.body.amount,
      });

      await order.save();
      return res.status(statusCode.created).json({
        status: successMessage.status,
        message: "order was created",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getorder(req, res, next) {
    try {
      const order = await Order.findOne({ _id: req.params.orderId });
      if (!order) {
        throw createError(statusCode.notfound, "order was not found");
      }
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: [order.toJSON()] });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const order = await Order.findByIdAndDelete({
        _id: req.params.orderId,
      });
      if (!order) {
        throw createError(statusCode.notfound, "order was not deleted");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        message: "order was deleted",
        data: order,
      });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const order = await Order.findByIdAndUpdate(
        { _id: req.params.orderId },
        { ...req.body }
      );
      if (!order) {
        throw createError(statusCode.notfound, "order was not found");
      }
      return res.status(statusCode.success).json({
        status: successMessage.status,
        data: order,
        message: "order was updated succesfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const orders = await Order.find({});
      return res
        .status(statusCode.success)
        .json({ status: successMessage.status, data: orders });
    } catch (err) {
      next(err);
    }
  }
}
