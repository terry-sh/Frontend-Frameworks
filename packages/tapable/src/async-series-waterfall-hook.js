const { AsyncSeriesWaterfallHook } = require("tapable");

const timer = new AsyncSeriesWaterfallHook(["args"]);

for (let i = 1; i <= 4; i++) {
  const label = `timout ${i}`;
  /*
  timer.tapPromise(label, args => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(label, ', args =',args);
        resolve(i);
      }, 1000);
    });
  });
  */

  timer.tapAsync(label, function (args, done) {
    setTimeout(() => {
      console.log(label, ', args =', args);
      done(null, i);
    }, 1000);
  });
}

console.time("test");
timer.callAsync(0, () => {
  console.timeEnd("test"); // 5 seconds
});
