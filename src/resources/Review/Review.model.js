import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  customer: {
    userId: { type: mongoose.Schema.Types.ObjectId },
    firstName: { type: String, lowercase: true },
    lastName: { type: String, lowercase: true },
    phone: { type: String, lowercase: true },
    email: { type: String, lowercase: true },
  },
  verified: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now() },
  rating: Number,
  store: {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, lowercase: true },
  },
  comment: String,
});

export default mongoose.model("Review", reviewSchema);
