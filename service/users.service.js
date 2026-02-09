const NotFoundError = require("../errors/NotFoundError");
const {
  fetchAllUsers,
  fetchAllUsersByUsername,
} = require("../models/users.model");

exports.getAllUsers = () => {
  return fetchAllUsers();
};

exports.getAllUsersByUsername = (username) => {
  return fetchAllUsersByUsername(username).then((user) => {
    if (user.length === 0) {
      throw new NotFoundError("User not found!");
    } else {
      return { user };
    }
  });
};
