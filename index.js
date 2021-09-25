const express = require("express");
const connectDB = require("./db/db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Session = require("express-session");

connectDB();

const authRouter = require("./routes/auth-router");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  Session({ secret: "Thisissecret", resave: true, saveUninitialized: true })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
