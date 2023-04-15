const mongoose = require("mongoose");

const con = mongoose
  .connect("mongodb://localhost:27017/react-attendance")
  .then((res) => console.log("mongo client connected .."))
  .catch((err) => {
    throw new Error(err);
  });

module.exports = con