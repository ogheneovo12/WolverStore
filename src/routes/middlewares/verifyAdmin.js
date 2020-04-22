// import User from '../db/admin/admin.model';

// export default function verifyAdmin(req, res, next) {
//   Admin.findOne({ _id: req.user.id })
//     .then(abortIfUserNotFound)
//     .then(() => next())
//     .catch(next);

//   function abortIfUserNotFound(admin) {
//     if (!admin)
//       throw createError(401, 'Only admins can access this route');
//   }
// }