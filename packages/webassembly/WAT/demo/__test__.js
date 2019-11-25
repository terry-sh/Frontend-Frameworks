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
  console.log(
    "fib",
    Array(10)
      .fill(0)
      .map((_, i) => instance.exports.fib(i))
  );
})();


(async () => {
  const instance = await load("./fac.wasm");
  console.log(
    "fac",
    Array(10)
      .fill(0)
      .map((_, i) => instance.exports.fac(i))
  );
})();