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
const userRoutes = express.Router();

userRoutes.get("/", displayUser);
userRoutes.get("/:uid", getUserById);


userRoutes.patch("/editEmployee/:uid", fileUpload.single("image"), editEmployee);

module.exports = userRoutes;
