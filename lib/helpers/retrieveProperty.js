const flatten = require("lodash/flatten");

function retrieveProperty(object, path) {
  if (path === "") {
    return object;
  }

  const values = retrievePropertyAsArray(object, path);
  if (values.length === 0) {
    return undefined;
  } else if (values.length === 1) {
    return values[0];
  } else {
    return values;
  }
}

// Extract properties from object, always returned as an array.
// If object is null or undefined, return [undefined].
// If object is an empty array, return [].
function retrievePropertyAsArray(object, path) {
  if (Array.isArray(object)) {
    // extract properties from array
    const values = object.map((objectItem) => retrievePropertyAsArray(objectItem, path));
    return flatten(values);
  }

  if (object === undefined || object === null) {
    return [undefined];
  }

  // Only the first `.` is split; if there is no `.` in the path, remainingProperty is equal to undefined
  const [prop, remainingProp] = path.replace(".", "<br>").split("<br>");
  const value = object[prop];
  if (remainingProp) {
    return retrievePropertyAsArray(value, remainingProp);
  } else {
    return [value];
  }
}

module.exports = retrieveProperty;
