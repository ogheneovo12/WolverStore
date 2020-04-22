import mongoose from "mongoose";

/**
 * Mongoose Loader: establishes a connection to the remote
 * MongoDB database.
 *
 * N/B: All loaders take in the express app, and the app config
 * object.
 */

export default function loadMongoose(app, config) {
  const connection = mongoose
    .connect(config.dbURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }) //{ useUnifiedTopology: true } was passed to monitor mongo server, you can remove it
    .then(() => console.log("DATABASE CONNECTED"))
    .catch((err) => console.log("DATABASE CONNECTION ERROR"));
  mongoose.connection.on("error", (err) =>
    console.error.bind(console, "DB connection error!")
  );
  mongoose.connection.on(
    "disconected",
    console.error.bind(console, "DATABASE DISCONNECTED")
  );
  process.on("SIGINT", () => {
    console.log(
      "mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
  return connection;
}
