console.clear();
const db = require("./model/db.config");
const express = require("express");
const app = express();
const colors = require("colors");
const { PORT } = require("./config");
const errorHandler = require("./services/error/errorHandler");
const connection = require("./model/db.config");
const date = new Date().toLocaleString("en-GB", { timeZone: "UTC" });
(async () => {
  try {
    const con = await connection();
    console.log("connected to the db".bgRed);
    con.query(
      `  CREATE TABLE IF NOT EXISTS User (
        username VARCHAR(225) UNIQUE NOT NULL ,
        email VARCHAR(225) NOT NULL,
        firstName VARCHAR(225) NOT NULL,
        lastName varchar(255) NOT NULL ,
        password varchar(255) NOT NULL,
        verified BOOLEAN NOT NULL ,
        PRIMARY KEY (username));
    );`,
      function (err, results, field) {
        if (err) console.error(" ".bgCyan, err);
        console.log("results: ".bgBlue, results);
        console.log("fields".bgGreen, field);
      }
    );

    con.query(
      `INSERT INTO EMPLOYEES
      VALUES(NULL,"SUMIT", "SAGAR",  "NOIDA SECTOR 63", "NOIDA")
      `,
      (err) => {
        if (err) console.log(err);
        console.log("saved");
      }
    );
  } catch (e) {
    console.error(" ".bgWhite, e);
  }
})();

app.use(express.json());
app
  .get("/", (req, res) => res.json({ con: "done" }))
  .listen(PORT, () => console.log(`servers up ${PORT}`.bgGreen));
app.use("*", (req, res, next) => next(new Error("Page not found")));
app.use(errorHandler);
