import * as ts from "typescript";
import * as path from "path";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) =>
    visitNodeAndChildren(file, program, context);
}

function visitNodeAndChildren(
  node: ts.SourceFile,
  program: ts.Program,
  context: ts.TransformationContext
): ts.SourceFile;
function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext
): ts.Node;
function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext
): ts.Node {
  return ts.visitEachChild(
    visitNode(node, program),
    childNode => visitNodeAndChildren(childNode, program, context),
    context
  );
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node {
  const typeChecker = program.getTypeChecker();
  if (!isDispatchCallExpression(node, typeChecker)) {
    return node;
  }

  if (node.arguments.length > 0) {
    const payload = node.arguments[0];
    if (ts.isObjectLiteralExpression(payload)) {
      payload.properties = ts.createNodeArray(payload.properties.map(val => {
        if (ts.isPropertyAssignment(val) && val.name.getText() === "type") {
          const { initializer } = val;
          if (ts.isPropertyAccessExpression(initializer)) {
            val.initializer = ts.createStringLiteral(initializer.getText());
          }
        }
        return val;
      }));
    }
  }
  return node;
}

const indexTs = path.join(__dirname, "index.ts");

function isDispatchCallExpression(
  node: ts.Node,
  typeChecker: ts.TypeChecker
): node is ts.CallExpression {
  if (node.kind === ts.SyntaxKind.CallExpression) {
    const signature = typeChecker.getResolvedSignature(node as ts.CallExpression);
    if (signature !== undefined) {
      const { declaration } = signature;
      if (!!declaration) {
        if (ts.isCallSignatureDeclaration(declaration)) {
          if (ts.isInterfaceDeclaration(declaration.parent)) {
            const isDispatch = declaration.parent.name.getText() === 'Dispatch';
            if (isDispatch) {
              return path.join(declaration.getSourceFile().fileName) === indexTs;
            }
          }
        }
      }
    }
  }
  return false;
}
