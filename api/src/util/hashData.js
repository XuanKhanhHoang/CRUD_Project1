const bcrypt = require("bcrypt");

const hashData = (data) => {
  const saltRounds = 10;

  bcrypt.hash(data, saltRounds, (err, hashedPwd) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("đã được mã hóa:", hashedPwd);
    hashData = hashedPwd;
  });
  return hashData;
};

const compareHashedData = async (originData, hashData) => {
  try {
    const result = await bcrypt.compare(originData, hashData);
    if (result) {
      // console.log(" khớp!");
      return true;
    } else {
      // console.log("không khớp!");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { hashData, compareHashedData };
