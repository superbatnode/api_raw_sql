// const Sequelize = require("sequelize");
const { DB, USER, PASSWORD, HOST } = require("../config");
// const sequelize = new Sequelize(DB, USER, PASSWORD, {
//   host: HOST,
//   dialect: "mysql",
//   operatorsAliases: false,
//   logging: false,
// });
// module.exports = {sequelize, Sequelize}

const mysql = require("mysql2"); 
const connection = async()=> await mysql.createConnection({
  host:HOST,
  user:USER,
  password:PASSWORD,
  database:"testDB"
});


module.exports = connection; 