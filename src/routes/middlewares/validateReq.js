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
export const loginValidator = (req, res, next) => {
  const errors = validator([
    { type: "email", value: req.body.email },
  ]);
  if (errors) {
    next(createError(statusCode.bad, errors));
  }
  next();
};

export const upDatevalidator =(req,res,next) =>{
  if(req.body.email){
    if(!validator(null,"email")(req.body.email)){
      next(createError(statusCode.nocontent),"invalid email format")
    }
  }
  if(req.body.password){
    if(!validator(null,"password")(req.body.password)){
      next(createError(statusCode.nocontent),"invalid password")
    }
  }
  next();
}