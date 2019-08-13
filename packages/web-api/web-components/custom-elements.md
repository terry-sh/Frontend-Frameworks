# Web components

## define custom elements

Extending HTMLElement

```ts
class TodoItem extends HTMLElement {}

customElements.define('todo-item', TodoItem);

// in HTML docs
`<todo-item />`

// in scripts
document.createElement('todo-item');
new TodoItem(/* args of the constructor */);
```

Extending other built-in elements

```ts
class TodoItem extends HTMLLIElement {}
customElements.define('todo-item', TodoItem, { extends: "li" });

// in HTML
`<li is="todo-item" />`

// in scripts
customElements.create("li", { is: "todo-item" });
new TodoItem(/* args of the constructor */);

// if define use anonymous class, get the class:
// const TodoItemClass = customElements.get("todo-item");
```

**Attentions**

1. Not all built-in elements support `attachShadow`(ShadowDOM)

2. Not all html tags has correspondent HTML element class
   Elements identical to `HTMLElement` are one of the followings:
  
   abbr, address, article, aside, b, bdi, bdo, cite, code, dd, dfn, dt, em, figcaption, figure, footer, header, hgroup, i, kbd, main, mark, nav, noscript, rp, rt, ruby, s, samp, section, small, strong, sub, summary, sup, u, var, wbr
