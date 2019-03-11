const { SyncHook } = require("tapable");

const cat = new SyncHook(["fish"]);

const eat = (part, ...args) =>
  console.log.call(null, `(cat eat ${part} of)`, ...args);

cat.tap("eat head", (fish, fish2) => {
  eat("head", fish, fish2);
  if (fish === "tuna") {
    throw new Error("I don't eat tuna head!");
  }
  // `fish2` won't be taken because the cat take one fish only!
});

cat.tap("eat body", fish => {
  eat("body", fish);
});

cat.tap("eat tail", fish => {
  eat("tail", fish);
});

cat.call("carp", "tuna");

console.log();
try {
  cat.call("tuna");
} catch (error) {
  console.log(`Cat cries: "${error.message}", and lies down dead.`);
}

console.log();
cat.tap("eat bone", fish => {
  eat("bone", fish);
});
cat.call("catfish");
