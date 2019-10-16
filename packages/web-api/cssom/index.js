function createRuleSettingChain(rule) {
  const set = (...args) => {
    if (rule.styleMap) {
      // CSS Typed OM, for Chrome only
      rule.styleMap.set(...args);
    } else {
      // CSSOM, for other browsers
      rule.style[args[0]] = args[1];
    }
    return chain;
  };

  const chain = new Proxy(
    {},
    {
      get(_, key) {
        switch (key) {
          case "set":
            return set;
        }
      }
    }
  );

  return chain;
}

function ruleToText(rule) {
  return Object.entries(rule)
    .map(([prop, value]) => `${prop}:${value}`)
    .join(";");
}

function createStyle(rules) {
  const style = document.createElement("style");
  // Hack for old Webkit
  // style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);

  const indexMap = Object.entries(rules).reduce(
    (map, [key, [selector, rule]], index) => {
      style.sheet.insertRule(`${selector} {${ruleToText(rule)}}`, index);
      map.set(key, index);
      return map;
    },
    new Map()
  );

  const css = new Proxy(
    {},
    {
      get(_, key) {
        const index = indexMap.get(key);
        if (index !== null) {
          const rule = style.sheet.cssRules[index];
          if (rule) {
            return createRuleSettingChain(rule);
          }
        }
        return null;
      }
    }
  );
  return css;
}

const style = createStyle({
  title: ["#article-title", { color: "palevioletred" }],
  highlight: [".highlight", { "text-decoration": "underline" }],
  paragraph: ["p", { "font-size": "1.4rem" }], // CSS.rem(1.4)
  emoji: [".emoji", { color: "white" }]
});

setTimeout(() => {
  style.title.set("color", "cadetblue").set("text-align", "center");
  style.paragraph.set("text-align", "center"); // CSS.em(2)

  style.highlight.set("color", "darkorchid");
  style.emoji.set("color", "skyblue");
}, 3000);
