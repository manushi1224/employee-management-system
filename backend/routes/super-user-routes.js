const express = require("express");
const { check } = require("express-validator");
const { newUser, loginUser } = require("../controllers/userController");
const checkAuth = require("../middleware/check-auth");
const superUserRoutes = express.Router();

superUserRoutes.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  loginUser
);

superUserRoutes.use(checkAuth);

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

module.exports = superUserRoutes;
