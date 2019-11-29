(module
  (func $int_13 (result i32) (i32.const 13))
  (func $int_42 (result i32) (i32.const 42))

  (table (export "tbl") anyfunc (elem $int_13 $int_42))
)