import User from "../../resources/User/User.model";
import { createError } from "../../utils/utils";
import { statusCode } from "../../utils/status";
export default function verifyUser(req, res, next) {
  User.findOne({ $and: [{ email: req.user.id }, { userType: "user" }] })
    .then(abortIfUserNotFound)
    .then(() => next())
    .catch(next);

  function abortIfUserNotFound(user) {
    if (!user) {
      throw createError(
        statusCode.unauthorized,
        "Only users can access this route, please create a user account"
      );
    }
    req.user = user;
  }
}
