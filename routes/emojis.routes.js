const express = require("express");
const { getAllEmojis } = require("../controllers/emojis.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const emojisRouter = express.Router();

emojisRouter.route("/").get(getAllEmojis).all(handleInvalidMethods);

module.exports = emojisRouter;
