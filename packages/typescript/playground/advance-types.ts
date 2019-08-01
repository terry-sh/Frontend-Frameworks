type MapTupleType<T> = {
  [K in keyof T]: 0 extends T[K] ? "number" : "" extends T[K] ? "string" : "unkown"
};

type SomeTuple = [number, string];
type MappedTuple = MapTupleType<SomeTuple>;

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
  return value as any;
}

// try to do something like:
// type X = GenericReturnType<typeof getSomething, number>; // boolean