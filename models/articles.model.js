const db = require("../db/connection");

exports.fetchAllArticles = () => {
  return db
    .query(
      `SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url, 
      CAST(COUNT(comments.article_id) AS INT) comment_count
      FROM articles 
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id 
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`,
    )
    .then(({ rows }) => rows);
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url 
      FROM articles 
      WHERE article_id = $1;`,
      [article_id],
    )
    .then(({ rows }) => rows[0]);
};
