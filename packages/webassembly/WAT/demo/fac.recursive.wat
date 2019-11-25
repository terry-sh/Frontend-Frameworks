(module
  (func $fac (param f64) (result f64)
    (f64.lt (get_local 0) (f64.const 1))
    if (result f64)
      f64.const 1
    else
      (f64.mul
        (get_local 0)
        (call $fac (f64.sub (get_local 0) (f64.const 1)))
      )
    end)
  (export "fac" (func $fac)))