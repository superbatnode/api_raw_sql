const { REFSECRET, salt } = require("../config");
const { generateJWT } = require("../services/userservices");
const bcrypt = require("bcrypt");
const connection = require("./db.config");

(async () =>
  (await connection()).query(
    `CREATE TABLE IF NOT EXISTS PasswordResetTokens(
    email VARCHAR(255),
    token VARCHAR(255),
    OTP VARCHAR(225),
  )`,
    function (e) {
      throw new Error(e);
    }
  ))();

const ResetPassword = async (email, otp) => {
  const jwtToken = await generateJWT(
    { email, reason: "Password reset" },
    REFSECRET,
    60 * 10
  );
 //start working from here 
//  await (await connection()).query(``,function(e){if(e) throw new Error(e)});
  await PasswordResetToken.destroy({ where: { email } });
  try {
    const save = await PasswordResetToken.create({
      email: email,
      token: jwtToken,
      OTP: await bcrypt.hash(otp.toString(), salt),
    });
    return save;
  } catch (e) {
    console.log(e);
    throw new Error("couldn't generate the otp");
  }
};
const deleteResetToken = async (email) => {
  try {
    await PasswordResetToken.destroy({ where: { email } });
  } catch (e) {
    console.log(e);
    throw new Error("Unable to delete");
  }
};
const getResetToken = async (email) => {
  try {
    return await PasswordResetToken.findOne({ where: { email } });
  } catch (e) {
    console.log(e);
    throw new Error("Unable to fetch Reset Token");
  }
};
module.exports = { ResetPassword, deleteResetToken, getResetToken };
