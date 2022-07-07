const express = require("express");
const UserController = require("../controller");
const auth = require("../middleware/auth");
const validator = require("../middleware/validation");
const router = express.Router();
router.post("/register",validator.register, UserController.register);
router.post("/login", validator.login,UserController.login);
router.get("/get", auth, UserController.get);
router.get("/getall", auth, UserController.getAll);
router.post("/address", auth, validator.address, UserController.address);
router.delete("/deleteAddress/:id", auth, UserController.deleteAddress);
router.post("/forgetPassword",validator.emailCheck, UserController.forgetPassword);
router.post("/forgetPassword/reset",validator.resetPassword, UserController.resetPassword);
router.post( "/uploadPhoto",auth, UserController.photoUpload.upload.single("avatar"),UserController.photoUpload.photoUpload);

module.exports = router;
