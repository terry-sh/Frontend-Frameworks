function load(mod) {
  const loader = WebAssembly.instantiateStreaming(fetch(mod), {
    env: {
      memory: new WebAssembly.Memory({
        initial: 256
      }),
      table: new WebAssembly.Table({
        initial: 0,
        element: "anyfunc"
      }),
      abort: () => null
    },

    // imported methods
    console: {
      log: arg => {
        console.log("Call JavaScript console.log from Wasm: %c" + arg, "color: violet; background-color: #fff;");
      }
    }
  });
  return new Promise((resolve, reject) => {
    loader
      .then(result => {
        resolve(result.instance.exports);
      })
      .catch(error => {
        reject(error);
      });
  });
}

load("./add.wasm").then(exports => {
  const a = Math.floor(Math.random() * 80);
  const b = Math.floor(Math.random() * 120);
  console.log(`add(${a}, ${b}) = `, exports.add(a, b));
});

load("./fac.wasm").then(exports => {
  const list = Array(10)
    .fill(0)
    .map((_, i) => exports.fac(i));
  console.log("fac(1...10) = ", list);
});

load("./fib.wasm").then(exports => {
  const list = Array(10)
    .fill(0)
    .map((_, i) => exports.fib(i));
  console.log("fib", list);
});

load("./bridge.wasm").then(exports => {
  exports.log_i();
});
