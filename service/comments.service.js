const { deleteCommentObjectById } = require("../models/comments.model");

const NotFoundError = require("../errors/NotFoundError");

exports.deleteCommentById = (comment_id) => {
  return deleteCommentObjectById(comment_id)
    .then((comments) => {
      return comments;
    })
    .catch((err) => {
      console.error(err);
      throw new NotFoundError("ID not found");
    });
};
