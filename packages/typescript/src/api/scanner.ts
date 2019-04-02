/// Token Analyzer example

import * as ts from "typescript";

const sourceCode = `
const i: number = 1.2;
const flag = 0b0011;
const name = "jules";

const cat: Cat = null;
`;

const tokenAnalyzer = ts.createScanner(ts.ScriptTarget.Latest, true);
tokenAnalyzer.setText(sourceCode);
tokenAnalyzer.setOnError((message: ts.DiagnosticMessage, length: number) => {
  console.error(message);
});

// TODO: test different target script version
tokenAnalyzer.setScriptTarget(ts.ScriptTarget.ES5);
tokenAnalyzer.setLanguageVariant(ts.LanguageVariant.Standard);

const tokenList = [];
while (true) {
  const token = tokenAnalyzer.scan();
  if (token === ts.SyntaxKind.EndOfFileToken) {
    break;
  }

  const info = {
    token,
    kind: ts.SyntaxKind[token],
    text: null
  };

  if (
    token === ts.SyntaxKind.Identifier ||
    token === ts.SyntaxKind.FirstLiteralToken ||
    token === ts.SyntaxKind.LastLiteralToken ||
    token === ts.SyntaxKind.BigIntLiteral ||
    token === ts.SyntaxKind.StringLiteral
    ) {
      const text = tokenAnalyzer.getTokenText();
      info.text = text;
    }
    tokenList.push(info);
}
console.table(tokenList);
