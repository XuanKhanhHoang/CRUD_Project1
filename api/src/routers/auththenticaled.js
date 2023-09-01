const express = require("express");
const router = express.Router();
const {
  getUserList,
  deleteUser,
  updateUser,
  creatUser,
} = require("../controllers/mainControllers");

const auththenticaledRoutes = () => {
  router.get("/users", getUserList);

  router.post("/users/creat", creatUser);

  router.put("/users/update", updateUser);

  router.delete("/users/delete", deleteUser);

  return router;
};
module.exports = auththenticaledRoutes;
