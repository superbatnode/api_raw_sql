const { getUser } = require("../../model");

const getUserData = async (req, res, next) => {
  try {
    res.json(await getUser({ username: req.auth.username }));
  } catch (e) {
    console.log(e);
    return next("User not found");
  }
};
module.exports = getUserData;
