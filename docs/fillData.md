# fillData function

## Function definition

```javascript
function fillData(data, schema, matrixView)
```

This function fills `data` into `matrixView` according to the pattern specified by `schema`. `schemaObject` is an object or array of objects of the following types:

- `{ title: 'A', path: 'a' }`
- `{ title: 'A', path: 'nested.a' }`
- `{ title: 'Nested', path: 'nested', props: [ ... ] }`

## Data Compatibility

Since customer data is varied and even non-standard, "compatibility" is the priority of this function.

First, we state that this function does not check whether the `matrixView` is out of bounds.

Compatibility considerations are highly tolerant of data. Even if the data is somewhat irregular, we still hope that the data can be filled in reasonably. The basic format of `schema` is `{ title: 'title', path: 'key' }`, from here on, the main considerations covering compatibility are:

1. `path` cannot fetch data or the fetched data is `undefined`. example:

   - `object = null, path = 'a'`: use property extraction on `null` or `undefined`.
   - `object = { b: 1, c: 2 }, path = 'a'`: attribute `a` does not exist, the extracted attribute value is `undefined`.
   - `object = { b: 1, c: 2 }, path = 'a.a1'`: Since the attribute `a` does not exist, continuous fetching of attributes will fail.

2. `object` can be either an object or an array.

For compatibility issue 1, our unified strategy is: as long as `schema` is defined, there must be at least one set of data filled, and the filled content is `undefined`. This means, `null`,` undefined`, basic type values (such as `1`, `"x"`), empty object `{}`, empty array `[]`, etc. can all be filled with single-line blanks.

For compatibility issue 2, our unified treatment strategy is: treat it as an array uniformly, and treat objects as a special case of an array containing only one element.

## Padding strategy

The strategy of equal share and exhaustion is adopted when filling. The so-called equal distribution means that the number of rows occupied by each data is the same; the so-called exhaustion means that the number of rows is occupied as much as possible. For example, there are two data and eight rows, and the number of rows occupied is:

- Data 1: Occupies three lines
- Data 2: Occupies three lines
- For the remaining two rows, merge the cells into a blank whole
