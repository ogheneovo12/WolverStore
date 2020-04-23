import mongoose from "mongoose";
import moment from "moment";
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateCreated: { type: Date, default: Date.now(), expires: "30m" },
    items: [],
    totalAmount: Number,
  },
  { timestamps: true }
);
cartSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    userId: this.userId,
    created: moment(this.dateCreated).startOf("hour").fromNow(),
    date: moment(this.dateCreated).format("MMMM Do YYYY, h:mm:ss a"),
    totalAmount: this.totalAmount,
    items: this.items,
  };
};

export default mongoose.model("Cart", cartSchema);
