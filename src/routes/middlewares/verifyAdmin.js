import User from "../../resources/User/User.model";
import { createError } from "../../utils/utils";
import { statusCode } from "../../utils/status";
export default function verifyAdmin(req, res, next) {
  User.findOne({ $and: [{ email: req.user.id }, { userType: "admin" }] })
    .then(abortIfUserNotFound)
    .then(() => next())
    .catch(next);

  function abortIfUserNotFound(admin) {
    if (!admin) {
      throw createError(
        statusCode.unauthorized,
        "Only admins can access this route"
      );
    }
    req.admin = admin;
  }
}
