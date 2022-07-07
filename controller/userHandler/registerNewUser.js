const { saveUser, getUser } = require("../../model");
const CustomError = require("../../services/error/CustomError");
const registerNewUser = async (req, res, next) => {
  try {
    const user = await saveUser(req.body);
    res.json(await getUser({ username: user.username }));
  } catch (e) {
    return next(CustomError.badRequestError(e.message));
  }
};


module.exports = registerNewUser;
