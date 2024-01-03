const express = require("express");
const { check } = require("express-validator");
const { newUser, loginUser } = require("../controllers/userController");
const superUserRoutes = express.Router();

superUserRoutes.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("name").notEmpty(),
    check("password").isLength({ min: 8 }),
    check("position").notEmpty(),
    check("aadhar").notEmpty(),
    check("panNo").notEmpty(),
  ],
  newUser
);

superUserRoutes.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  loginUser
);

module.exports = superUserRoutes;
