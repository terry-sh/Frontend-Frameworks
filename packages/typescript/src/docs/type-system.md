# Typescript 的类型系统

## 类型系统的分类

类型系统主要分为两类，nominal 和 structural。TypeScript 属于 structural type（注意和 duck type 的区别），Java、Swift 等属于 nominal type。

```ts
class A {
  constructor(public a: string) {};
}

class B {
  constructor(public a: string) {};
}

let x: B = new A(''); // passed
let y: A = new B(''); // passed
```

```c++
class A {};
class B {};

A x = new B(); // failed
```
