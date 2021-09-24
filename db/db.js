const mongoose = require("mongoose");

const URL = "mongodb+srv://greenhackathon:greenhackathon@cluster0.utrzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = () => {
  mongoose.connect(URL, () => {
    console.log("Database Connected Sccessfully");
  });
};

module.exports = connectDB;
