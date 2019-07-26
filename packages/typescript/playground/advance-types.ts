
type MapTupleType<T> = {
  [K in keyof T]: 0 extends T[K] ? 'number': '' extends T[K] ? 'string': 'unkown';
}

type SomeTuple = [number, string];
type MappedTuple = MapTupleType<SomeTuple>;
