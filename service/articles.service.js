const {
  fetchAllArticles,
  fetchArticleById,
  fetchArticleByIdComments,
  postNewArticleByIdComments,
  patchArticlePropertyById,
  checkArticleExists,
  checkArticleTopicsExists,
} = require("../models/articles.model");
const NotFoundError = require("../errors/NotFoundError");
const InvalidQuery = require("../errors/InvalidQuery");

exports.getAllArticles = (sort_by, order, topic) => {
  if (topic) {
    return checkArticleTopicsExists(topic).then((topicExists) => {
      if (topicExists) {
        return fetchAllArticles(sort_by, order, topic);
        // .then((articles) => { return { articles };});
      } else {
        throw new InvalidQuery("Invalid Query");
      }
    });
  } else {
    return fetchAllArticles(sort_by, order).then((articles) => {
      return articles;
    });
  }
};

exports.getArticleById = (article_id) => {
  return fetchArticleById(article_id).then((article) => {
    if (!article) {
      throw new NotFoundError("ID not found");
    } else {
      return { article };
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
          return { comments };
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
