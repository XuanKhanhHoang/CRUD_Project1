const connection = require("../config/db");

const updateAnUser = async (user) => {
  const { id, first_name, last_name, email } = user;
  if (first_name && last_name && email && id) {
    try {
      let [result] = await connection.query(
        `UPDATE UsersInfo SET first_name = '${first_name}' , last_name = '${last_name}' , email = '${email}' WHERE id = ${id}`
      );
      if (result.affectedRows > 0) {
        console.log("Update succes");
        let d = new Date();
        return d.toString();
      } else {
        console.log("No user update or update failed");
        return "not-found";
      }
    } catch (error) {
      console.log(error);
      return "";
    }
  } else return "invalid_data";
};

module.exports = updateAnUser;
