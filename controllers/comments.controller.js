const {
  deleteCommentById: deleteCommentByIdService,
} = require("../service/comments.service");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  deleteCommentByIdService(comment_id)
    .then((comments) => {
      if (comments.length === 0) {
        res.status(204).send(comments);
      }
    })
    .catch((err) => {
      next(err);
    });
};
