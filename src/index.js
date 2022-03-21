const express = require("express");

const connect = require("./config/db");

const userController = require("./controller/user.controller");


const app = express();

app.use(express.json());

app.use("/users", userController);






app.listen(5236, async () => {
  try {
    await connect();
  } catch (err) {
    console.error(err.message);
  }
  console.log("listening on port 5236");
});
