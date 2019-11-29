#!/usr/bin/env node

const { load } = require('./__load');

(async () => {
  const instance = await load("./fib.wasm");
  const fib_js = require("./__fib").fib_js;
  const times = 100;

  console.time("js:fib");
  for (let i = 0; i < times; i++) {
    fib_js(1000);
  }
  console.timeEnd("js:fib");

  console.time("wasm:fib");
  const fib_wasm = instance.exports.fib;
  for (let i = 0; i < times; i++) {
    fib_wasm(1000);
  }
  console.timeEnd("wasm:fib");
})();
