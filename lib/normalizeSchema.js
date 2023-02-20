const isObject = require("lodash/isObject");
const isString = require("lodash/isString");
const difference = require("lodash/difference");

const allowedKeys = ["title", "path", "props", "meta"];

function normalizeSchema(schema) {
  if (Array.isArray(schema)) {
    return schema.map((schemaItem) => normalizeSchema(schemaItem));
  } else if (isObject(schema)) {
    const extraKeys = difference(Object.keys(schema), allowedKeys);
    if (extraKeys.length > 0) {
      throw new Error(`unknown schema key：${extraKeys.join(", ")}`);
    }

    if (!("path" in schema)) {
      throw new Error("schema 一 make sure to set `path` value");
    }

    if (!("title" in schema)) {
      schema = { title: schema.path, ...schema };
    }

    if ("props" in schema) {
      schema = { ...schema, props: normalizeSchema(schema.props) };
    }

    return schema;
  } else if (isString(schema)) {
    return { title: schema, path: schema };
  } else if (schema === undefined || schema === null) {
    return schema;
  } else {
    return schema.toString();
  }
}

module.exports = normalizeSchema;
