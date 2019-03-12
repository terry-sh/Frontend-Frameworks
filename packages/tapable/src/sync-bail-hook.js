const { SyncBailHook } = require("tapable");

const UNVote = new SyncBailHook(["event"]);
const Nations = [
  {
    name: "USA",
    sayNo: ["StopWars"]
  },
  {
    name: "Russia",
    sayNo: ["Crimea"]
  },
  {
    name: "China",
    sayNo: ["NorthKorea", "SouthChinaSea"]
  },
  {
    name: "UK",
    sayNo: ["IslasMalvinas", "FalklandIslands"]
  },
  {
    name: "Spain"
  },
  {
    name: "SaudiArabia"
  },
  {
    name: "India"
  },
  {
    name: "Japan"
  },
  {
    name: "SouthKorea"
  },
];

Nations.forEach(nation => {
  const { sayNo, name } = nation;
  UNVote.tap(name, event => {
    if (sayNo) {
      if (sayNo.indexOf(event) >= 0) {
        console.log(name, "is unhappy.");
        return true;
      } else {
        console.log(name, "votes for", event, "in affirmative happily.");
      }
    } else {
      console.log(name, "votes for whatever.");
    }
  });
});

console.log("\nRound 1:");
UNVote.call("StopWars");

console.log("\nRound 2:");
UNVote.call("Crimea");

console.log("\nRound 3:");
UNVote.call("NorthKorea");

console.log("\nRound 4:");
UNVote.call("FalklandIslands");

console.log("\nRound 5:");
UNVote.call("AfricaFamine");