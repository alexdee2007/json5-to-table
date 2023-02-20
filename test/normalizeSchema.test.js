const test = require("ava");
const normalizeSchema = require("../lib/normalizeSchema");

test("make the schema to normalize schema", (t) => {
  const schema = ["a", { path: "b.c" }, { title: "D", path: "d", props: ["d1", { path: "d2" }] }];

  const normalizedSchema = normalizeSchema(schema);
  t.deepEqual(normalizedSchema, [
    { title: "a", path: "a" },
    { title: "b.c", path: "b.c" },
    {
      title: "D",
      path: "d",
      props: [
        { title: "d1", path: "d1" },
        { title: "d2", path: "d2" }
      ]
    }
  ]);
});
