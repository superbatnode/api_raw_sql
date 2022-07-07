const { SECRET } = require("../config");
const CustomError = require("../services/error/CustomError");
const { validateToken } = require("../services/userservices");

async function auth(req, res, next) {
  if (!req.headers["authorization"])
    return next(CustomError.unauthorized("Invalid Token"));
  const token = req.headers["authorization"].split(" ")[1];
  try{
    await validateToken(token, SECRET, req)
    next();
  }catch(e){
    return next(e)
  }
}
module.exports = auth;
