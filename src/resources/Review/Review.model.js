import mongoose from "mongoose";
import moment from "moment";
const reviewSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  customer: {
    userId: { type: mongoose.Schema.Types.ObjectId },
    firstname: { type: String, lowercase: true },
    lastname: { type: String, lowercase: true },
    phonenumber: { type: String, lowercase: true },
    email: { type: String, lowercase: true },
  },
  verified: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now() },
  rating: {
    type: Number,
    required: true,
    min: [
      0,
      "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
    ],
    max: [
      5,
      "The value of path `{PATH}` ({VALUE}) is above the limit ({MAX}).",
    ],
  },
  store: {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, lowercase: true },
  },
  comment: String,
});
reviewSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    customer: this.firstname + this.lastname,
    rating: this.rating,
    comment: this.comment,
    reviewed: moment(this.dateCreated).startOf("hour").fromNow(),
    reviewDate: moment(this.dateCreated).format("MMMM Do YYYY, h:mm:ss a"),
  };
};
export default mongoose.model("Review", reviewSchema);
