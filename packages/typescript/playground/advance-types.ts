namespace generic_return_type {
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
    : any {
    return value as any;
  }

  // try to do something like:
  // type X = GenericReturnType<typeof getSomething, number>; // boolean
}

namespace advance_test {
  type A = "name" | "age";
  type B = "gender" | "name";

  type A_And_B = A & B;
  type A_Or_B = A | B;
  type B_Or_A = B | A;
}

// Union to Union
namespace union_to_union {
  type ToType<T> = T extends 1
    ? number
    : T extends 2
    ? boolean
    : T extends 3
    ? string
    : T extends 4
    ? symbol
    : T extends 5
    ? object
    : never;

  type TypeEnumUnion = 2 | 3 | 4;
  type TypeUnion = TypeEnumUnion extends any ? ToType<TypeEnumUnion> : never;
  // TypeUnion = string | boolean | symbol
}

namespace union_to_interception {
  // prettier-ignore
  type U2I<T> = 
     (T extends any ? ((p: T) => void) : never) extends (p: infer U) => void
    ? U
    : never;
}

namespace union_to_tuple {}

namespace intersection_to_union {
  // TODO: can you do some tricks?
  type I2U<T> = T;

  type I = 1 & 2 & 3;
  type U = I2U<I>;
}

namespace intersection_to_intersection {}

namespace intersection_to_tuple {}

namespace tuple_to_union {
  type Tuple = ["a" | 1];

  type Union = Tuple[number];
}

namespace tuple_to_intersection {}

namespace tuple_to_tuple {
  type MapTupleType<T> = {
    [K in keyof T]: 0 extends T[K] ? "number" : "" extends T[K] ? "string" : "unkown"
  };

  type SomeTuple = [number, string];
  type MappedTuple = MapTupleType<SomeTuple>;
}
