const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function generateAccessToken(user) {
  return jwt.sign(user, "Thisissecret", { expiresIn: "60000s" });
}

module.exports.authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "Thisissecret", async (err, user) => {
      if (err) return res.sendStatus(403);

      const userDb = await User.findOne({
        email: user.email,
        username: user.username,
      }).exec();
      req.user = userDb;

      next();
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.authenticateTokenAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "Thisissecret", async (err, user) => {
      if (err) return res.sendStatus(403);

      const userDb = await User.findOne({
        email: user.email,
        username: user.username,
      }).exec();
      if (userDb.isAdmin) {
        req.user = userDb;
      } else {
        return res.sendStatus(401);
      }
      next();
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.authenticateTokenRecruiter = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "Thisissecret", async (err, user) => {
      if (err) return res.sendStatus(403);

      const userDb = await User.findOne({
        email: user.email,
        username: user.username,
      }).exec();
      if (userDb.isRecruiter) {
        req.user = userDb;
      } else {
        return res.sendStatus(401);
      }
      next();
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      address,
      age,
      phoneNumber,
      accountDetails,
      who,
      image,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      firstName,
      lastName,
      address,
      age,
      phoneNumber,
      accountDetails,
      who,
      image,
      secPass,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      const token = generateAccessToken({ email, username });
      res.json(token);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    const token = generateAccessToken({
      email: req.body.email,
      username: req.body.username,
    });
    res.json(token);
    res.send("Succesfully logged in");
  } catch (err) {
    res.send(err);
  }
};

module.exports.logout = (req, res) => {
  try {
    req.logout();
    res.send("Logged out Successfully");
  } catch (err) {
    res.send(err);
  }
};

module.exports.user = (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send(err);
  }
};
