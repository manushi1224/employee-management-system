const express = require("express");
const {
  displayUser,
  editEmployee,
  getUserById,
  applyForLeave,
  leaveEmployee,
  approveLeave,
} = require("../controllers/userController");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");
const userRoutes = express.Router();


userRoutes.get("/", displayUser);
userRoutes.get("/:uid", getUserById);

userRoutes.use(checkAuth);

userRoutes.patch(
  "/editEmployee/:uid",
  fileUpload.single("image"),
  editEmployee
);

module.exports = userRoutes;
