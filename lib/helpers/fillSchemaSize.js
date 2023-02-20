// Fill the size into the schema so that it can be used in generateTable, fillData, fillSchema
// The array schema will add a size attribute to the array, which JavaScript allows
function fillSchemaSize(schema) {
  if (Array.isArray(schema)) {
    const schemaItems = schema.map((schemaItem) => fillSchemaSize(schemaItem));
    schemaItems.size = [
      Math.max(...schemaItems.map((schemaItem) => schemaItem.size[0])),
      schemaItems.map((schemaItem) => schemaItem.size[1]).reduce((a, b) => a + b, 0)
    ];
    return schemaItems;
  }

  const schemaRowOccupied = schema.title === "" ? 0 : 1;

  if (schema.props) {
    const schemaItems = fillSchemaSize(schema.props);

    // Decorate props
    schema = Object.assign({}, schema);
    schema.props = schemaItems;

    // add size attribute
    schema.size = [schemaRowOccupied + schemaItems.size[0], schemaItems.size[1]];

    return schema;
  }

  return { ...schema, size: [schemaRowOccupied, 1] };
}

module.exports = fillSchemaSize;
