#!/usr/bin/env node
const { load } = require('./__load');

// Constant
(async () => {
  const lib = await load("./bridge.wasm", {
    console: {
      log: arg => {
        console.log("Call JavaScript from Wasm: console.log", "\x1b[36m" + arg + "\x1b[0m");
      }
    },
    math: {
      add: (a, b) => {
        return lib.exports.add(a, b);
      }
    }
  });
  lib.exports.log_i();
  lib.exports.log_j();

  lib.exports.log_any(3344);
  // arguments more than wanted
  lib.exports.log_any(3344, 12);
  
  console.log('\n[arguments type mismatch]');

  console.log('\nlog:string');
  lib.exports.log_any('string');
  lib.exports.log_any('123');
  lib.exports.log_any('0x123');

  console.log('\nlog:object');
  lib.exports.log_any({});
  lib.exports.log_any({ name: 'WebAssembly' });
  lib.exports.log_any([]);
  lib.exports.log_any([1, 2, 3]);

  console.log('\nlog:boolean');
  lib.exports.log_any(true);
  lib.exports.log_any(false);

  console.log('\nlog:symbol');
  try {
    lib.exports.log_any(Symbol('fake'));
  } catch (error) {
    console.log('invalid args type Symbol')
  }

  console.log("\nimport & export");
  console.log(lib.exports.call_add(1, 2.4));
})();