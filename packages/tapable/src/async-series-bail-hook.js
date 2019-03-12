const { AsyncSeriesBailHook } = require("tapable");

const timer = new AsyncSeriesBailHook(["args"]);

timer.tapAsync("timout 1", (args, done) => {
  setTimeout(() => {
    console.log("timeout 1:", args);
    done();
  }, 2000);
});

timer.tapAsync("timout 2", (args, done) => {
  setTimeout(() => {
    console.log("timeout 2:", args);
    done(true);
  }, 3000);
});

timer.tapAsync("timout 3", (args, done) => {
  setTimeout(() => {
    console.log("timeout 2:", args);
    done();
  }, 4000);
});

timer.tapAsync("timout 4", (args, done) => {
  setTimeout(() => {
    console.log("timeout 2:", args);
    done();
  }, 5000);
});

console.time('test');
timer.callAsync('timer', () => {
  console.timeEnd('test'); // 5 seconds
});
