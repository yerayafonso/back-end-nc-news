const {
  getAllEmojis: getAllEmojisService,
} = require("../service/emojis.service");

exports.getAllEmojis = (req, res) => {
  getAllEmojisService().then((emojis) => {
    res.status(200).send(emojis);
  });
};
