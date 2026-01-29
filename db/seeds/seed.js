const db = require("../connection");
const format = require("pg-format");
const { createRef, updateComments } = require("./utils.js");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE topics (
    slug VARCHAR PRIMARY KEY,
    description VARCHAR,
    img_url VARCHAR(1000)
    )`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      name VARCHAR, 
      avatar_url VARCHAR(1000)
      )`,
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      topic VARCHAR NOT NULL REFERENCES topics(slug),
      author VARCHAR NOT NULL REFERENCES users(username),
      body TEXT, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0, 
      article_img_url VARCHAR(1000)
      )`,
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(article_id),
      body TEXT,
      votes INT DEFAULT 0,
      author VARCHAR NOT NULL REFERENCES users(username), 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      );
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => [
        topic.slug,
        topic.description,
        topic.img_url,
      ]);
      return db.query(
        format(
          `INSERT INTO topics(slug, description, img_url) VALUES %L`,
          formattedTopics,
        ),
      );
    })
    .then(() => {
      const formattedUsers = userData.map((user) => [
        user.username,
        user.name,
        user.avatar_url,
      ]);
      return db.query(
        format(
          `INSERT INTO users(username, name, avatar_url) VALUES %L`,
          formattedUsers,
        ),
      );
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => [
        article.title,
        article.topic,
        article.author,
        article.body,
        article.created_at,
        article.votes,
        article.article_img_url,
      ]);
      return db.query(
        format(
          `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
          formattedArticles,
        ),
      );
    })
    .then(({ rows }) => {
      const ref = createRef(rows, "title", "article_id");

      const updatedComments = updateComments(commentData, ref);

      const formattedComments = updatedComments.map(
        ({ article_id, body, votes, author, created_at }) => [
          article_id,
          body,
          votes,
          author,
          created_at,
        ],
      );

      return db.query(
        format(
          `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L`,
          formattedComments,
        ),
      );
    });
};
module.exports = seed;
