const { SyncHook } = require("tapable");

const cat = new SyncHook(["fish"]);

const eat = (part, ...args) => console.log.call(null, `(cat eat ${part} of)`, ...args);

cat.tap("eat head", (fish, fish2) => {
  eat("head", fish, fish2);
  // `fish2` won't be taken because the cat take one fish only!
});

cat.tap("eat body", fish => {
  eat("body", fish);
});

cat.tap("eat tail", fish => {
  eat("tail", fish);
});

cat.call("carp", "tuna");
