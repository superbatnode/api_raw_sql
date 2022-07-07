class CustomError{
    constructor(status, msg){
        this.status = status; 
        this.message = msg;
    }
    static unauthorized(msg="Unauthorized user"){
        return new CustomError(401, msg); 
    }
    static internalServerError(msg="internal server error"){
        return new CustomError(500,msg);
    }
    static badRequestError(msg="Invalid input"){
        return new CustomError(400, msg);
    }
}
module.exports = CustomError;