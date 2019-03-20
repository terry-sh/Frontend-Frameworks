import * as ts from "typescript";
import * as path from "path";

/** Name of dispatch function interface */
const DispatchName = "Dispatch";
/** Name of action field "type"  */
const TypeName = "type";
/** Type declration file name */
const TypeDeclarationFile = "index.ts";

/** Absolute path of type declration file */
const indexTs = path.join(__dirname, TypeDeclarationFile);

/**
 * Whether the current node is a "dispatch" call, i.e.
 * 
 * ```ts
 * dispatch({ type: 'user/fetchUser', payload; { userId: 1 } })
 * ```
 * 
 * @param node
 * @param typeChecker
 */
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
            const isDispatch = declaration.parent.name.getText() === DispatchName;
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

/**
 * Recursive node visitor of Typescript compiler
 * @param node 
 * @param program 
 * @param context 
 */
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

/**
 * Node visitor of Typescript compiler
 * @param node 
 * @param program 
 */
function visitNode(node: ts.Node, program: ts.Program): ts.Node {
  const typeChecker = program.getTypeChecker();
  if (!isDispatchCallExpression(node, typeChecker)) {
    return node;
  }

  if (node.arguments.length > 0) {
    const payload = node.arguments[0];
    if (ts.isObjectLiteralExpression(payload)) {

      payload.properties = ts.createNodeArray(
        payload.properties.map(val => {
          if (ts.isPropertyAssignment(val) && val.name.getText() === TypeName) {
            const { initializer } = val;
            if (ts.isPropertyAccessExpression(initializer)) {
              // TODO: do action type transformation
              const typePath = initializer.getText().split('.');
              const actionType = typePath[0] + '/' + typePath[2];

              const newInitializer = ts.createStringLiteral(actionType);
              val.initializer = newInitializer;
            }
          }
          return val;
        })
      );
    }
  }
  return node;
}

/**
 * Transformer generator
 * @param program
 */
export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  /** Transformer plugin */
  return (context: ts.TransformationContext) => (file: ts.SourceFile) =>
    visitNodeAndChildren(file, program, context);
}
