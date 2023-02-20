# Summary of the rules for extracting attribute values from path

## data

There are three types of data, Object, Array, and Nil. Among them, basic data types such as Number and String belong to Object, and Null and Undefined belong to Nil.

When extracting attributes, when an object is encountered, it is extracted from the object, and when an array is encountered, elements are extracted from the array. If Null or Undefined is encountered, the extraction is terminated early and undefined is returned. This library does not distinguish between Object and Array, and always treats Object as an array containing only one element.

## path

When generating a table from an object, the path rules are as follows:

- `''`: an empty path value extracts the full object `object`;
- `'a'`: Extract the object's attribute `object.a`;
- `'a.b.c'`: deep recursive extraction of object properties `object.a.b.c`, which can handle arrays well.
