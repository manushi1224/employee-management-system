const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const superUserRoutes = require("./routes/super-user-routes");
const connectDb = require("./database/db");
const userRoutes = require("./routes/user-routes");
const leaveRoutes = require("./routes/leaveRoutes");
dotenv.config()

const port = process.env.PORT || 5000;

const app = express();
const corsOptions = {
  origin: ["https://employee-management-system-indol-xi.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: false }));

app.use("/uploads", express.static("uploads"));

connectDb();

app.use("/api/superuser", superUserRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaves", leaveRoutes);

app.use((req, res, next) => {
  return next(new Error("Could Not Find the Route"));
});

app.listen(port, () => {
  console.log("Server started on 5000");
});

module.exports = app;
