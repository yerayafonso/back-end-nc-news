const {
  fetchAllArticles,
  fetchArticleById,
  fetchArticleByIdComments,
} = require("../models/articles.model");
const NotFoundError = require("../errors/NotFoundError");

exports.getAllArticles = () => {
  return fetchAllArticles();
};

exports.getArticleById = (article_id) => {
  return fetchArticleById(article_id).then((article) => {
    if (!article) {
      throw new NotFoundError("ID not found");
    } else {
      return article;
    }
  });
};

exports.getArticleByIdComments = (article_id) => {
  return fetchArticleByIdComments(article_id).then((comments) => {
    if (comments.length === 0) {
      throw new NotFoundError("ID not found");
    } else {
      return comments;
    }
  });
};
