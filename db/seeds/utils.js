function createRef(dataCategory, property1, property2) {
  let mappedObj = {};

  for (let object of dataCategory) {
    const newKey = object[property1];
    const newValue = object[property2];
    mappedObj[newKey] = newValue;
  }
  return mappedObj;
}

// function updateObject(dataCategory, changedKeysObject) {
//   let formattedObject = [];
//   for (let data of dataCategory) {
//     let newObject = {};
//     for (let key in data) {
//       if (key === "article_title") {
//         newObject.article_id = changedKeysObject[data[key]];
//       } else {
//         newObject[key] = data[key];
//       }
//     }
//     formattedObject.push(newObject);
//   }
//   return formattedObject;
// }

module.exports = { createRef };
