# Advance types

## Intersection Types

## Union Types

## Built-in Advance Types

### `ReturnType`

```ts
function getName(): string {}

type NameType = ReturnType<typeof getName>; // string
```

**ReturnType of Generic Functions**

Currently it is impossible to do the trick for all cases.

For more information, see:

  - [Typescript ReturnType of generic function](https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function)

  - [TypeScript: Is it possible to get the return type of a generic function?](https://stackoverflow.com/questions/52963637/typescript-is-it-possible-to-get-the-return-type-of-a-generic-function)

  - [https://github.com/Microsoft/TypeScript/issues/6606](https://github.com/Microsoft/TypeScript/issues/6606)

```ts
function getSomething<T>(
  value: T
): T extends string
  ? number
  : T extends number
  ? boolean
  : T extends boolean
  ? symbol
  : T extends symbol
  ? string
  : any
{
  //
}

// try to do something like:
type X = GenericReturnType<typeof getSomething, number>; // boolean
```

## Advance Types Conversions

The status of advance types conversions:

|              |   Union  |  Intersection  |  Tuple  |
|--------------|----------|----------------|---------|
| Union        |   yes    |                |   yes   |
| Intersection |   yes    |                |         |
| Tuple        |   no     |                |   yes   |

### Union to Union

```ts
type V = U extends any ? U /* or something that manipulates U */ : never; 
```

For more information, see:

- [TypeScript: Map union type to another union type](https://stackoverflow.com/questions/51691235/typescript-map-union-type-to-another-union-type)

### Union to Intersection

```ts
type UnionToIntersection<T> =
  (T extends any ? ((p: T)=> void): never) extends (p: infer U)=> void ? U : never;
```

For more information, see:

  - [Transform union type to intersection type](https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type)

  - [Future proof union to intersection type conversion #29594](https://github.com/Microsoft/TypeScript/issues/29594)

### Union to Tuple

For more information, see:

- [Type manipulations: union to tuple #13298](https://github.com/microsoft/TypeScript/issues/13298)

### Intersection to Union

### Intersection to Intersection

### Intersection to Tuple

### Tuple to Union

```ts
type Tuple = ['a' | 1];

type Union = Tuple[number];
```

### Tuple to Intersection

### Tuple to Tuple

```ts
type MapTuple<T> = {
  [K in keyof T]: T[K]; // do something...
}
```