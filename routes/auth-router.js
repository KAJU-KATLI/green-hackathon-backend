const express = require("express");
const passport = require("passport");

const authCtrl = require("../controller/auth-ctrl");

const router = express.Router();

router.post("/register", authCtrl.register);
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  authCtrl.login
);
router.get("/user", authCtrl.authenticateToken, authCtrl.user);
router.get("/logout", authCtrl.authenticateToken, authCtrl.logout);


module.exports = router;
