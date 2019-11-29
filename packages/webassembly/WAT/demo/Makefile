
encode=wat2wasm
decode=wasm2wat

.DEFAULT_GOAL = all

add.wasm: add.wat
	$(encode) add.wat -o add.wasm

fac.wasm: fac.wat
	$(encode) fac.wat -o fac.wasm

fib.wasm: fib.wat
	$(encode) fib.wat -o fib.wasm

bridge.wasm: bridge.wat
	$(encode) bridge.wat -o bridge.wasm

exports.wasm: exports.wat
	$(encode) exports.wat -o exports.wasm

memory.wasm: memory.wat
	$(encode) memory.wat -o memory.wasm

add.debug: add.wasm
	$(decode) add.wasm -o add.debug.wat

fac.debug: fac.wasm
	$(decode) fac.wasm -o fac.debug.wat

fib.debug: fib.wasm
	$(decode) fib.wasm -o fib.debug.wat

bridge.debug: bridge.wasm
	$(decode) bridge.wasm -o bridge.debug.wat

exports.debug: exports.wasm
	$(decode) exports.wasm -o exports.debug.wat

all: add.wasm fac.wasm fib.wasm bridge.wasm exports.wasm

.PHONY: all

clean:
	rm *.wasm && rm *.debug.wat
