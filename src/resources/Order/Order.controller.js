import mongoose from "mongoose";
import Order from "./Order.model";
import Store from "../Store/Store.model";
import { createError } from "../../utils/utils";
import { successMessage, errorMessage, statusCode } from "../../utils/status";

export default class orderController {
  static create(req, res, next) {
    getStore()
      .then(checkIfStoreExist)
      .then(getRefId)
      .then(createOrder)
      .then(handleResponse)
      .catch(next);
    function getStore() {
      return Store.findOne({ _id: req.params.storeId });
    }
    function checkIfStoreExist(store) {
      if (!store) {
        throw createError(
          statusCode.notfound,
          "sorry, this order cant be placed, store does not exist"
        );
      }
      return Promise.resolve(store);
    }

    function getRefId(store) {
      const refid =
        store.name.substr(0, 3) +
        req.user.firstname.substr(0, 3) +
        new Date().toLocaleDateString();
      return Promise.resolve(refid);
    }

    function createOrder(refid) {
      const order = new Order({
        referenceId: refid,
        customer: req.user.toJSON(),
        shippingAddress: req.body.shippingAddress,
        paid: req.body.paid,
        items: req.body.items,
        amount: req.body.amount,
      });
      return order.save();
    }

    function handleResponse(order) {
      return res.status(statusCode.created).json({
        status: successMessage.status,
        message: "order was created",
      });
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
