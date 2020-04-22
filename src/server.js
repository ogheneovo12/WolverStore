import http from "http";
import app from "./app";
import * as config from "./config";

app.setup().then(() => {
  const server = http.createServer(app);

  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});
