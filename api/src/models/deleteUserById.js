const connection = require("../config/db");
const deleteUserByPage = async (id) => {
  // console.log(id);
  try {
    let [result] = await connection.query(
      `DELETE FROM UsersInfo WHERE id=${id}`
    );
    let affectedRows = result.affectedRows;
    if (affectedRows > 0) {
      // console.log("Delete succes");
      return affectedRows;
    } else {
      // console.log("No user deleted");
      return 0;
    }
  } catch (error) {
    console.log(error);
    return -1;
  }
};
module.exports = deleteUserByPage;
