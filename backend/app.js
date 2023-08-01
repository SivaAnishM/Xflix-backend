const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./router/index.js")

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(compression());
// app.use(cors());
console.log("index")
app.use("/v1", routes);

module.exports = app