const { SyncLoopHook } = require("tapable");

function range(times, cb) {
  const forHook = new SyncLoopHook();

  let i = 0;
  forHook.tap('call', () => {
    if (i === times) {
      return /* undefined */;
    } else {
      cb(i);
      i++;
      return true;
    }
  });

  forHook.call();
}

range(3, (i) => console.log('loop', i));
