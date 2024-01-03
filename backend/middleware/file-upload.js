const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

var storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "./uploads/images");
  },
  filename: function (req, file, callBack) {
    callBack(
      null,
      file.fieldname + "-" + uuidv4() + path.extname(file.originalname)
    );
  },
});

const fileUpload = multer({
  limits: 500000,
  storage: storage,
  fileFilter: function (req, file, callBack) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callBack(new Error("Only images are allowed!"));
    }
    callBack(null, true);
  },
});

module.exports = fileUpload;
