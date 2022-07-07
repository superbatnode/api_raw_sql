const dotenv = require('dotenv');
const path = require("path")
dotenv.config({path: path.join(__dirname, '..', '.env')});

module.exports={
    googleToken:process.env.TOKEN,
    HOST: process.env.HOST, 
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    USER: process.env.DBUSER,
    PORT:process.env.PORT,
    salt:Number(process.env.salt),
    SECRET:process.env.SECRET,
    REFSECRET:process.env.REFSECRET
}