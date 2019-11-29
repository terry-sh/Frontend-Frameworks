(module 
  (import "console" "log" (func $log (param i32)))
  (import "math" "add" (func $add (param f64 f64) (result f64)))

  (func (export "log_i") i32.const 2019 call $log)
  (func (export "log_j") (call $log (i32.const 2020)))
  (func (export "log_any") (param $n i32)
    (call $log (local.get $n))
  )

  ;; calls `add` imported from JavaScript
  ;; which calls `add` export from Wasm
  (func (export "call_add") (param f64 f64) (result f64)
    (call $add (local.get 0) (local.get 1)))

  (func (export "add") (param f64 f64) (result f64)
    (f64.add (local.get 0) (local.get 1)))
)