import express from "express";
import cookieParser from "cookie-parser";
import ConnectDB from "./DB/db_init.js";
import article from "./routers/articleRoutes.js";
import auth from "./routers/authRoute.js";

import "dotenv/config";

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use(cookieParser());

// Routing
app.use("/articles", article);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Welcome to the project");
});
//error handeling
app.all("*", (req, res) => {
  res.status(400).send("this request could not be handeled");
});

//DB connection
ConnectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
