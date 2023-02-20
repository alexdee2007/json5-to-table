#CHANGE LOGS

## Version 0.1.8

1. Adjust the implementation mechanism of fillData

   This time, it is mainly to fix ISSUE 30, and adjust the implementation mechanism of fillData in order not to double-calculate the space occupied by data. Convert it to an intermediate format before filling it into an array. The intermediate formats include Table, Row, Cell.

   In order to be compatible with the format output of Table, Row, and Cell, fillData's filling mechanism for empty arrays is adjusted to be consistent with empty objects.

2. Adjust the packaging format to ES5

3. Redesign the error reporting scheme for absent introduction of XLSX
