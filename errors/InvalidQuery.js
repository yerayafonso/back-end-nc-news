class InvalidQuery extends Error {
  constructor(message) {
    super(message);
    this.name = InvalidQuery;
  }
}

module.exports = InvalidQuery;
