import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

const PORT = process.env.PORT;

const app = express();

app.use(cors()); // use before everymiddleware

import router from "./router/router.js";
import blogrouter from "./router/post/router.js";

app.use(bodyParser.json()); // when sending json data drom postman;
// app.use(express.json);
// app.use(express.urlencoded({extended:false}))// when sending html data from webpage
app.use("/api/user", router);
app.use("/api/blog", blogrouter);
import "./db/conn.js";

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running");
  });
}

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
