const {
  deleteCommentById: deleteCommentByIdService,
} = require("../service/comments.service");
const InvalidType = require("../errors/InvalidType");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  if (isNaN(+comment_id)) {
    throw new InvalidType("Invalid ID type");
  }
  deleteCommentByIdService(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};
