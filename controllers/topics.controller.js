const {
  getAllTopics: getAllTopicsService,
  getAllArticlesByTopic: getAllArticlesByTopicService,
} = require("../service/topics.service");

exports.getAllTopics = (req, res) => {
  getAllTopicsService().then((topics) => {
    res.status(200).send(topics);
  });
};

exports.getAllArticlesByTopic = (req, res) => {
  getAllArticlesByTopicService().then((articles) => {
    res.status(200).send(articles);
  });
};
