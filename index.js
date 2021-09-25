const express = require("express");
const connectDB = require("./db/db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

connectDB();

const authRouter = require("./routes/auth-router");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
