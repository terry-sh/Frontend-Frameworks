#!/usr/bin/env node
const { load } = require('./__load');

// Constant
(async () => {
  const lib = await load("./table.wasm");

  const tbl = lib.exports.tbl;
  console.log(tbl.get(0)());
  console.log(tbl.get(1)());
})();