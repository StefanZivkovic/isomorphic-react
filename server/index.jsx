import express from "express";
import yields from "express-yields";
import fs from "fs-extra";
import webpack from "webpack";

const port = process.env.port || 3000;
const app = express();

if (process.env.NODE_ENV === "development") {
  const config = require("../webpack.config.dev.babel").default;
  const compailer = webpack(config);

  app.use(
    require("webpack-dev-middleware")(compailer, {
      noInfo: true,
    })
  );

  app.use(require("webpack-hot-middleware")(compailer));
}

app.get(["/"], function* (req, res) {
  let index = yield fs.readFile("./public/index.html", "utf-8");
  res.send(index);
});

app.listen(port, "0.0.0.0", () => console.info(`app is listening on ${port}`));
