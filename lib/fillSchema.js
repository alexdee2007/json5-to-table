const fillSchemaSize = require("./helpers/fillSchemaSize");

// Still full of rows, regardless of columns
function fillSchema(schema, matrix) {
  if (!("size" in schema)) {
    schema = fillSchemaSize(schema);
  }

  if (Array.isArray(schema)) {
    let colStart = 0;

    for (const schemaItem of schema) {
      const occupyCols = fillSchema(schemaItem, matrix.subview(0, colStart));
      colStart += occupyCols;
    }

    return colStart;
  }

  // Prioritize the schema of the sub-attributes, the occupiedCols has been determined
  const occupyRowsOfFirstLevel = Math.ceil(matrix.rows / schema.size[0]);
  let occupyCols = 1;
  if (schema.props) {
    occupyCols = fillSchema(schema.props, matrix.subview(occupyRowsOfFirstLevel, 0));
  }

  if (schema.title !== "") {
    matrix.setVal(0, 0, { val: schema.title, rowSpan: occupyRowsOfFirstLevel, colSpan: occupyCols });
  }
  return occupyCols;
}

module.exports = fillSchema;
