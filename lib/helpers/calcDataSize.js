const retrieveProperty = require("./retrieveProperty");

module.exports = function calcDataSize(data, schema) {
  if (Array.isArray(data)) {
    // fix nested-nested-fields
    if (!data.length) return [1, schema.size[1]];
    const allSizes = data.map((dataItem) => calcDataSize(dataItem, schema));

    return [
      allSizes.map((s) => s[0]).reduce((a, b) => a + b, 0),
      schema.size[1] // max(map(allSizes, 1)) <= schema.size[1]
    ];
  }

  if (Array.isArray(schema)) {
    const allSizes = schema.map((schemaItem) => calcDataSize(data, schemaItem));

    return [Math.max(...allSizes.map((s) => s[0])), allSizes.map((s) => s[1]).reduce((a, b) => a + b)];
  }

  if (schema.props) {
    const dataItem = retrieveProperty(data, schema.path);
    return calcDataSize(dataItem, schema.props);
  }

  if (schema.size[1] !== 1) {
    throw new Error("An assertion error：The schema size for scalar data should be [1, 1]");
  }
  return [1, 1];
};
