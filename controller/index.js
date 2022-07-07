const UserController = {
  register:require("./userHandler/registerNewUser"),
  login:require("./auth/userLogin"),
  get:require("../controller/userHandler/getUserData"), 
  address: require("../controller/userHandler/registerNewAddress"),
  getAll: require("../controller/userHandler/getAllUserData"), 
  deleteAddress: require("../controller/userHandler/deleteUser"), 
  forgetPassword: require("./auth/forgetPassword"),
  resetPassword:require("./auth/resetPassword"), 
  photoUpload: require("./userHandler/photoUpload")
};

module.exports = UserController;
