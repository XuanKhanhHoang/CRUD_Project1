const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const { compareHashedData } = require("../util/hashData");
const authenticalAccount = async (email, password) => {
  let res = { token: "", status_action: -1 };
  try {
    let [user] = await connection.query(
      `SELECT * FROM Account WHERE email = ?`,
      [email]
    );
    if (user[0] === {}) return (res = { ...res, status_action: 0 });
    let hashedPassword = user[0].pass_word;
    let results = await compareHashedData(password, hashedPassword);
    if (results) {
      let token = await jwt.sign(
        {
          data: user[0].email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn:
            // 5,
            "1h",
        }
      );
      return (res = { ...res, token: token, status_action: 1 });
    } else return (res = { ...res, status_action: 0 });
  } catch (error) {
    console.log(error);
    return (res = { ...res, status_action: -1 });
  }
};

module.exports = authenticalAccount;
