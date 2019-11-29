#!/usr/bin/env node

const fs = require("fs");
async function load(mod) {
  try {
    const bytes = fs.readFileSync(mod);
    const module = await WebAssembly.compile(bytes);
    const instance = await WebAssembly.instantiate(module);
    return instance;
  } catch (error) {
    //
  }
}

(async () => {
  const instance = await load("./fib.wasm");

  const fibonacci = instance.exports.fib;
  for (let i = 0; i < 10; i++) {
    console.log("fib(" + i + ") = ", fibonacci(i));
  }
})();

(async () => {
  const instance = await load("./string.wasm");
  const name = instance.exports.name;
  console.log("name =", instance.exports)
})();
