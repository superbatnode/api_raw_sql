const { getUserWithPassword } = require("../../model");
const CustomError = require("../../services/error/CustomError");
const { generateJWT } = require("../../services/userservices");
const bcrypt = require("bcrypt");
const userLogin = async (req, res, next) => {
  try {
    const user = await getUserWithPassword({ username: req.body.username });
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return next(CustomError.badRequestError("Username or password Invalid"));
    }
    const { username, email } = user;
    const access_token = await generateJWT({
      username,
      email,
      reason: "login",
    });
    res.json({ access_token });
  } catch (e) {
    return next(CustomError.badRequestError(e.message));
  }
};

module.exports = userLogin;
