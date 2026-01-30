const db = require("./connection");

//Get all users
//db.query(`SELECT * FROM users`).then((res) => console.log(res.rows));

//Get all of the articles where the topic is coding
//db.query(`SELECT * FROM articles WHERE topic='coding'`).then((res) =>
//   console.log(res.rows),
// );

// Get all of the comments where the votes are less than zero
// db.query(`SELECT * FROM comments WHERE votes<0`).then((res) =>
//   console.log(res.rows),
// );
// Get all of the topics
// db.query(`SELECT * FROM topics`).then((res) => console.log(res.rows));

// Get all of the articles by user grumpy19
// db.query(`SELECT * FROM articles WHERE author='grumpy19'`).then((res) =>
//   console.log(res.rows),
// );

// Get all of the comments that have more than 10 votes.
// db.query(`SELECT * FROM comments WHERE votes>10`).then((res) =>
//   console.log(res.rows),
// );

// Get all of the emojis.
// db.query(`SELECT * FROM emojis `).then((res) => console.log(res.rows));

//Get all article titles
db.query(`SELECT title FROM articles`).then((res) => console.log(res.rows));
