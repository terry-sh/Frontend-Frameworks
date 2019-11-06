const Ajv = require("ajv");

describe("pets schema", () => {
  const ajv = new Ajv();
  const schema = require("./samples/pets.schema.json");
  const validate = ajv.compile(schema);
  
  test("test pets-01.json", () => {
    const file01 = require("./samples/pets-01.json");
    const valid = validate(file01);
    expect(!!valid).toBe(true);
  });
});
