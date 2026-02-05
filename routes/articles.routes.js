const express = require("express");
const {
  getAllArticles,
  getArticleById,
  getArticleByIdComments,
  postArticleByIdComments,
  patchArticleById,
} = require("../controllers/articles.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handleInvalidMethods);

articlesRouter.get("/:article_id/comments", getArticleByIdComments);

articlesRouter.post("/:article_id/comments", postArticleByIdComments);

module.exports = articlesRouter;
