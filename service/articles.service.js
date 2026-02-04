const {
  fetchAllArticles,
  fetchArticleById,
  fetchArticleByIdComments,
} = require("../models/articles.model");

exports.getAllArticles = () => {
  return fetchAllArticles();
};

exports.getArticleById = (article_id) => {
  return fetchArticleById(article_id);
};

exports.getArticleByIdComments = (article_id) => {
  return fetchArticleByIdComments(article_id);
};
