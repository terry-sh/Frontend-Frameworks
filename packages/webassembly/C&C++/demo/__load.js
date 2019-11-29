const fs = require("fs");

async function load(mod) {
  try {
    const bytes = fs.readFileSync(mod);
    const module = await WebAssembly.compile(bytes);
    const instance = await WebAssembly.instantiate(module);
    return instance;
  } catch (error) {
    console.log(error);
  }
}

module.exports.load = load;
