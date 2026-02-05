const {
  fetchAllArticles,
  fetchArticleById,
  fetchArticleByIdComments,
  postNewArticleByIdComments,
  patchArticlePropertyById,
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

exports.postArticleByIdComments = (article_id, username, body) => {
  return postNewArticleByIdComments(article_id, username, body)
    .then((comments) => {
      if (!comments) {
        throw new NotFoundError("ID not found");
      } else {
        return comments;
      }
    })
    .catch((err) => {
      throw new NotFoundError("ID not found");
    });
};

exports.patchArticleById = (article_id, inc_votes) => {
  return patchArticlePropertyById(article_id, inc_votes)
    .then((article) => {
      if (!article) {
        throw new NotFoundError("ID not found");
      } else {
        return article;
      }
    })
    .catch((err) => {
      throw new NotFoundError("ID not found");
    });
};
