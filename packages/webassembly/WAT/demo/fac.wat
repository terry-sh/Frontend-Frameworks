(module
  (func $fac (param $n f64) (result f64)
    (local $x f64)
    (f64.lt (local.get $n) (f64.const 1))
    if (result f64)
      f64.const 1
    else
      (block 
        (local.set $x (f64.const 1))
        (loop 
          (local.set $x (f64.mul (local.get $n) (local.get $x)))
          (local.set $n (f64.sub (local.get $n) (f64.const 1)))
          (br_if 1 (f64.eq (local.get $n) (f64.const 0)))
          (br 0)
        )
      )
      (local.get $x)
    end)

  (export "fac" (func $fac))
)