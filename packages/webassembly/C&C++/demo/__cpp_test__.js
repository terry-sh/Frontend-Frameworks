
(() => {
  const Module = require("./cat.bridge.js");
  Module.onRuntimeInitialized = function() {
    const cat = new Module.Cat("Kitty");
    console.log("Hi, I'am", cat.greet());
  };
})();

(() => {
  const Module = require("./dog.bridge.js");
  Module.onRuntimeInitialized = function() {
    const dog = new Module.Dog(1);
    console.log("I'am", dog.isOld() ? "Old" : "Young");
  };
})();