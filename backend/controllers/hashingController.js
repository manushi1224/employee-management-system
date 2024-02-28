const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");

const encryptData = (password, aadharNo, panNo, secretKey) => {
  const encPass = AES.encrypt(JSON.stringify(password), secretKey).toString();
  const encAadhar = AES.encrypt(JSON.stringify(aadharNo), secretKey).toString();
  const encPan = AES.encrypt(JSON.stringify(panNo), secretKey).toString();
  return { encPass, encAadhar, encPan };
};

const decryptData = (password, aadharNo, panNo, secretKey) => {
  const decPass = AES.decrypt(password, secretKey).toString(CryptoJS.enc.Utf8);
  const decAadhar = AES.decrypt(aadharNo, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  const decPan = AES.decrypt(panNo, secretKey).toString(CryptoJS.enc.Utf8);
  return {
    decPass: JSON.parse(decPass),
    decAadhar: JSON.parse(decAadhar),
    decPan: JSON.parse(decPan),
  };
};

const decryptePass = (password, secretKey) => {
  const decPass = AES.decrypt(password, secretKey).toString(CryptoJS.enc.Utf8);
  return {decPass : JSON.parse(decPass)};
};

module.exports = { encryptData, decryptData, decryptePass };