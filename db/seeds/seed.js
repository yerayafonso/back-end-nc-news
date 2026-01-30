const db = require("../connection");
const format = require("pg-format");
const { createRef } = require("./utils.js");

const seed = ({
  topicData,
  userData,
  articleData,
  commentData,
  emojiData,
  reactionData,
}) => {
  return db
    .query(`DROP TABLE IF EXISTS article_emoji_reactions`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS emojis`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS comments`);
    })
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
      return db.query(
        `CREATE TABLE emojis (
      emoji_id SERIAL PRIMARY KEY,
      emoji_name VARCHAR,
      emoticon VARCHAR(8)
      )`,
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE article_emoji_reactions (
      article_emoji_reactions_id SERIAL PRIMARY KEY,
      username VARCHAR REFERENCES users(username), 
      article_id INT REFERENCES articles(article_id),
      emoji_id INT REFERENCES emojis(emoji_id)
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

      const formattedComments = commentData.map((comment) => [
        ref[comment.article_title],
        comment.body,
        comment.votes,
        comment.author,
        comment.created_at,
      ]);

      return db.query(
        format(
          `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L`,
          formattedComments,
        ),
      );
    })
    .then(() => {
      const formattedEmojis = emojiData.map((emoji) => [
        emoji.emoji_name,
        emoji.emoticon,
      ]);
      return db.query(
        format(
          `INSERT INTO emojis(emoji_name, emoticon) VALUES %L RETURNING *`,
          formattedEmojis,
        ),
      );
    });
  // .then(({ rows }) => {
  //   const ref = createRef(rows, "emoticon", "emoji_id");
  //   console.log(ref);

  //   const formattedReactions = reactionData.map((reaction) => [
  //     reaction.username,
  //     ref[reaction.title],
  //     reaction.emoji_id,
  //   ]);
  //   return db.query(
  //     format(
  //       `INSERT INTO article_emoji_reactions(username, article_id, emoji_id) VALUES %L RETURNING *`,
  //       formattedReactions,
  //     ),
  //   );
  // });
};
module.exports = seed;
