import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    trim: true,
  },
  customer: {
    userId: { type: mongoose.Schema.Types.ObjectId },
    firstname: { type: String },
    lastname: { type: String },
    phonenumber: { type: String },
    email: { type: String },
  },
  date: { type: Date, default: Date.now() },
  shippingAddress: {
    street: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  status: { type: String },
  paid: { type: Boolean },
  items: [],
  Amount: { type: Number },
});
orderSchema.toJSON = function () {
  return {
    _id: this._id,
    referenceId: this.referenceId,
    customer: this.customer.firstname + " " + this.customer.lastname,
    shippingAddress: this.shippingAddress,
    status: this.status,
    amount: this.amount,
    items: this.items,
    paid: this.paid,
    ordered: moment(this.dateCreated).startOf("hour").fromNow(),
    date: moment(this.dateCreated).format("MMMM Do YYYY, h:mm:ss a"),
  };
};
export default mongoose.model("Order", orderSchema);
