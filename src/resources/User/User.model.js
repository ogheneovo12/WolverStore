import mongoose from "mongoose";
import * as CONFIG from "../../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  firstname: { type: String, trim: true, lowercase: true, required: true },
  lastname: { type: String, trim: true, lowercase: true, required: true },
  email: { type: String, trim: true, lowercase: true, required: true },
  phonenumber: { type: String, trim: true },
  password: { type: String, trim: true, required: true },
  userType: { type: String, trim: true, default: "user" },
  dateCreated: { type: Date, default: Date.now() },
  lastLogin: { type: String, default: "never" },
  verified: { type: Boolean, default: false },
  addresses: { type: Array, default: [] },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(CONFIG.saltRound)
    );
  }
  next();
});
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this.email }, CONFIG.jwtSecret, {
    expiresIn: this.tokenLife,
  });
  this.tokens = this.tokens.concat({ token });
  const user = this.save();
  return Promise.resolve({ token, user });
};
userSchema.statics.getByValidCredentials = async (username, password) => {
  const user = await User.findOne({
    $or: [{ email: username }, { name: username }],
  });
  if (!user) {
    throw "user not found, please signup or check login details";
  }
  const passwordVerify = await bcrypt.compare(password, user.password);
  if (!passwordVerify) {
    throw "password is invalid";
  }
  return Promise.resolve(user);
};
//convert user details to json

export default mongoose.model("User", userSchema);
