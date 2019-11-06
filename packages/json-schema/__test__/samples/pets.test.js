const Ajv = require("ajv");

describe("pets schema", () => {
  const ajv = new Ajv();
  const schema = require("./pets.schema.json.js");
  const validate = ajv.compile(schema);
  
  test("test pets-01.json", () => {
    const file01 = require("./pets-01.json.js");
    const valid = validate(file01);
    expect(!!valid).toBe(true);
    console.log(valid);
  });
});
