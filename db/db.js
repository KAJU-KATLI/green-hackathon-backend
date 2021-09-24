const mongoose = require("mongoose");

const URL = "";

const connectDB = () => {
  mongoose.connect(URL, () => {
    console.log("Database Connected Sccessfully");
  });
};

module.exports = connectDB;
