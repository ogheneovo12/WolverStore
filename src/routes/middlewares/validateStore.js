import validator from "../../utils/validations";
import { createError } from "../../utils/utils";
import { statusCode } from "../../utils/status";
export const createStoreValidator = (req, res, next) => {
  const errors = validator([
    { type: "email", value: req.body.email },
    { type: "username", value: req.body.name, optional: "name" },
    { type: "username", value: req.body.logo, optional: "logo" },
    { type: "username", value: req.body.banner, optional: "banner" },
    { type: "username", value: req.body.category, optional: "category" },
  ]);
  if (errors) {
    next(createError(statusCode.bad, errors));
  }
  next();
};
export const UpdateStoreValidator = (req, res, next) => {
  if (req.body.email) {
    if (!validator(null, "email")(req.body.email)) {
      next(createError(statusCode.nocontent, "invalid email format"));
    }
  }
  if (req.body.name) {
    if (!validator(null, "username")(req.body.name)) {
      next(createError(statusCode.conflict, "invalid name"));
    }
  }
  if (req.body.logo) {
    if (!validator(null, "username")(req.body.logo)) {
      next(createError(statusCode.conflict, "invalid.logo"));
    }
  }
  if (req.body.banner) {
    if (!validator(null, "username")(req.body.banner)) {
      next(createError(statusCode.conflict, "invalid banner"));
    }
  }
  if (req.body.category) {
    if (!validator(null, "username")(req.body.category)) {
      next(createError(statusCode.conflict, "invalid category"));
    }
  }
  next();
};
