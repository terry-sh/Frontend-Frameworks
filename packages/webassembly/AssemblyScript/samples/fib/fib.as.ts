
export function fib(n: i32): i32 {
  let a: i32 = 0;
  let b: i32 = 1;
  for (let i: i32 = 0; i < n; i++) {
    let t = a + b;
    a = b;
    b = t;
  }
  return b;
}
