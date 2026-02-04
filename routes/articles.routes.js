const express = require("express");
const { getAllArticles } = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);

module.exports = articlesRouter;
