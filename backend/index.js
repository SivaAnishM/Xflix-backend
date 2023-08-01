const express = require('express');
const app = require("./app")
const mongoose = require('mongoose')

const port = 8082;

let DB_URL = "mongodb://localhost:27017/xflix"

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to DB", DB_URL);
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen(port, function (err) {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Server is running on port ' + port);
    }
  })