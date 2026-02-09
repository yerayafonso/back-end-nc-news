const express = require("express");
const {
  getAllUsers,
  getAllUsersByUsername,
} = require("../controllers/users.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers).all(handleInvalidMethods);
usersRouter.get("/:username", getAllUsersByUsername);

module.exports = usersRouter;
