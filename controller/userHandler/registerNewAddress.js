const { saveAddress, getAllAddress } = require("../../model");
const registerNewAddress = async (req, res, next) => {
  console.log(req.auth)
  try {
    await saveAddress({ ...req.body, username: req.auth.username });
    res.json(await getAllAddress(req.auth.username));
  } catch (e) {
    return next(e);
  }
};
module.exports = registerNewAddress;
