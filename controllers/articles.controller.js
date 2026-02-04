const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  getArticleByIdComments: getArticleByIdCommentsService,
} = require("../service/articles.service");

exports.getAllArticles = (req, res) => {
  getAllArticlesService().then((articles) => {
    res.status(200).send(articles);
  });
};

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;

  getArticleByIdService(article_id).then((article) => {
    if (article !== undefined) {
      res.status(200).send(article);
    } else {
      res.status(404).send({ msg: "Sorry, that article does not exist" });
    }
  });
};

exports.getArticleByIdComments = (req, res) => {
  const { article_id } = req.params;

  getArticleByIdCommentsService(article_id).then((comments) => {
    if (comments.length !== 0) {
      res.status(200).send(comments);
    } else {
      res.status(404).send({ msg: "Sorry, that article does not exist" });
    }
  });
};
