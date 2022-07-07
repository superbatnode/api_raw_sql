const CustomError = require("./CustomError");

const errorHandler = async(err, req, res, next)=>{
    let status = 500;
    let error = {
        message:"internal server error", 
        original: err.message
    }
    if(err instanceof CustomError){
        status = err.status; 
        error.message = err.message;
    }
    console.log(err)
    res.status(status).json(error);
}
module.exports = errorHandler;