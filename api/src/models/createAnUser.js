const connection = require("../config/db");

const creatAnUser = async (user) => {
  const { first_name, last_name, email } = user;
  if (first_name && last_name && email) {
    try {
      let [result] = await connection.query(
        `INSERT INTO UsersInfo (first_name, last_name, email) VALUES ('${first_name}', '${last_name}', '${email}')`
      );
      let count = await connection.query(
        `SELECT COUNT(ID) as Count FROM UsersInfo `
      );
      let lastest_page = Math.ceil(count[0][0].Count / 6);
      if (result.insertId) {
        // console.log("lastest_page", lastest_page);
        return { id: result.insertId, lastest_page: lastest_page };
      }
    } catch (error) {
      console.log(error);
      return { id: -1 };
    }
  } else return { id: -2 };
};

module.exports = creatAnUser;
