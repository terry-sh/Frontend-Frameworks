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

class StyleDelegate {
  constructor(rules) {
    const style = document.createElement("style");
    // Hack for old Webkit
    // style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);

    const indexMap = Object.keys(rules).reduce((map, key, index) => {
      const rule = rules[key];
      const selector = rule[0];
      const content = Object.keys(rule[1])
        .map(key => `${key}:${rule[1][key]}`)
        .join(";");
      style.sheet.insertRule(`${selector} {${content}}`, index);
      map.set(key, index);
      return map;
    }, new Map());

    this.css = new Proxy(
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
  }
}

const style = new StyleDelegate({
  title: ["#article-title", { color: "palevioletred" }],
  highlight: [".highlight", { "text-decoration": "underline" }],
  paragraph: ["p", { "font-size": "1.4rem" }], // CSS.rem(1.4)
  emoji: [".emoji", { color: "white" }]
});

setTimeout(() => {
  style.css.title.set("color", "cadetblue").set("text-align", "center");
  style.css.paragraph.set("text-align", "center"); // CSS.em(2)

  style.css.highlight.set("color", "darkorchid");
  style.css.emoji.set("color", "skyblue");
}, 3000);
