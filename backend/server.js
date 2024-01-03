const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: false }));

const superUserRoutes = require("./routes/super-user-routes");
const connectDb = require("./database/db");
const userRoutes = require("./routes/user-routes");
const leaveRoutes = require("./routes/leaveRoutes");
app.use("/uploads", express.static("uploads"));

connectDb();

app.use("/api/superuser", superUserRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaves", leaveRoutes);

app.use((req, res, next) => {
  return next(new Error("Could Not Find the Route"));
});

app.listen(5000, () => {
  console.log("Server started on 5000");
});
