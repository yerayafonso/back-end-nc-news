const express = require("express");
const { getAllEmojis } = require("../controllers/emojis.controller");

const emojisRouter = express.Router();

emojisRouter.get("/", getAllEmojis);

module.exports = emojisRouter;
