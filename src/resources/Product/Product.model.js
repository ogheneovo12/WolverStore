import mongoose from "mongoose";
import moment from "moment";

const productSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  name: { type: String, required: [true, "name is required"] },
  quantity: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now() },
  price: { type: Number, min: 0 },
  discountPrice: { type: Number, min: 0 },
  description: { type: String },
  images: { type: String },
  category: { type: String, default: "uncategorised" },
  inStock: { type: Number, default: 0 },
  variations: { type: Array },
});
productSchema.methods.toJson = function () {
  return {
    _id: this._id,
    name: this.name,
    variations: this.variations,
    storeId: this.storeId,
    price: this.price,
    discountPrice: this.discountPrice,
    category: this.category,
    description: this.description,
    available: this.inStock,
    Listed: moment(this.dateCreated).startOf("hour").fromNow(),
    dateListed: moment(this.dateCreated).format("MMMM Do YYYY, h:mm:ss a"),
  };
};
export default mongoose.model("Product", productSchema);
