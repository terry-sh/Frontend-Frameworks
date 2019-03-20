import * as ts from "typescript";
import transformer from "./lib/transformer";

import * as path from "path";

function compile(filePaths: string[], writeFileCallback?: ts.WriteFileCallback) {
  const program = ts.createProgram({
    rootNames: filePaths,
    options: {
      noEmitOnError: true
    }
  });

  const transformers: ts.CustomTransformers = {
    before: [transformer(program)],
    after: []
  };
  const { emitSkipped, diagnostics } = program.emit(
    undefined,
    writeFileCallback,
    undefined,
    false,
    transformers
  );

  if (emitSkipped) {
    throw new Error(diagnostics.map(diagnostic => diagnostic.messageText).join("\n"));
  }
}

compile([path.join(__dirname, "test.ts")]);
