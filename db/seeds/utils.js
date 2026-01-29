function createRef(dataCategory, property1, property2) {
  let mappedObj = {};

  for (let object of dataCategory) {
    const newKey = object[property1];
    const newValue = object[property2];
    mappedObj[newKey] = newValue;
  }
  return mappedObj;
}

function updateComments(commentsData, changedKeysObject) {
  let formattedComments = [];
  for (let comment of commentsData) {
    let newObject = {};
    for (let key in comment) {
      if (key === "article_title") {
        newObject.article_id = changedKeysObject[comment[key]];
      } else {
        newObject[key] = comment[key];
      }
    }
    formattedComments.push(newObject);
  }
  return formattedComments;
}

module.exports = { createRef, updateComments };
