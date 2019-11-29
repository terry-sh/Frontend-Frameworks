(module 
  (global $id i32 (i32.const 0))
  (export "id" (global $id))

  (global (export "next_year") i32 (i32.const 2020))
)