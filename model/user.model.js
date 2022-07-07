const connection = require("./db.config");
const bcrypt = require("bcrypt");
const { salt } = require("../config");

(async () =>
  await connection().query(
    `CREATE TABLE IF NOT EXISTS Users(
    username VARCHAR(225) UNIQUE NOT NULL ,
    email VARCHAR(225) NOT NULL,
    firstName VARCHAR(225) NOT NULL,
    lastName varchar(255) NOT NULL ,
    password varchar(255) NOT NULL,
    verified BOOLEAN DEFULT 0 ,
    PRIMARY KEY (username)); `,
    function (err) {
      if (err) throw new Error(err);
    }
  ))();

const getUser = async (option) => {
  try {
    return await connection().query(
      `select username, email,firstName,lastName from Users where username="${option.username}"`
    );
  } catch (e) {
    console.log(e);
    throw new Error("User not found");
  }
};

const getUserWithPassword = async (option) => {
  try {
    return await connection().query(
      `select * from Users where username="${option.username}"`
    );
  } catch (e) {
    console.log(e);
    throw new Error("User not found");
  }
};

const saveUser = async (data) => {
  const emailExists = await getUser({ email: data.email });
  const usernameExists = await getUser({ username: data.username });
  if (emailExists) {
    throw new Error("Email Already Exists");
  }
  if (usernameExists) {
    throw new Error("username is already taken");
  }
  data.password = await bcrypt.hash(data.password, salt);
  try {
    const save = await connection().query(
      `INSERT INTO Users
      VALUES(${data.username},${data.email}, ${data.firstName} ,  ${data.lastName}, ${data.password})
      `,
      function (err) {
        if (err) throw new Error(err);
      }
    );
    return save;
  } catch (err) {
    console.log(err);
    throw new Error("Unable to Save");
  }
};

const updatePassword = async (newPassword, email) => {
  try {
    return await connection().query(
      `UPDATE Users
SET password = ${await bcrypt.hash(newPassword, salt)}
WHERE email = ${email};
`,
      function (err) {
        if (err) throw new Error(err);
      }
    );
  } catch (e) {
    console.log(e);
    throw new Error("can't update password");
  }
};

module.exports = {
  saveUser,
  getUser,
  updatePassword,
  getUserWithPassword,
};
