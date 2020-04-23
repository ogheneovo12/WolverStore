import mongoose from "mongoose";
import * as CONFIG from "../../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../../utils/utils";
import { statusCode } from "../../utils/status";
import moment from "moment";
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
    expiresIn: 30 * 60,
  });
  this.tokens = this.tokens.concat({ token });
  const user = await this.save();
  return Promise.resolve({ user, token });
};
userSchema.statics.getByValidCredentials = async function (username, password) {
  const user = await this.findOne({
    $or: [{ email: username }, { name: username }],
  });
  if (!user) {
    throw createError(statusCode.notfound, "Account was not found");
  }
  const passwordVerify = await bcrypt.compare(password, user.password);
  if (!passwordVerify) {
    throw createError(statusCode.conflict, "The password doesn't match");
  }
  return Promise.resolve(user);
};
//convert user details to json
userSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    phonenumber: this.phonenumber,
    joined: moment(this.dateCreated).startOf("hour").fromNow(),
    joinedDate: moment(this.dateCreated).format("MMMM Do YYYY, h:mm:ss a"),
  };
};
export default mongoose.model("User", userSchema);
