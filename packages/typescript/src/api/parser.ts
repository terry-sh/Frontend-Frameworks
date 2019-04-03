/// Token Analyzer example
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

function printAllChildren(node: ts.Node, sf: ts.SourceFile, depth = 0) {
  if (!node) {
    return
  }
  console.log(new Array(depth + 1).join("----"), ts.SyntaxKind[node.kind], node.pos, node.end);
  depth++;
  if (node.getChildren) {
    node.getChildren(sf).forEach(c => printAllChildren(c, sf, depth));
  }
}

const sourceFile = "sample.ts";
const sourcePath = path.resolve(__dirname, sourceFile);
const sourceCode = fs.readFileSync(sourcePath).toString();

const sf = ts.createSourceFile(sourceFile, sourceCode, ts.ScriptTarget.ESNext);

printAllChildren(sf, sf);