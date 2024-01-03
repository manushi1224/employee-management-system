const express = require("express");
const {
  applyForLeave,
  approveLeave,
  leaveEmployee,
  pastLeaves,
} = require("../controllers/leaveContoller");
const leaveRoutes = express.Router();

leaveRoutes.get("/applied-leave", leaveEmployee);

leaveRoutes.patch("/applyForleave/:uid", applyForLeave);
leaveRoutes.patch("/approve-leave/:leaveId", approveLeave);

module.exports = leaveRoutes;
