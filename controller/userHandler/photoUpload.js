const multer = require("multer");
const path = require("path");
const { savePhoto } = require("../../model");
const CustomError = require("../../services/error/CustomError");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../../uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + "-" + file.originalname)
    }
  });
const upload = multer({storage})
module.exports = {
    upload,
    photoUpload : async (req,res,next)=>{
        if(!req.file)
        return next(CustomError.badRequestError("File not Found"));
        try{
            await savePhoto(req.auth.username, req.file.path);
            res.json({FileUpladed:true});
        }catch(e){
            console.log(e); 
            return next("Unable to save image");
        }
    }
};