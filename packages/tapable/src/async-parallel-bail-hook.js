const { AsyncParallelBailHook } = require("tapable");

const timer = new AsyncParallelBailHook(["args"]);

for (let i = 1; i <= 4; i++) {
  timer.tapAsync("timout " + i, (args, done) => {
    const r = Math.random() * 6;
    const time = r >= 2 ? r : r + 2;

    if (r >= 4) {
      console.log(`${i} runs with error with long time ${r.toFixed(2)}`);
      done("stop");
    } else {
      console.log(`${i} has runned.`);
    }

    setTimeout(() => {
      console.log(`timeout ${i} with ${time.toFixed(2)} seconds:`, args);
      done();
    }, time * 1000);
  });
}

console.time("test");
timer.callAsync("test", () => {
  console.log("test finished.");
  console.timeEnd("test"); // 3 seconds
});
