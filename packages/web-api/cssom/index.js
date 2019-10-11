
const style = document.createElement("style");
// Hack for old Webkit
style.appendChild(document.createTextNode(""));
document.head.appendChild(style);

style.sheet.addRule('#article-title', 'color: palevioletred;');

setTimeout(() => {
  const rules = style.sheet.cssRules;
  rules[0].style['color'] = 'green';
}, 3000);