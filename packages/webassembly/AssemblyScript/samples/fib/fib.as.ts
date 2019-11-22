
export function fib(n: u32): u32 {
  let a: u32 = 0;
  let b: u32 = 1;
  for (let i: u32 = 0; i < n; i++) {
    let t = a + b;
    a = b;
    b = t;
  }
  return b;
}
