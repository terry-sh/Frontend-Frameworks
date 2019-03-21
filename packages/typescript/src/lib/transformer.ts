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
              const reducerName = initializer.name.text;
              let namespaceName: string = undefined;

              const { expression: reducerOrEffects } = initializer;
              if (ts.isPropertyAccessExpression(reducerOrEffects)) {
                const storeNode = reducerOrEffects.expression;
                const storeType = typeChecker.getTypeAtLocation(storeNode);
                const namespaceField = storeType.symbol.members.get('namespace' as ts.__String);
                const namespaceValue = namespaceField.getDeclarations();

                if (Array.isArray(namespaceValue) && namespaceValue.length > 0) {
                  const field = namespaceValue[0];
                  if (ts.isPropertyAssignment(field)) {
                    if (ts.isStringLiteral(field.initializer)) {
                      namespaceName = field.initializer.text;
                    } else {
                      //
                    }
                  }
                }

                if (namespaceName === undefined && ts.isIdentifier(storeNode)) {
                  // Namespace fallback to store module name if can not 
                  // get `namespace` field from store module
                  namespaceName = storeNode.text;
                }
              }

              if (namespaceName === undefined) {
                console.error('Can not resolve dispatch namespace');
              }
  
              const actionType = namespaceName + '/' + reducerName;
              const newInitializer = ts.createStringLiteral(actionType);
              val.initializer = newInitializer;
            } else if (ts.isElementAccessExpression(initializer)) {
              // if the expression is like:
              // UserStore.reducers['fetchUser'];
              if (ts.isStringLiteral(initializer.argumentExpression)) {
                const reducerName = initializer.argumentExpression.getText();
              }
            } else {
              // TODO:
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
