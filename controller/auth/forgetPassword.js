const otpGenerator = require("../../helpers/otpGenerator");
const { getUser, resetPassword } = require("../../model");
const email = require("../../services/email/email");
const CustomError = require("../../services/error/CustomError");
const optEmail = require("../../templates/optEmail");
const forgetPassword = async (req, res, next) => {
  const checkUser = await getUser({email:req.body.email});
  if(!checkUser)
  return next("Not a valid user"); 
  const otp = otpGenerator(); 
  const reset = await resetPassword(checkUser.email, otp); 
  let status;
  try {
    status = await email({
      email: checkUser.email,
      subject: "Reset Your Password",
      template: optEmail(checkUser.firstName, otp),
    });
    console.log(status);
    res.json({ verificationEmailSent: status.status });
  } catch (e) {
    console.log(e);
    return next(CustomError.internalServerError("Unable to send Email"));
  }
};

module.exports = forgetPassword;
