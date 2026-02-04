const express = require("express");

const app = express();

app.use(express.json());

const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

module.exports = app;
