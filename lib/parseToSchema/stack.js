const isObject = require("lodash/isObject");
const merge = require("lodash/merge");

// data must be an object or an array of objects. I will directly use the first element of the array to determine whether it is an object array,
// If not an array of objects, treat it as a primitive value.
function parseToSchema(data) {
  data = deepMergeToPlainObject(data);
  return parsePlainObjectToSchema(data);
}

function parsePlainObjectToSchema(data) {
  return Object.entries(data).map(([name, dataItem]) => {
    const props = parsePlainObjectToSchema(dataItem);
    if (props.length > 0) {
      return { title: name, path: name, props };
    } else {
      return { title: name, path: name };
    }
  });
}

function deepMergeToPlainObject(data) {
  if (Array.isArray(data)) {
    return merge({}, ...data.map((dataItem) => deepMergeToPlainObject(dataItem)));
  } else if (isObject(data)) {
    const object = {};
    for (const [name, value] of Object.entries(data)) {
      object[name] = deepMergeToPlainObject(value);
    }
    return object;
  } else {
    return {};
  }
}

module.exports = parseToSchema;
