const { SyncWaterfallHook } = require("tapable");

const operator = new SyncWaterfallHook(['operand']);

operator.tap('add 1', (a) => {
  a = a + 1;
  console.log(a);
  return a;
});

operator.tap('[fake] multiply 2', (a) => {
  a *= 2;
  console.log(a);
});

operator.tap('multiply 2', (a) => {
  a *= 2;
  console.log(a);
  return a;
});

operator.tap('minus 2', (a) => {
  a -= 2;
  console.log(a);
  return a;
});

operator.call(1);
console.log();
operator.call(2);
