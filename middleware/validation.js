const Joi = require("joi");
const CustomError = require("../services/error/CustomError");
const register = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: Joi.ref("password"),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    }),
  });
  const { error, value } = await schema.validate(req.body);
  if (error) {
    return next(CustomError.badRequestError(error.message));
  }
  req.body = value;
  next();
};
const address = async (req, res, next) => {
  const schema = Joi.object({
    fullAddress: Joi.string().min(3).max(100),
    city: Joi.string().min(3).max(30).required(),
    state: Joi.string().min(3).max(30).required(),
    mobile: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    pincode: Joi.string()
      .length(6)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const { error, value } = await schema.validate(req.body);
  if (error) return next(CustomError.badRequestError(error.message));
  req.body = value;
  next();
};

const login = async (req, res, next) => {
  const Joi = require("joi");
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  const { error, value } = await schema.validate(req.body);
  if (error) return next(CustomError.badRequestError(error.message));
  req.body = value;
  next();
};

const emailCheck = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    }),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return next(CustomError.badRequestError(error.message));
  req.body = value;
  next();
};

const resetPassword = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    }),
    otp: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: Joi.ref("password"),
  });
  const {error, value} = schema.validate(req.body); 
  if(error)
  return next(error); 
  req.body = value; 
  next(); 
};

module.exports = {
  register,
  address,
  login,
  emailCheck,
  resetPassword
};
