import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    trim: true,
  },
  customer: {
    userId: { type: mongoose.Schema.Types.ObjectId },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  date: { type: Date, default: Date.now() },
  shippingAddress: {
    street: { type: String },
    state: { type: String },
    city: { type: String },
    zipcode: { type: String },
    country: { type: String },
  },
  status: { type: String },
  paid: { type: Boolean },
  items: [],
  Amount: { type: Number },
});
