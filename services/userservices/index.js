const jwt = require("jsonwebtoken");
const { SECRET, REFSECRET } = require("../../config");
const bcrypt = require("bcrypt");
const CustomError = require("../error/CustomError");
const {getUser, getUserWithPassword } = require("../../model");
const User = require("../../model").users;
module.exports = {
  generateJWT,
  generateRefreshToken,
  validateToken,
   
};


async function generateJWT(data, sec = SECRET, expiry = 60 * 60) {
  try {
    return jwt.sign(data, sec, { expiresIn: expiry });
  } catch (e) {
    console.log(data);
    throw new Error("can't generate the token");
  }
}
async function generateRefreshToken({ username, email, type, ip }) {
  const token = await generateJWT(
    { username, email, type, ip },
    REFSECRET,
    60 * 60 * 60
  );
  return token;
}

async function validateToken(token, key, req) {
  try {
    const data = await jwt.verify(token, key);
    req.auth = data; 
    return req ; 
  } catch (e) {
    console.log(e); 
    throw new Error("Token Expired Login again");
  }
}
