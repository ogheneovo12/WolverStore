import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number },
  dateCreated: { type: Date, default: Date.now() },
  price: { type: Number },
  discountPrice: { type: Number },
  description: { type: String },
  images: { type: String },
  category: { type: String },
  inStock: { type: Number },
  variations: { type: Array },
});

export default mongoose.model("Product", productSchema);
