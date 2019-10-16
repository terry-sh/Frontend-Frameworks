const sheet = new CSSStyleSheet();
sheet.replaceSync(`:host {
  --color-primary: black;
  --color-secondary: gray;
  --color-background: rgb(240,240,240);
  display: block;
  background-color: var(--color-background);
  padding: 0.5em;
}
h1 { font-size: 1.4rem; color: var(--color-primary); }
p { font-size: 1.1rem; color: var(--color-secondary); }`);

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
      this.classList.add("book-item");
    }
  }
);

setTimeout(() => {
  sheet.rules[0].styleMap.set("--color-primary", "white");
  sheet.rules[0].styleMap.set("--color-secondary", "rgb(240,240,240)");
  sheet.rules[0].styleMap.set("--color-background", "firebrick");
}, 2000);
