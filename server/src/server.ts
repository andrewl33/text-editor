import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";

import { startDB } from "./models/dbinit";

import setToken from "./middleware/token.middleware";

import accountRouter from "./routes/account.route";
import authRouter from "./routes/auth.route";
import collectionRouter from "./routes/collection.route";
import fileRouter from "./routes/file.route";
import showAllRouter from "./routes/showAll.route";
import tagRouter from "./routes/tag.route";

dotenv.config();

const app = express();

// app.set("port", process.env.PORT || 3300);
app.set("port", 37539);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setToken);

// frontend
const frontendPaths = ["/", "/dashboard", "/files/*", "/collections/*", "/grading"];
app.use(express.static(path.join(__dirname, "../../text-edit-app/build")));
app.get(frontendPaths, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "text-edit-app", "build", "index.html")
  );
});

// api routes
app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);
app.use("/api/file", fileRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/tag", tagRouter);

// show all route
app.use("/api/grading", showAllRouter);

app.listen(app.get("port"), () => {
  startDB();
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});

module.exports = app;
