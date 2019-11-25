(module 
  (import "console" "log" (func $log (param i32)))
  (func (export "log_i") i32.const 10 call $log)
)