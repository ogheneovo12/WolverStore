import User from "../../resources/User/User.model";

export default function verifyUser(req, res, next) {
  User.findOne({ $and: [{ email: req.user.id }, { userType: "admin" }] })
    .then(abortIfUserNotFound)
    .then(() => next())
    .catch(next);

  function abortIfUserNotFound(user) {
    if (!user) {
      throw createError(
        statusCode.unauthorized,
        "Only admins can access this route"
      );
    }
    req.user = user;
  }
}
