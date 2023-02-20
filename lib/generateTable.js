const flatten = require("lodash/flatten");
const Matrix = require("./matrix");
const fillSchema = require("./fillSchema");
const fillData = require("./fillData");
const fillSchemaSize = require("./helpers/fillSchemaSize");
const calcDataSize = require("./helpers/calcDataSize");
const normalizeSchema = require("./normalizeSchema");
const parseToSchema = require("./parseToSchema");

function generateTable(data, schema, options = {}) {
  if (schema === undefined || schema === null) {
    schema = parseToSchema(data, options.parseDataToSchema);
  } else {
    schema = normalizeSchema(schema);
  }
  schema = fillSchemaSize(schema);

  return {
    header: generateHeader(schema),
    body: generateBody(data, schema)
  };
}

function generateHeader(schema) {
  const matrix = new Matrix(...schema.size);

  // then fill the matrix
  fillSchema(schema, matrix);

  // Finally transform the matrix data
  return matrix
    .map((val, rowIndex, colIndex) => {
      if (val != undefined) {
        return { row: 1 + rowIndex, col: 1 + colIndex, ...val };
      }
    })
    .toArray();
}

function generateBody(data, schema) {
  if (!Array.isArray(data)) {
    data = [data];
  }

  let rowStart = 1 + schema.size[0];

  return flatten(
    data.map((dataItem) => {
      // First determine the size of the space occupied by the item
      const dataSize = calcDataSize(dataItem, schema);

      // Then generate inline data, note that this is a two-dimensional array
      const row = generateRow(dataItem, schema, dataSize, rowStart);

      rowStart += dataSize[0];

      return row;
    })
  );
}

function generateRow(data, schema, dataSize, rowStart) {
  const matrix = new Matrix(...dataSize);

  // then fill the matrix
  fillData(data, schema, matrix);

  // Finally transform the matrix data
  return matrix
    .map((val, rowIndex, colIndex) => {
      if (val) {
        return { row: rowStart + rowIndex, col: 1 + colIndex, ...val };
      }
    })
    .toArray();
}

module.exports = generateTable;
