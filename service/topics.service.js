const {
  fetchAllTopics,
  fetchAllArticlesByTopic,
} = require("../models/topics.model");

exports.getAllTopics = () => {
  return fetchAllTopics();
};

exports.getAllArticlesByTopic = () => {
  return fetchAllArticlesByTopic();
};
