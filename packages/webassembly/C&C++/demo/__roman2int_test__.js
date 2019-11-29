#!/usr/bin/env node

(async () => {
  const Module = require("./roman2int.bridge.js");

  Module.onRuntimeInitialized = () => {
    const toInt = Module.cwrap("romanToInt", "number", ["string"]);
  
    console.log(toInt("X"));
    console.log(toInt("V"));
    console.log(toInt("LVIII")); // 58
  };
})();
