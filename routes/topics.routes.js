const express = require("express");
const { getAllTopics } = require("../controllers/topics.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const topicsRouter = express.Router();

topicsRouter.route("/").get(getAllTopics).all(handleInvalidMethods);

module.exports = topicsRouter;
