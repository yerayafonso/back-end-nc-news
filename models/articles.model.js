const db = require("../db/connection");
const InvalidQuery = require("../errors/InvalidQuery");

exports.fetchAllArticles = (sort_by = "created_at", order = "DESC") => {
  const validSortQuery = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "avatar_img_url",
  ];
  const validOrderQuery = ["ASC", "DESC"];

  if (!validSortQuery.includes(sort_by)) {
    throw new InvalidQuery("Invalid Query");
  }

  if (!validOrderQuery.includes(order.toUpperCase())) {
    throw new InvalidQuery("Invalid Query");
  }

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
      ORDER BY articles.${sort_by} ${order.toUpperCase()};`,
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

exports.fetchArticleByIdComments = (article_id) => {
  return db
    .query(
      `SELECT 
      comment_id, 
      votes, 
      created_at, 
      author, 
      body, 
      article_id
      
      FROM comments 
      WHERE article_id = $1
      ORDER BY created_at DESC;`,
      [article_id],
    )
    .then(({ rows }) => rows);
};

exports.postNewArticleByIdComments = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments(article_id, body, author)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [article_id, body, username],
    )
    .then(({ rows }) => rows[0]);
};

exports.patchArticlePropertyById = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $2
     WHERE article_id = $1
      RETURNING *;`,
      [article_id, inc_votes],
    )
    .then(({ rows }) => rows[0]);
};

exports.checkArticleExists = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => rows.length === 1);
};
