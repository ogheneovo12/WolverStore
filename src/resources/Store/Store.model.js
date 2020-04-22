import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, trim: true, lowercase: true },
  email: { type: String, trim: true, lowercase: true },
  description: { type: String, trim: true },
  dateCreated: { type: Date, default: Date.now() },
  verified: { type: Boolean },
  suspended: { type: Boolean },
  address: {
    street: { type: String, lowercase: true },
    state: { type: String, lowercase: true },
    city: { type: String, lowercase: true },
    zipcode: { type: String },
    country: { type: String, lowercase: true },
  },
  category: { type: String, trim: true, lowercase: true },
  logo: { type: String, trim: true },
  phone: { type: String, trim: true },
  banner: { type: String, trim: true },
  lowercase: true,
});

export default mongoose.model("Store", storeSchema);
