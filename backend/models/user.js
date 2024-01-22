const mongoose = require("mongoose");
const mongoValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  joiningDate: { type: Date, required:  true },
  position: { type: String, required: true },
  name: { type: String, required: true },
  aadhar: { type: String, required: true },
  panNo: { type: String, required: true },
  isSuperUser: { type: Boolean, required: true },
  leaveDate: [
    {
      startDate: { type: String, default: "" },
      leaveDate: { type: String, default: "" },
      leave_status: { type: String, default: "pending" },
      leaveDays: { type: Number, default: 0 },
    },
  ],
  image: { type: String },
  address: { type: String, required: true },
  linkedInId: { type: String, required: true },
  phone: { type: String, required: true },
  githubId: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

userSchema.plugin(mongoValidator);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
