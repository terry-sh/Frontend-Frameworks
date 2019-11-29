#!/usr/bin/env node

const { load } = require('./__load');

(async () => {
  const instance = await load("./add.wasm")
  const add = instance.exports.add;
  console.log(add(3, 4));
})();
