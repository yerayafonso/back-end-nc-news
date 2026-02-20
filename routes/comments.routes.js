const express = require("express");
const {
  deleteCommentById,
  patchCommentById,
} = require("../controllers/comments.controller");
const handleInvalidMethods = require("../errors/handleInvalidMethods");

const commentsRouter = express.Router();

commentsRouter.route("/").all(handleInvalidMethods);

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(patchCommentById)
  .all(handleInvalidMethods);

module.exports = commentsRouter;
