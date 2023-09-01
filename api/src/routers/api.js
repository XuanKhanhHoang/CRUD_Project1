const express = require("express");
const router = express.Router();
const { login, authToken } = require("../controllers/mainControllers");
const verifyToken = require("../middleware/verifyWebToken");
const auththenticaledRoutes = require("./auththenticaled");

router.post("/auth", verifyToken, authToken);
router.post("/login", login);
router.use(verifyToken, auththenticaledRoutes());
module.exports = router;
