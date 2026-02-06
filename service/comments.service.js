const { deleteCommentObjectById } = require("../models/comments.model");

const NotFoundError = require("../errors/NotFoundError");

exports.deleteCommentById = (comment_id) => {
  return deleteCommentObjectById(comment_id)
    .then((comments) => {
      if (comments.length === 0) {
        throw new NotFoundError("ID not found");
      } else {
        return "Comment has been deleted";
      }
    })
    .catch((err) => {
      throw new NotFoundError("ID not found");
    });
};
