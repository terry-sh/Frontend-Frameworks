# WAT

## `Wabt` toolkits

Installation: For macOS users, use `brew install wabt`.

Examples:
```bash
wat2wasm demo.wat -o demo.wasm
```

## Instructions

* type
  - i32
  - i64
  - f32
  - f64
  - `type`.const

* memory related
  - memory
  - `type`.store
  - `type`.load

* table
  - table
  - elem
  - asynfunc
  - mut

## Pitfalls

- `i64` cause type signature error in JavaScript call

## References

- [WAT Spec](https://webassembly.github.io/spec/core/text/index.html)
- [github/wabt](https://github.com/WebAssembly/wabt)
- [wat2wasm-docs](https://webassembly.github.io/wabt/doc/wat2wasm.1.html)
- [WAT Official Samples](https://github.com/WebAssembly/testsuite)

## Samples

- [mdn/webassembly-examples](https://github.com/mdn/webassembly-examples)
- [game-of-life/wat](https://github.com/ColinEberhardt/wasm-game-of-life)
