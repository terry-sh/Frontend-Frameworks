
const fs = require("fs");

async function load(mod, exports = {}) {
  try {
    const bytes = fs.readFileSync(mod);
    const module = await WebAssembly.compile(bytes);
    const instance = await WebAssembly.instantiate(module, exports);
    return instance;
  } catch (error) {
    //
  }
}

module.exports.load = load;
