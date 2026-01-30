const db = require("../connection");
const format = require("pg-format");
const { createRef } = require("./utils.js");

async function seed({
  topicData,
  userData,
  articleData,
  commentData,
  emojiData,
  reactionData,
}) {
  await db.query(`DROP TABLE IF EXISTS article_emoji_reactions`);

  await db.query(`DROP TABLE IF EXISTS emojis`);

  await db.query(`DROP TABLE IF EXISTS comments`);

  await db.query(`DROP TABLE IF EXISTS articles`);

  await db.query(`DROP TABLE IF EXISTS users`);

  await db.query(`DROP TABLE IF EXISTS topics`);

  await db.query(`
    CREATE TABLE topics (
    slug VARCHAR PRIMARY KEY,
    description VARCHAR,
    img_url VARCHAR(1000)
    )`);

  await db.query(
    `CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      name VARCHAR, 
      avatar_url VARCHAR(1000)
      )`,
  );

  await db.query(
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

  await db.query(
    `CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(article_id),
      body TEXT,
      votes INT DEFAULT 0,
      author VARCHAR NOT NULL REFERENCES users(username), 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
  );

  await db.query(
    `CREATE TABLE emojis (
      emoji_id SERIAL PRIMARY KEY,
      emoji_name VARCHAR,
      emoticon VARCHAR(8)
      )`,
  );

  await db.query(
    `CREATE TABLE article_emoji_reactions (
      article_emoji_reactions_id SERIAL PRIMARY KEY,
      username VARCHAR NOT NULL REFERENCES users(username), 
      article_id INT NOT NULL REFERENCES articles(article_id),
      emoji_id INT NOT NULL REFERENCES emojis(emoji_id)
      )`,
  );

  const formattedTopics = topicData.map((topic) => [
    topic.slug,
    topic.description,
    topic.img_url,
  ]);
  await db.query(
    format(
      `INSERT INTO topics(slug, description, img_url) VALUES %L`,
      formattedTopics,
    ),
  );

  const formattedUsers = userData.map((user) => [
    user.username,
    user.name,
    user.avatar_url,
  ]);
  await db.query(
    format(
      `INSERT INTO users(username, name, avatar_url) VALUES %L`,
      formattedUsers,
    ),
  );

  const formattedArticles = articleData.map((article) => [
    article.title,
    article.topic,
    article.author,
    article.body,
    article.created_at,
    article.votes,
    article.article_img_url,
  ]);
  const insertedArticles = await db.query(
    format(
      `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
      formattedArticles,
    ),
  );

  const articleRef = createRef(insertedArticles.rows, "title", "article_id");

  const formattedComments = commentData.map((comment) => [
    articleRef[comment.article_title],
    comment.body,
    comment.votes,
    comment.author,
    comment.created_at,
  ]);

  await db.query(
    format(
      `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L`,
      formattedComments,
    ),
  );

  const formattedEmojis = emojiData.map((emoji) => [
    emoji.emoji_name,
    emoji.emoticon,
  ]);

  await db.query(
    format(
      `INSERT INTO emojis(emoji_name, emoticon) VALUES %L `,
      formattedEmojis,
    ),
  );
  const emojiTable = await db.query(`SELECT * FROM emojis`);

  const emojiRef = createRef(emojiTable.rows, "emoticon", "emoji_id");

  const formattedReactions = reactionData.map((reaction) => [
    reaction.username,
    articleRef[reaction.title],
    emojiRef[reaction.emoticon],
  ]);

  await db.query(
    format(
      `INSERT INTO article_emoji_reactions(username, article_id, emoji_id) VALUES %L`,
      formattedReactions,
    ),
  );
}
module.exports = seed;
