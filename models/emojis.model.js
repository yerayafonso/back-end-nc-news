const db = require("../db/connection");

exports.fetchAllEmojis = () => {
  return db
    .query(`SELECT emoji_name, emoticon FROM emojis`)
    .then(({ rows }) => rows);
};
