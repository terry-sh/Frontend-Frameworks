const { HookMap, SyncHook } = require("tapable");

const ranking = new HookMap(() => new SyncHook(["name"]));

ranking.for("first").tap("1st", name => {
  console.log("1", name);
});
ranking.for("second").tap("2nd", name => {
  console.log("2", name);
});

ranking.get("first").call("Yellow River");
ranking.get("second").call("Yangtz River");

ranking.get("first").call("Himalaya");
ranking.get("second").call("K12");