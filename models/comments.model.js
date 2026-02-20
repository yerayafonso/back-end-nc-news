const db = require("../db/connection");

exports.deleteCommentObjectById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id= $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => rows);
};

exports.patchCommentObjectById = (comment_id, inc_votes) => {
  return db
    .query(
      `UPDATE comments SET votes = votes + $2
     WHERE comment_id = $1
      RETURNING *;`,
      [comment_id, inc_votes],
    )
    .then(({ rows }) => rows[0]);
};
