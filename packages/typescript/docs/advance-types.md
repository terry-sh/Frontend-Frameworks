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

### Union to Union

### Tuple to Tuple

```ts
type MapTuple<T> = {
  [K in keyof T]: T[K]; // do something...
}
```

### Union to Tuple

### Tuple to Union

```ts
type Tuple = ['a' | 1];

type Union = Tuple[number];
```

### Union to Intersection

```ts
type UnionToIntersection<T> =
  (T extends any ? ((p: T)=> void): never) extends (p: infer U)=> void ? U: never;
```

 see: [transform-union-type-to-intersection-type](https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type)