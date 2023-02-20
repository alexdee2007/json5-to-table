# fillSchema function

## Function definition

```javascript
function fillSchema(schemaObject, matrixView)
```

This function **fills** the schema specified by the `schemaObject` into the `matrixView`. `schemaObject` is an object or array of objects of the following types:

- `{ title: 'A', path: 'a' }`
- `{ title: 'A', path: 'nested.a' }`
- `{ title: 'Nested', path: 'nested', props: [ ... ] }`

## Padding strategy

When filling, adopt the strategy of ensuring exhaustion and sharing as much as possible. For example, the existing schema object is `{ title: 'A', props: [ { title: 'B', title: 'C' } ] }`, and it wants to occupy three lines, then the occupancy is as follows:

- `A`: occupies two lines
- `B`, `C`: Occupy a line
