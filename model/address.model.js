const connection = require("./db.config");
(async () => {
  (await connection()).query(
    `CREATE TABLE IF NOT EXISTS Addresses(
        id INT AUTO_INCREMENT
        fullAddress VARCHAR(225),
        city VARCHAR(225) NOT NULL,
        pincode VARCHAR(225) NOT NULL,
        state VARCHAR(225) NOT NULL,
        mobile VARCHAR(225) NOT NULL,
        username VARCHAR(225) NOT NULL,
        PRIMARY KEY(username)
      );`,
    function (err) {
      if (err) throw new Error(err);
    }
  );
})();

const deleteAddress = async (id, username) => {
  try {
    const result = (await connection()).query(
      `
      DELETE FROM Addresses WHERE id=${id},username=${username}
    `,
      function (err) {
        if (err) throw new Error(err.message);
      }
    );
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Unable to delete address ");
  }
};

const saveAddress = async (data) => {
  try {
    const save = (await connection()).query(
      `
      INSERT INTO Addresses
      VALUES(NULL, ${data.fullAddress},${data.city},${data.pincode},${data.state},${data.mobile},${data.username})
      `,
      function (e) {
        if (e) throw new Error(e.message);
      }
    );
    return save;
  } catch (err) {
    console.log(err);
    throw new Error("Unable to save.");
  }
};

const getAllAddress = async (username) => {
  try {
    return (await connection()).query(
      `SELECT fullAddress, city, pincode, state, mobile FROM Addresses WHERE username=${username}`,
      function (e) {
        if (e) {
          throw new Error(e.message);
        }
      }
    );
  } catch (e) {
    console.log(e);
    throw new Error("Unable to get all address");
  }
};

module.exports = {
  saveAddress,
  deleteAddress,
  getAllAddress,
};
