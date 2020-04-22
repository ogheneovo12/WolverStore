import validator from "../../utils/validations";
import { createError } from "../../utils/utils";
import { statusCode } from "../../utils/status";

export const signUpValidator = (req, res, next) => {
  const errors = validator([
    { type: "email", value: req.body.email },
    { type: "password", value: req.body.password },
    { type: "username", value: req.body.firstname, optional: "firstname" },
    { type: "username", value: req.body.lastname, optional: "lastname" },
  ]);
  if (errors) {
    next(createError(statusCode.bad, errors));
  }
  next();
};
