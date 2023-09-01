const connection = require("../config/db");
const checkLevelAccessAccount = async (email) => {
  try {
    let res = await connection.query(
      "SELECT level_access FROM Account WHERE email = ?",
      [email]
    );
    return res[0][0].level_access;
  } catch (error) {
    console.log(error);
    return -1;
  }
};
module.exports = checkLevelAccessAccount;
