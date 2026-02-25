const express = require("express");
const {
  getAllTopics,
  getAllArticlesByTopic,
} = require("../controllers/topics.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const topicsRouter = express.Router();

topicsRouter.route("/").get(getAllTopics).all(handleInvalidMethods);

topicsRouter
  .route("/:topic")
  .get(getAllArticlesByTopic)
  .all(handleInvalidMethods);

module.exports = topicsRouter;
