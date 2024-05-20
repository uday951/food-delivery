"use strict";

var express = require("express");

var dotEnv = require("dotenv");

var mongoose = require("mongoose");

var vendorrouts = require("./routes/vendorrouts");

var bodyParser = require("body-parser");

var app = express();
var PORT = 4000;
dotEnv.config();
mongoose.connect(process.env.MONGO_URI).then(function () {
  return console.log("mongoose connecterd successfully");
})["catch"](function (error) {
  return console.log(error);
});
app.use(bodyParser.json());
app.use("/vendor", vendorrouts);
app.listen(PORT, function () {
  console.log("welcome to the port ".concat(PORT));
});
app.use('/home', function (req, res) {
  res.send("<h1>hi this is uday</h1>");
});