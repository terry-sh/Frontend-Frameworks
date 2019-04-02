# Typescript Language and Compilers etc

## Compiler System and API

### Compiler API

- `Scanner`

  (lexical analysis) inputs text streams and outputs token streams.

  source code of `Scanner` is located in `/src/compiler/scanner.ts`.
 
  **FAQ**

  + `scan` method will incur `Unterminated_template_literal` errors when source file contains string template literal.

- `Parser`

  (syntactic analysis, parsing) generates AST.

  source code of `Parser` is located in `/src/compiler/parser.ts`.

- `Binder`

  (semantic analysis) generates Symbols (objects used by Typescript compiler).

- `Checker`

