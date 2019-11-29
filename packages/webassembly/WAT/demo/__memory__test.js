#!/usr/bin/env node
const { load } = require("./__load");

// Constant
(async () => {
  const instance = await load("./memory.wasm");
  instance.exports.set_memory(0, 11);
  instance.exports.set_memory(4, 22);
  // 11 -> 00001011
  // 22 -> 00010110

  const i = instance.exports.get_memory(0);
  const j = instance.exports.get_memory(4);
  console.log(i);
  console.log(j);

  const mem = instance.exports.mem;
  const mem32 = new Uint32Array(mem.buffer, 0, 2);
  console.log("mem32", mem32[0], mem32[1]);

  const mem16 = new Uint16Array(mem.buffer, 0, 4);
  console.log("mem16", mem16[0], mem16[2]);

  const mem8 = new Uint8Array(mem.buffer, 0, 8);
  console.log("mem8", mem8[0], mem8[4]);

  const i_j = parseInt(toBinary(22) + toBinary(11), 2);
  console.log(i_j);
})();

const toBinary = i => fill(i.toString(2));
const fill = (v, size = 8) =>
  (v.length < size
    ? [...Array(size - v.length).fill(0), ...v.split("")]
    : v.split("").filter((_, i) => i < size)
  ).join("");
