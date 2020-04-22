import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtSecret } from "../config";

export function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function generateJwtToken(payload, expiry) {
  return jwt.sign(payload, jwtSecret, { expiresIn: expiry });
}

export function generateHash(string) {
  return bcrypt.hash(string, 11);
}
