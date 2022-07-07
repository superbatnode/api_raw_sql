const connection = require("./db.config");
const fs = require("fs");
const Photo = sequelize.define("Photo", {
  user: Sequelize.STRING,
  photoPath: Sequelize.STRING,
});
(async () => {
  (await connection()).query(
    `CREATE TABLE IF NOT EXISTS Photos(
      user VARCHAR(225) NOT NULL,
      photoPath:VARCHAR(225) NOT NULL,
      PRIMARY KEY(user)
    );`,
    function (err) {
      if (err) throw new Error(err);
    }
  );
})();

const savePhoto = async (user, fileName) => {
  try {
    const oldPhotoPath = await connection.query(
      `SELECT * from Photos where user=${user}; `
    );
    if (oldPhotoPath) {
      (await connection()).query(
        `UPDATE Photos
      SET photopath = ${fileName}
      WHERE user = ${user};
      `,
        function (err) {
          if (err) throw new Error(err);
        }
      );
      fs.unlink(oldPhotoPath.photoPath, console.error);
      return "Photo Saved";
    }
    const save = await connection.query(
      `INSERT INTO Photos
    VALUES (${user},${fileName});`
    );
    return "Photo Saved";
  } catch (e) {
    throw new Error("unable to save photo");
  }
};

module.exports = savePhoto;
