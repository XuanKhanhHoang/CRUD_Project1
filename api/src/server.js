const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

const apiRouters = require("./routers/api");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // Cho phép tất cả các nguồn gốc truy cập
  })
);
app.use("/api", apiRouters);
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
