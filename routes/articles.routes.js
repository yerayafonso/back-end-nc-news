const express = require("express");
const {
  getAllArticles,
  getArticleById,
  getArticleByIdComments,
  postArticleByIdComments,
  patchArticleById,
  postArticle,
} = require("../controllers/articles.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const articlesRouter = express.Router();

articlesRouter
  .route("/")
  .get(getAllArticles)
  .post(postArticle)
  .all(handleInvalidMethods);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handleInvalidMethods);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleByIdComments)
  .post(postArticleByIdComments)
  .all(handleInvalidMethods);

module.exports = articlesRouter;
