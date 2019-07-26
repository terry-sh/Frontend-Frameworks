# Advance types

## Intersection Types

## Union Types

## Advance Types Conversions

### union to union

### tuple to tuple

```ts
type MapTuple<T> = {
  [K in keyof T]: T[K]; // do something...
}
```

### union to tuple

### tuple to union

```ts
type Tuple = ['a' | 1];

type Union = Tuple[number];
```

### union to intersection

 see: [transform-union-type-to-intersection-type](https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type)