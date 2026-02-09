const {
  getAllUsers: getAllUsersService,
  getAllUsersByUsername: getAllUsersByUsernameService,
} = require("../service/users.service");

exports.getAllUsers = (req, res) => {
  getAllUsersService().then((users) => {
    res.status(200).send(users);
  });
};

exports.getAllUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  getAllUsersByUsernameService(username)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
};
