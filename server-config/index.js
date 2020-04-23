// require("dotenv").config();

// SET EXPRESS ENVIRONMENT
const express = require("express");
const app = express();

// Set express variables to parse URLS and read any 
//     JSON objects that are passed within
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add additional modules for the server here
//-------------------------------------------

// Use Morgan as a HTTP server logger
const logger = require("morgan");
app.use(logger("dev"));

// USE Mongoose as an ORM for our Mongo Database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mtgCardDB");

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

require('../routes')(app);

module.exports = app;