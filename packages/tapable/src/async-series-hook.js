const { AsyncSeriesHook } = require("tapable");

const timer = new AsyncSeriesHook(["args"]);

timer.tapAsync("timout 1", (args, done) => {
  setTimeout(() => {
    console.log("timeout 1:", args);
    done();
  }, 2000);
});

timer.tapAsync("timout 2", (args, done) => {
  setTimeout(() => {
    console.log("timeout 2:", args);
    done();
  }, 3000);
});

console.time('test');
timer.callAsync('timer', () => {
  console.timeEnd('test'); // 5 seconds
});
