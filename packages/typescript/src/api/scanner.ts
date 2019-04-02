/// Token Analyzer example
import * as fs from "fs";
import * as ts from "typescript";

const sourceCode = fs.readFileSync("./sample.ts").toString();

const tokenAnalyzer = ts.createScanner(
  ts.ScriptTarget.Latest,
  /** set skip trivia to `false` */
  false
);

tokenAnalyzer.setText(sourceCode);
tokenAnalyzer.setOnError((message: ts.DiagnosticMessage, length: number) => {
  console.error(message);
});

// TODO: test different target script version
tokenAnalyzer.setScriptTarget(ts.ScriptTarget.Latest);
tokenAnalyzer.setLanguageVariant(ts.LanguageVariant.Standard); // standard or JSX

const tokenList = [];
while (true) {
  const token = tokenAnalyzer.scan();
  if (token === ts.SyntaxKind.EndOfFileToken) {
    break;
  }

  const startPos = tokenAnalyzer.getStartPos();
  const info = {
    token,
    kind: ts.SyntaxKind[token],
    startPos,
    text: null
  };

  if (
    token === ts.SyntaxKind.Identifier ||
    token === ts.SyntaxKind.NumericLiteral || // FirstLiteralToken
    token === ts.SyntaxKind.BigIntLiteral ||
    token === ts.SyntaxKind.StringLiteral
  ) {
    const text = tokenAnalyzer.getTokenText();
    info.text = text;
  }

  tokenList.push(info);
}
console.table(tokenList);
