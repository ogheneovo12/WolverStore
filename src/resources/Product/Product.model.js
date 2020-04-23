import mongoose from "mongoose";
import moment from "moment";

const productSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    // required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number },
  dateCreated: { type: Date, default: Date.now() },
  price: { type: Number },
  discountPrice: { type: Number },
  description: { type: String },
  images: { type: String },
  category: { type: String, default: "uncategorised" },
  inStock: { type: Number },
  variations: { type: Array },
});
productSchema.methods.toJson = function () {
  return {
    id: this._id,
    name: this.name,
    variations: this.variations,
    storeId: this.storeId,
    price: this.price,
    discountPrice: this.discountPrice,
    category: this.category,
    description: this.description,
    available: this.inStock,
    dayListed: moment(this.dateCreated),
  };
};
export default mongoose.model("Product", productSchema);
