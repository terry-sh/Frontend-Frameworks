const { MultiHook, SyncHook } = require("tapable");

const jack = new SyncHook(['task']);
const smith = new SyncHook(['task']);

const allStaff = new MultiHook([jack, smith]);

allStaff.tap('order', (task) => {
  console.log(task);
});

jack.call('serving');
smith.call('teaching');