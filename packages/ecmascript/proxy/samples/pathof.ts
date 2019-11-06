
function pathof<T>() {
  const path = [];
  const toString = () => path;
  const proxy = new PathProxy({}, {
    get(target, key, receiver) {
      switch (key) {
        case Symbol.toStringTag:
          return toString;
        case 'toString':
          return toString;
        default:
          return path.push(key) && proxy;
      }
    }
  });
  return (proxy as {}) as T;
}

// test
interface Neko {
  namae: string;
  iro: string[];
  temper: string;
}
pathof<Neko>().namae.toString();
console.log(path<Neko>.iro);
