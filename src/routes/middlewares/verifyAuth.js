import jwt from 'jsonwebtoken';
import { createError } from '../../utils/utils';
import { jwtSecret } from '../../config';
import { statusCode } from "../../utils/status"
export default function verifyAuth(req, res, next) {
  const tokenBearer = req.headers['authorization'];
  
  let token;

  try {
    token = tokenBearer.split(' ')[1];
  } catch (error) {
    return next(createError(statusCode.notfound, 'Token not found'));
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err){
      if (err.message.startsWith("jwt")) {
        err.message = err.message.replace("jwt", "token");
      }
      return next(createError(statusCode.unauthorized,err.message));
    }
    req.user = { id: decoded._id };
    next();
  });
}
