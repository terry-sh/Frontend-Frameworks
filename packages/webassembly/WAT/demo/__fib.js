

const fib_js = (n) => {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    let t = a + b;
    a = b;
    b = t;
  }
  return b;
}

module.exports.fib_js = fib_js;