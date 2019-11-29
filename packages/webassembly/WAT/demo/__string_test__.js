#!/usr/bin/env node

const { load } = require('./__load');

(async () => {
  const lib = await load("./string.wasm");
  
  lib.exports.hello_word();

  const buff = new Uint8Array(lib.exports.mem.buffer, 0, 12);
  const utf8decoder = new TextDecoder();

  const hello = utf8decoder.decode(buff);
  console.log(hello);
})();
