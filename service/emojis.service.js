const { fetchAllEmojis } = require("../models/emojis.model");

exports.getAllEmojis = () => {
  return fetchAllEmojis();
};
