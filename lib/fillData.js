const { Table, Row, Cell, generateTable } = require("./stack/generateTable");

// Occupy full row, dynamically occupy column
function fillData(data, schema, matrix) {
  const table = generateTable(data, schema);
  // fillSize(table)
  fillTable(table, matrix);
}

function fillTable(table, matrix) {
  if (table instanceof Table) {
    // add line by line
    const factor = Math.floor(matrix.rows / table.size[0]);

    let rowStart = 0;
    for (const row of table.rows) {
      const rowOccupy = row.size[0] * factor;
      fillTable(row, matrix.subview(rowStart, 0, rowOccupy));
      rowStart += rowOccupy;
    }

    // The remaining parts that are not divisible are merged into a single cell
    if (rowStart < matrix.rows) {
      matrix.setVal(rowStart, 0, { val: undefined, rowSpan: matrix.rows - rowStart, colSpan: table.size[1] });
    }
  } else if (table instanceof Row) {
    // Add column by column
    const row = table;

    let colStart = 0;
    for (const cell of row.cells) {
      fillTable(cell, matrix.subview(0, colStart));
      colStart += cell.size[1];
    }
  } else if (table instanceof Cell) {
    // add cell
    const cell = table;

    matrix.setVal(0, 0, { val: cell.val, rowSpan: matrix.rows, colSpan: 1 });
  } else {
    throw new Error("Table parameter type exception");
  }
}

module.exports = fillData;
