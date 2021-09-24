const express = require("express");
const connectDB = require("./db/db");
require('dotenv').config("./.env")
connectDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
