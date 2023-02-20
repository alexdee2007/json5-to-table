#json5-to-table

> One of the best tools for converting JSON data into a table structure.

After a series of polishing, it can be said that `json5-to-table` is currently one of the most convenient tools for converting JSON data into tables. It supports:

- Nested JSON data, including arbitrarily deep arrays, objects, etc.
- Built-in support for generating HTML and Excel formats.
- Customizable headers.
- Easy to expand, use the native `generateTable` function to assist in generating arbitrary formats.
- Provides a command-line tool for cross-language development.

## Install

It is recommended to install using Yarn or NPM:

```bash
//With Yarn
$ yarn add json5-to-table

// Or with NPM
$ npm install json5-to-table
```

It can also be installed globally in order to use the command line tools:

```bash
// Global install with Yarn
$ yarn global add json5-to-table

// Or global install with NPM
$ npm install --global json5-to-table
```

You can also add a script tag in the browser (please replace 0.1.x with the correct version, the released version can be viewed in [Releases](https://github.com/yetrun/json5-to-table/releases) ):

```html
<script
  lang="javascript"
  src="https://github.com/yetrun/json5-to-table/releases/download/0.1.x/json5-to-table.js"
></script>
```

Generate HTML format is supported by default. If you need to generate Excel format, you need to install the dependency package at the same time:

```bash
$ yarn add xlsx
```

## use

### Import function and call

If installed via Yarn or NPM, import functions using CommonJS or ES6 syntax, e.g.

```javascript
import { generateTable, generateHTMLTable, generateExcel, parseDataToSchema } from "json5-to-table";
```

If used in a browser, use the global variable `JSON5_TO_TABLE`:

```javascript
const { generateTable, generateHTMLTable, generateExcel, parseDataToSchema } = JSON5_TO_TABLE;
```

Then call the function to generate the table structure, for example, the following is to generate a table in HTML format:

```javascript
const data = [
  {
    name: "Jim",
    age: 18,
    courses: [
      { name: "Music", duration: "3 hours" },
      { name: "Basketball", duration: "2 hours" }
    ]
  },
  {
    name: "Lucy",
    age: 17,
    courses: [
      { name: "Music", duration: "2 hours" },
      { name: "Painting", duration: "2 hours and 30 minutes" },
      { name: "Yoga", duration: "1 hour and 40 minutes" }
    ]
  }
];

const schema = [
  { title: "Name", path: "name" },
  { title: "Age", path: "age" },
  {
    title: "Courses",
    path: "courses",
    props: [
      { title: "Course Name", path: "name" },
      { title: "Learning Duration", path: "duration" }
    ]
  }
];

generateHTMLTable(data, schema);
```

The table thus generated looks like this:

<table>
   <thead>
     <tr>
       <th rowSpan="2">Name</th>
       <th rowSpan="2">Age</th>
       <th colSpan="2">Courses</th>
     </tr>
     <tr>
       <th>Course Name</th>
       <th>Learning Duration</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td rowSpan="2">Jim</td>
       <td rowSpan="2">18</td>
       <td>Music</td>
       <td>3 hours</td>
     </tr>
     <tr>
       <td>Basketball</td>
       <td>2 hours</td>
     </tr>
     <tr>
       <td rowSpan="3">Lucy</td>
       <td rowSpan="3">17</td>
       <td>Music</td>
       <td>2 hours</td>
     </tr>
     <tr>
       <td>Painting</td>
       <td>2 hours and 30 minutes</td>
     </tr>
     <tr>
       <td>Yoga</td>
       <td>1 hour and 40 minutes</td>
     </tr>
   </tbody>
</table>
### Using command line tools

After installing the package globally, you can use the command line tool `json5-to-table`. Its usage is as follows:

```bash
// View help documentation
$ json5-to-table -h

// Generate a table in HTML format, and output the table to the console
$ json5-to-table -d <data-file> -e <schema-file> -p <options-file>

// Generate a table in Excel format, and output the table to the console
$ json5-to-table -d <data-file> --excel
```

**scenes to be used**

1. It can be used as a tool to generate HTML or Excel tables through the command line.
2. It supports channels and can be connected to other languages.

**Special Note**

1. The file supports JSON5 format.

2. `<data-file>` supports All In One format. When `<schema-file>` and `<options-file>` are not specified, and the content of `<data-file>` is the following structure, get `data`,`from`<data-file>` schema`, `options`:

   ```javascript
   // <data-file> content
   {
     "data": [
       //...
     ],
     "schema": [
       //...
     ],
     "options": {
       //...
     }
   }
   ```

3. When the `<data-file>` parameter is not specified, read from standard input.

## Customize header structure

### The role of Schema

#### Customize header fields

There is a piece of data:

```javascript
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 }
];
```

I want to generate tables only for the fields `a` and `b`, and filter the field `c`. At this time, I can use Schema. The definition of Schema is as follows:

```javascript
const schema = [{ path: "a" }, { path: "b" }];
```

Then call `generateHTMLTable(data, schema)`, the generated table header will be as follows:

<table>
   <tr>
     <th>a</th>
     <th>b</th>
   </tr>
</table>

#### `title`: Customize header text

For the same data above, we want to display the table header in uppercase A and B, which can be achieved by configuring the `title` option:

```javascript
const schema = [
  { title: "A", path: "a" },
  { title: "B", path: "b" }
];
```

In addition to regular text, `title` has the following two special uses:

1. When `title` is not given, the text is exported by `path`. For example `{ path: 'a' }` is equivalent to `{ title: 'a', path: 'a' }`.
2. When `title` is equal to a blank string, but the header does not occupy row cells. With this feature, the display of scalar arrays in rows can be realized. For details, please refer to [Show long text arrays in rows](#Display long text arrays in rows).

#### `path`: attribute extraction path for custom columns

`path` is used to customize the path to extract data from this column. It actually supports multiple usages, listed as follows:

- `''`: Extract complete data.
- `'a'`: Extract field `a`.
- `'a.b.c'`: Extract fields `a`, `b`, `c` in sequence, and arrays can be handled well in the middle.

#### `props`: custom nested properties

If the data contains deep nesting, the deep `schema` can be customized through the `props` option. An example is as follows:

```javascript
const data = [
  { a: 1, b: { c: 2, d: 3 } },
  { a: 4, b: { c: 5, d: 6 } }
];
```

```javascript
const schema = [{ path: "a" }, { path: "b", props: [{ path: "c" }, { path: "d" }] }];
```

At this time, call `generateHTMLTable(data, schema)`, and the table header will display the nested format:

<table>
   <tr>
     <th rowSpan="2">a</th>
     <th colSpan="2">b</th>
   </tr>
   <tr>
     <th>c</th>
     <th>d</th>
   </tr>
</table>

#### Processing of arrays

When generating tables, arrays and objects are not treated differently, and objects can be regarded as arrays containing the same elements. In order to understand this, a few examples are given to illustrate.

For the following two data, the table structures generated by them are the same:

```javascript
const data1 = { a: 1, b: 2, c: 3 };

const data2 = [{ a: 1, b: 2, c: 3 }];
```

Even though inner fields are arrays, their generated format remains the same:

```javascript
const data1 = [{ a: 1, b: { c: 2, d: 3 } }];

const data2 = [{ a: 1, b: [{ c: 2, d: 3 }] }];
```

The following example illustrates how to display an array. First given an array (field `b`) with two elements inside:

```JavaScript
const data = [
   { a: 1, b: [
     { c: 2, d: 3 },
     { c: 4, d: 5 }
   ]}
]
```

Given a Schema:

```javascript
const schema = [{ path: "a" }, { path: "b", props: [{ path: "c" }, { path: "d" }] }];
```

The resulting full table appears as:

<table>
   <thead>
     <tr>
       <th rowSpan="2">a</th>
       <th colSpan="2">b</th>
     </tr>
     <tr>
       <th>c</th>
       <th>d</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td rowSpan="2">1</td>
       <td>2</td>
       <td>3</td>
     </tr>
     <tr>
       <td>4</td>
       <td>5</td>
     </tr>
   </tbody>
</table>

### Data derivation table header

#### Derivation method

Any function that generates a table structure, including `generateTable`, `generateHTMLTable`, `generateExcel` contains two usages:

1. Display the specified schema, for example:

   ```javascript
   generateHTMLTable(data, schema);
   ```

2. Implicit derivation of Schema, for example:
   ```javascript
   generateHTMLTable(data, null, { parseDataToSchema: "stack" });
   ```

Here are two derivation methods: `stack` and `flatten`. The difference between them is how to deal with nested headers. Given a piece of data with nesting:

```javascript
const data = [
  {
    a: 1,
    b: {
      c: 2,
      d: 3
    }
  }
];
```

The header generated using `stack` is:

```javascript
generateHTMLTable(data, null, { parseDataToSchema: "stack" });
```

<table>
   <tr>
     <th rowSpan="2">a</th>
     <th colSpan="2">b</th>
   </tr>
   <tr>
     <th>d</th>
   </tr>
</table>

The header generated using `flatten` is:

```javascript
generateHTMLTable(data, null, { parseDataToSchema: "stack" });
```

<table>
   <tr>
     <th>a</th>
     <th>b.c</th>
     <th>b.d</th>
   </tr>
</table>

The default strategy used is `stack`, which means

```JavaScript
generateHTMLTable(data)
```

Equivalent to

```javascript
generateHTMLTable(data, null, { parseDataToSchema: "stack" });
```

#### Derivation Questions

Although implicit derivation can be used, I still don't recommend it here. The main reason is that the order of the columns cannot be guaranteed. For example for the following data:

```javascript
const data = [
  { a: 1, b: 2, c: 3 },
  { c: 4, b: 5, a: 6 }
];
```

There is no guarantee that the columns will be in the order `a`, `b`, `c`. On the one hand, it depends on the implementation of the browser, on the other hand, the derivation algorithm does not make any guarantees.

Therefore, it is always recommended to explicitly specify the Schema at any time. If you do not know enough about the Schema, you can use the `parseDataToSchema` function to export the Schema first, and then adjust it to what you need. Detailed techniques can be found in [Use parseDataToSchema to understand the usage of Schema](#Use -parsedatatoschema-understand the usage of -schema-).

## API

### `generateTable`

**definition**

```javascript
generateTable(data, schema, options);
```

**describe**

The table format generated by this function is expressed as a JS object, and its main function is to provide a convenient intermediate format for conversion into other formats. In essence, both `generateHTMLTable` and `generateExcel` were quickly developed based on this function.

**parameter explanation**

- `data`: Arbitrary JavaScript data, including arrays, objects, numbers, strings, Null, Undefined, etc.
- `schema`: Customize the header structure, its usage is explained in detail above.
- `options`: options object, currently only one option is supported:
  - `parseSchemaToData`: `"stack"` or `"flatten"`.

**example**

```
const data = [
   {
     a: 1,
     b:[
       { c: 2, d: 3 }
     ]
   },
   {
     a: 4,
     b:[
       { c: 5, d: 6 },
       { c: 7, d: 8 }
     ]
   }
]

const schema = [
   { path: 'a' },
   { path: 'b', props: [
     { path: 'c' },
     { path: 'd' }
   ] }
]

generateTable(data, schema)
```

The display output is:

```javascript
{
   header: [
     [
       { row: 1, col: 1, val: 'a', rowSpan: 2, colSpan: 1 },
       { row: 1, col: 2, val: 'b', rowSpan: 1, colSpan: 2 },
       undefined
     ],
     [
       undefined,
       { row: 2, col: 2, val: 'c', rowSpan: 1, colSpan: 1 },
       { row: 2, col: 3, val: 'd', rowSpan: 1, colSpan: 1 }
     ]
   ],
   body: [
     [
       { row: 3, col: 1, val: 1, rowSpan: 1, colSpan: 1 },
       { row: 3, col: 2, val: 2, rowSpan: 1, colSpan: 1 },
       { row: 3, col: 3, val: 3, rowSpan: 1, colSpan: 1 }
     ],
     [
       { row: 4, col: 1, val: 4, rowSpan: 2, colSpan: 1 },
       { row: 4, col: 2, val: 5, rowSpan: 1, colSpan: 1 },
       { row: 4, col: 3, val: 6, rowSpan: 1, colSpan: 1 }
     ],
     [
       undefined,
       { row: 5, col: 2, val: 7, rowSpan: 1, colSpan: 1 },
       { row: 5, col: 3, val: 8, rowSpan: 1, colSpan: 1 }
     ]
   ]
}
```

### `generateHTMLTable`

**definition**

```javascript
generateHTMLTable(data, schema, options);
```

**effect**

Generate HTML table source code, the returned format is a string. The tags used in the generated HTML table include `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, which can customize attributes for tags , including `class`, `style` and others.

**parameter explanation**

- `data` and `schema`: Same as `generateTable`.
- `options`: options object, in addition to the options supported by `generateTable`, it also supports the following options:
  - `attributes`: Declare the attributes used by the tag, see examples for specific usage.

**example**

```javascript
// add label attribute
generateHTMLTable(data, schema, {
  attributes: {
    table: { class: "c-table" },
    thead: { class: "c-table-header" },
    tbody: { class: "c-table-body" },
    tr: { class: "c-table-row" },
    "thead.tr": { style: "background: light-blue" },
    "tbody.tr": { style: "background: cyan" },
    th: { class: "c-header-cell" },
    td: { class: "c-data-cell" }
  }
});
```

### `generateExcel`

**Remark**

The dependency package `xlsx` needs to be installed at the same time.

**definition**

```javascript
generateExcel(data, schema, options);
```

**effect**

Generate an Excel table.

**parameter explanation**

- `data` and `schema`: Same as `generateTable`.
- `options`: options object, in addition to the options supported by `generateTable`, it also supports the following options:
  - `writeTo`: A file path.

**example**

```javascript
// write to file path
generateExcel(data, schema, { writeTo: "/tmp/example.xlsx" });

// write to standard output
generateExcel(data, schema, { writeTo: "/dev/stdout" });
```

### `parseDataToSchema`

**definition**

```javascript
parseDataToSchema(data, mode);
```

**effect**

The Schema is deduced from the data, and two derivation methods are supported.

**parameter explanation**

- `data`: data
- `mode`: Derivation mode, supports two kinds of derivationThe derivation method `"stack"` and `"flatten"`. For the detailed difference, please refer to the **Data Derivation Table** section.

## skills

#### Display scalar array

Although rare, if we encounter the following array data:

```javascript
const data = ["A", "B", "C"];
```

Displayed in a grid by default:

<table>
   <tbody>
     <tr>
       <td>A,B,C</td>
     </tr>
   </tbody>
</table>

We want to display it in other lines. In this case, we can satisfy the purpose by customizing a blank `path`:

```javascript
const schema = { title: "Data", path: "" };
```

The display will be:

<table>
   <thead>
     <tr>
       <th>Data</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>A</td>
     </tr>
     <tr>
       <td>B</td>
     </tr>
     <tr>
       <td>C</td>
     </tr>
   </tbody>
</table>

#### Display the long text array in separate lines

Arrays use the `array.toString()` method to display text in cells, and the display effect of `[1, 2, 3]` is `1,2,3`. If you encounter a long text array, for example:

```javascript
const data = {
  short: 1,
  long: [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"
  ]
};
```

The default display will not be good enough. At this time, the row display of the array can be realized by customizing the Schema:

```javascript
const schema = [{ path: "short" }, { path: "long", props: [{ title: "", path: "" }] }];
```

The display will look like this:

<table>
   <thead>
     <tr>
       <th>short</th>
       <th>long</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td rowSpan="3">1</td>
       <td>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</td>
     </tr>
     <tr>
       <td>BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</td>
     </tr>
     <tr>
       <td>CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC</td>
     </tr>
   </tbody>
</table>

**explain**

Special usage of `title` and `path` are used here. A `title` with an empty string does not occupy the grid of the header, and a `path` with an empty string extracts the complete data. Since the data is an array, extract the complete data inside the array instead.

#### Use `parseDataToSchema` to understand the usage of Schema

Some students may not know the usage of Schema at the beginning. At this time, you can use `parseDataToSchema` to derive the Schema and print it out on the console. The printed result can be adjusted to meet your needs.

```javascript
import { generateHTMLTable, parseDataToSchema } from "@yetrun/json-to-table";

const data = [
  //...
];

// View Schema
console.log(parseDataToSchema(data));

// Copy the Schema from the console and adjust it according to your needs
const schema = [
  //...
];

// Explicitly apply Schema and generate tables
generateHTMLTable(data, schema);
```

## contribute

You can submit a PR to improve this project, or clone the source code for secondary development. Here are the commands commonly used during development:

```bash
# run unit tests
$ yarn test

# build and package
$ yarn build
```

## License
