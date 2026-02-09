const express = require("express");
const { deleteCommentById } = require("../controllers/comments.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const commentsRouter = express.Router();

commentsRouter.route("/").all(handleInvalidMethods);

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .all(handleInvalidMethods);

module.exports = commentsRouter;
