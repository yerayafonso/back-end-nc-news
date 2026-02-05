const express = require("express");
const {
  getAllArticles,
  getArticleById,
  getArticleByIdComments,
  postArticleByIdComments,
} = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getArticleByIdComments);
articlesRouter.delete("/:article_id", (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
});
// articlesRouter.post("/:article_id/comments", postArticleByIdComments);

module.exports = articlesRouter;
