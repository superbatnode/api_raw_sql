const { getUser, getAllAddress } = require("../../model");
const CustomError = require("../../services/error/CustomError");

const getAllUserData = async (req, res, next) => {
  try {
    res.json({
       profile: await getUser({ username: req.auth.username }),
       Addresses: await getAllAddress(req.auth.username)
    });
  } catch (e) {
    return next(CustomError.internalServerError());
  }
};
module.exports = getAllUserData;
