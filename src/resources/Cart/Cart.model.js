import mongoose from "mongoose";

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

export default mongoose.model("Cart", cartSchema);
