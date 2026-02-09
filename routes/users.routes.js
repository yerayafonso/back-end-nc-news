const express = require("express");
const {
  getAllUsers,
  getAllUsersByUsername,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:username", getAllUsersByUsername);

module.exports = usersRouter;
