const express = require("express");
const NotFoundError = require("./errors/NotFoundError");

const app = express();

app.use(express.json());

const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");
const commentsRouter = require("./routes/comments.routes");
const InvalidQuery = require("./errors/InvalidQuery");
const emojisRouter = require("./routes/emojis.routes");

//Valid Paths

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

app.use("/api/comments", commentsRouter);

app.use("/api/emojis", emojisRouter);

// Invalid Path catch all

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

// Error Handling Middleware Functions

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ msg: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err instanceof InvalidQuery) {
    res.status(404).send({ msg: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
