const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getArticleByIdComments: getArticleByIdCommentsService,
  postArticleByIdComments: postArticleByIdCommentsService,
  patchArticleById: patchArticleByIdService,
} = require("../service/articles.service");
const InvalidType = require("../errors/InvalidType");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  getAllArticlesService(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  if (isNaN(+article_id)) {
    throw new InvalidType("Invalid ID type");
  }
  getArticleByIdService(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
      //   res.status(404).send({ msg: "Sorry, that article does not exist" });
    });
};

exports.getArticleByIdComments = (req, res, next) => {
  const { article_id } = req.params;

  getArticleByIdCommentsService(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticleByIdComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  postArticleByIdCommentsService(article_id, username, body)
    .then((comments) => {
      res.status(201).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  patchArticleByIdService(article_id, inc_votes)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
};
