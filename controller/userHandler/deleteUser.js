const { deleteAddress } = require("../../model");
const CustomError = require("../../services/error/CustomError");

const deleteUserAddress = async(req, res, next)=>{
    if(!req.params.id)
    return next("Id not found"); 
    try{
        const deleteAdd = await deleteAddress(req.params.id, req.auth.username);
        res.json(deleteAdd);
    }catch(e){
        console.log(e)
        return next(CustomError.internalServerError())
    }
}

module.exports = deleteUserAddress;