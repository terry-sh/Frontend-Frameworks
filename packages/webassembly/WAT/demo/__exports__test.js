#!/usr/bin/env node
const { load } = require('./__load');

// Constant
(async () => {
  const instance = await load("./exports.wasm");

  console.log('id =', instance.exports.id.value);
  console.log('next year =', instance.exports.next_year.value);
})();