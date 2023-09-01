const jwt = require("jsonwebtoken");
const checkLevelAccessAccount = require("../models/checkLevelAccessAccount");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authtoken"];
  const token = authHeader;
  let isNext = false;
  // console.log("token : ", token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    isNext = true;
  });
  if (isNext) {
    let level_access = await checkLevelAccessAccount(req.user.data);
    if (level_access === -1) return res.sendStatus(500);
    req.user_level_access = level_access;

    next();
  }
};
module.exports = verifyToken;
