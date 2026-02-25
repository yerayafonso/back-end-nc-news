const db = require("../db/connection");

exports.fetchAllTopics = () => {
  return db
    .query(`SELECT slug, description FROM topics`)
    .then(({ rows }) => rows);
};

exports.fetchAllArticlesByTopic = (topic) => {
  return db
    .query(`SELECT * FROM articles WHERE topic = $1`, [topic])
    .then(({ rows }) => rows);
};
