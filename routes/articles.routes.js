const express = require("express");
const {
  getAllArticles,
  getArticleById,
  getArticleByIdComments,
} = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getArticleByIdComments);

module.exports = articlesRouter;
