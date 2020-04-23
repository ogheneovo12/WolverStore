import User from "../../resources/User/User.model";

export default function verifyAdmin(req, res, next) {
  User.findOne({ _id: req.user.id }, { userType: "User" })
    .then(abortIfUserNotFound)
    .then(() => next())
    .catch(next);

  function abortIfUserNotFound(user) {
    if (!user)
      throw createError(
        401,
        "please create a user account to be able to view this task"
      );
  }
  req.user = user;
}
