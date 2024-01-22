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
  return JSON.parse(decPass);
};

module.exports = { encryptData, decryptData, decryptePass };

// const crypto = require("crypto");

// const algo = "aes-256-cbc";
// const inVec = crypto.randomBytes(16);
// const sec_key = crypto.randomBytes(32);

// const cipherText = crypto.createCipheriv(algo, sec_key, inVec);

// const encryptData = (password, aadharNo, panNo) => {
//   let encPass = cipherText.update(password, "utf-8", "hex");
//   let encAadhar = cipherText.update(aadharNo, "utf-8", "hex");
//   let encPan = cipherText.update(panNo, "utf-8", "hex");

//   encPass += cipherText.final("hex");
//   encAadhar += cipherText.final("hex");
//   encPan += cipherText.final("hex");

//   return encPass, encAadhar, encPan;
// };

// const decryptData = (password, aadharNo, panNo) => {
//   const decipherText = crypto.createDecipheriv(algo, sec_key, inVec);
//   let decPass = decipherText.update(password, "hex", "utf-8");
//   let decAadhar = decipherText.update(aadharNo, "hex", "utf-8");
//   let decPan = decipherText.update(panNo, "hex", "utf-8");

//   decPass += decipherText.final("utf-8");
//   decAadhar += decipherText.final("utf-8");
//   decPan += decipherText.final("utf-8");

//   return decPass, decAadhar, decPan;
// };

// module.exports = { encryptData, decryptData };

// // let decryptedData = decipherText.update(encryptedData, "hex", "utf-8");

// // decryptedData += decipherText.final("utf-8");
// // console.log("the decrypted message:", decryptedData);

// // encryption
// // let encryptedData = cipherText.update(message, "utf-8", "hex");

// // encryptedData += cipherText.final("hex");

// // console.log("encrypted data:", encryptedData);
