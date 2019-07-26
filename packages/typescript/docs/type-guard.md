# Type Guard

## Fundamental

  1. `instanceof`

  2. `typeof`

## Edge case

  1. `assert`

      see:
      - [[Proposal] Type assertion statement (type cast) at block-scope level #10421](https://github.com/microsoft/TypeScript/issues/10421)
      - [Control flow based type narrowing for assert(...) calls #8655](https://github.com/microsoft/TypeScript/issues/8655)

  2. `switch / case` statement

  ```ts
  function onlyOneElementIsSubstantial<T>() {
    /* something here... */
    return [/*....*/] as [T|undefined, T|undefined]
  }

  let [x, y] = onlyOneElementIsSubstantial();

  switch(true) {
    case !!x:
      // x is suppose to be substantial(not undefiend)
      break;
    case !!y:
      break;
  }
  ```
