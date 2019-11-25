(module
  (func $fib (param $n f64) (result f64)
    (local $a f64)
    (local $b f64)
    (local $t f64)
    (local $i f64)
    (local.set $a (f64.const 0))
    (local.set $b (f64.const 1))
    (block 
      (local.set $i (f64.const 0))
      (loop 
        (br_if 1 (f64.eq (local.get $i) (local.get $n)))
        (local.set $t (f64.add (local.get $a) (local.get $b)))
        (local.set $a (local.get $b))
        (local.set $b (local.get $t))
        (local.set $i (f64.add (local.get $i) (f64.const 1)))
        (br 0)
      )
    )
    (local.get $b)
  )

  (export "fib" (func $fib))
)