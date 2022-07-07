const { verify } = require("jsonwebtoken");
const { REFSECRET } = require("../../config");
const { getResetToken, updatePassword, getUser } = require("../../model");
const CustomError = require("../../services/error/CustomError");
const bcrypt = require("bcrypt"); 
const reset  = async (req, res, next)=>{
    const {email, otp, password} = req.body;
    try{
        const getResetInfo = await getResetToken(email); 
        await verify(getResetInfo.token, REFSECRET);
        console.log("______ ", getResetInfo);
        await bcrypt.compare(otp, getResetInfo.OTP); 
        const result = await updatePassword(password,email)
        res.json(await getUser({email}));
    }catch(e){
        console.log(e);
        return next(CustomError.internalServerError(e.message));
    }
}
    
module.exports = reset;     