const getUser = require("./user.model").getUser;
const saveUser = require("./user.model").saveUser;
const updatePassword = require("./user.model").updatePassword;
const saveAddress = require("./address.model").saveAddress;
const deleteAddress = require("./address.model").deleteAddress;
const savePhoto = require("./profilepicture.model");
const getAllAddress = require("./address.model").getAllAddress;
const resetPassword = require("./passwordResetToken.model").ResetPassword;
const deleteResetToken = require("./passwordResetToken.model").deleteResetToken;
const getResetToken = require("./passwordResetToken.model").getResetToken;
const getUserWithPassword = require("./user.model").getUserWithPassword;
module.exports = {
  savePhoto,
  getUser,
  saveUser,
  updatePassword,
  saveAddress,
  deleteAddress,
  getAllAddress,
  resetPassword,
  deleteResetToken,
  getResetToken,
  getUserWithPassword,
};
