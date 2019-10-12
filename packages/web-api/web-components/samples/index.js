const sheet = new CSSStyleSheet();
sheet.replaceSync(
`:host { display: block; background-color: black; color: white; padding: 0.5em; }
h1 { font-size: 1.4rem; }
p { font-size: 1.2rem; }`
);

window.customElements.define(
  "book-item",
  class extends HTMLElement {
    constructor(props) {
      super(props);
      const shadow = this.attachShadow({ mode: "closed" });

      const title = document.createElement("h1");
      const content = document.createElement("p");

      if (this.hasAttribute("title")) {
        title.innerText = this.getAttribute("title");
      }
      if (this.hasAttribute("content")) {
        content.innerText = this.getAttribute("content");
      }

      shadow.appendChild(title);
      shadow.appendChild(content);
      shadow.adoptedStyleSheets = [sheet];
    }
  }
);

setTimeout(() => {
  sheet.rules[0].styleMap.set("background-color", "firebrick");
}, 2000);
