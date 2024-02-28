const { validationResult } = require("express-validator");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  encryptData,
  decryptData,
  decryptePass,
} = require("./hashingController");

const secretKey =
  "6e97deb2f832bbaa0ceadcbd8f94abb053da76fe4f695392bf0012c646921ca3";

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    user = await userModel.findById(uid);
    const { decPass, decAadhar, decPan } = decryptData(
      user.password,
      user.aadhar,
      user.panNo,
      secretKey
    );
    user.password = decPass;
    user.aadhar = decAadhar;
    user.panNo = decPan;
  } catch (error) {}
  return res
    .status(200)
    .send({ message: "User Found!", success: true, user: user });
};

const newUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new Error("Invalid Data"));
  }
  const {
    email,
    password,
    joiningDate,
    position,
    name,
    aadhar,
    panNo,
    isSuperUser,
    address,
    dateOfBirth,
    githubId,
    linkedIn,
    phone,
  } = req.body;

  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (error) {
    res.status(500).send({ message: `${error.message}`, success: false });
  }
  if (existingUser) {
    return res
      .status(500)
      .json({ message: "User already exists with this email", success: false });
  }

  const { encPass, encAadhar, encPan } = encryptData(
    password,
    aadhar,
    panNo,
    secretKey
  );

  try {
    const newUser = new userModel({
      email,
      password: encPass,
      joiningDate,
      position,
      name,
      aadhar: encAadhar,
      panNo: encPan,
      isSuperUser,
      address,
      dateOfBirth,
      githubId,
      linkedInId: linkedIn,
      phone,
    });

    newUser.image = "uploads\\images\\user-default.jpg";

    await newUser.save();
    res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

const loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new Error("Invalid Data"));
  }

  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (error) {
    return res
      .status(404)
      .send({ message: `${error.message}`, success: false });
  }

  if (!existingUser) {
    return res
      .status(404)
      .send({ message: "User not found with this email.", success: false });
  }

  const { decPass } = decryptePass(existingUser.password, secretKey);
  if (decPass !== password) {
    return res
      .status(404)
      .send({ message: "Invalid Password", success: false });
  }

  let token;
  try {
    token = jwt.sign(
      {
        email: existingUser.email,
        userId: existingUser._id,
      },
      "secret_secret",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return res
      .status(404)
      .send({ message: "Could not set token", success: false });
  }

  return res.status(200).send({
    message: "Login Successfull",
    success: true,
    user: existingUser,
    token: token,
  });
};

const displayUser = async (req, res, next) => {
  let users;
  try {
    users = await userModel.find({});
  } catch {
    return res
      .status(404)
      .send({ message: "Did not find any user", success: false });
  }
  return res.status(200).send({ user: users, success: true });
};

const editEmployee = async (req, res, next) => {
  const { email, name, position, phone, address, aadhar, panNo } = req.body;

  const uid = req.params.uid;
  let user;

  try {
    user = await userModel.findById(uid);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Could not find the user", success: false });
  }

  user.name = name;
  user.email = email;
  user.position = position;
  user.phone = phone;
  user.address = address;
  user.aadhar = aadhar;
  user.panNo = panNo;
  user.image = req?.file?.path || "uploads\\images\\user-default.jpg";

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Could not update the user details", success: false });
  }

  return res
    .status(200)
    .send({ message: "User detail updated successfully!", success: true });
};

module.exports = {
  newUser,
  loginUser,
  displayUser,
  editEmployee,
  getUserById,
};
