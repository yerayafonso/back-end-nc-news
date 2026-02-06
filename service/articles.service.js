const {
  fetchAllArticles,
  fetchArticleById,
  fetchArticleByIdComments,
  postNewArticleByIdComments,
  patchArticlePropertyById,
  checkArticleExists,
} = require("../models/articles.model");
const NotFoundError = require("../errors/NotFoundError");

exports.getAllArticles = (sort_by, order) => {
  return fetchAllArticles(sort_by, order);
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
  return checkArticleExists(article_id).then((articleExists) => {
    if (!articleExists) {
      throw new NotFoundError("ID not found");
    } else {
      return fetchArticleByIdComments(article_id).then((comments) => {
        if (comments.length === 0) {
          throw new NotFoundError("Article doesn't have comments");
        } else {
          return comments;
        }
      });
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
