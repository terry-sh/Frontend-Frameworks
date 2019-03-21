import * as ts from "typescript";
import * as path from "path";

/** Name of dispatch function interface */
const DispatchInterfaceName = "Dispatch";
/** Name of action field "type"  */
const TypeKeyName = "type";
/** Name of namespace field "namespace" */
const NamespaceKeyName = "namespace";

/** Type declration file name */
const TypeDeclarationFile = "index.ts";

/** Absolute path of type declration file */
const indexTs = path.join(__dirname, TypeDeclarationFile);

/**
 * Whether the current node is a "dispatch" call, i.e.
 *
 * ```ts
 * dispatch({ type: 'user/fetchUser', payload: { userId: 1 } })
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
        return (
          ts.isCallSignatureDeclaration(declaration) &&
          ts.isInterfaceDeclaration(declaration.parent) &&
          declaration.parent.name.getText() === DispatchInterfaceName &&
          path.join(declaration.getSourceFile().fileName) === indexTs
        );
      }
    }
  }
  return false;
}

/**
 * Get reducer name from action type value
 * @param initializer the node passed to function is like
 *        `UserStore.effects.fetchUser` of { name: initializer }
 * @param typeChecker
 */
function getReducerName(initializer: ts.Expression, typeChecker: ts.TypeChecker) {
  let reducerName: string = undefined;
  if (ts.isPropertyAccessExpression(initializer)) {
    // The expression is like `User.effects.fetchUser`
    reducerName = initializer.name.text;
  } else if (ts.isElementAccessExpression(initializer)) {
    // The expression is like `UserStore.effects['fetchUser']`
    if (ts.isStringLiteral(initializer.argumentExpression)) {
      reducerName = initializer.argumentExpression.text;
    }
  }
  return reducerName;
}

/**
 * Get namespace name from from action type value
 * @param initializer the node passed to function is like
 *        `UserStore.effects.fetchUser` of { name: initializer }
 * @param typeChecker
 */
function getNamespaceName(initializer: ts.Expression, typeChecker: ts.TypeChecker) {
  let namespaceName: string = undefined;

  const reducerNode =
    ts.isPropertyAccessExpression(initializer) || ts.isElementAccessExpression(initializer)
      ? initializer.expression
      : undefined;

  const storeNode =
    ts.isPropertyAccessExpression(reducerNode) || ts.isElementAccessExpression(reducerNode)
      ? reducerNode.expression
      : undefined;

  if (storeNode !== undefined) {
    const storeType = typeChecker.getTypeAtLocation(storeNode).symbol;
    const namespaceField = storeType.members.get(NamespaceKeyName as ts.__String);
    const namespaceValue = namespaceField.getDeclarations();

    if (Array.isArray(namespaceValue) && namespaceValue.length > 0) {
      const field = namespaceValue[0];
      if (ts.isPropertyAssignment(field)) {
        const valueNode = field.initializer;
        if (ts.isStringLiteral(valueNode)) {
          namespaceName = valueNode.text;
        } else if (ts.isAsExpression(valueNode)) {
          // namespace: 'user' as 'user'
          if (ts.isStringLiteral(valueNode.expression)) {
            namespaceName = valueNode.expression.text;
          }
        } else {
          // TODO: handle other conditions
          console.log('Namespace Value is kind of:', field.initializer.kind);
        }
      }
    }

    if (namespaceName === undefined && ts.isIdentifier(storeNode)) {
      // Namespace fallback to store module name if can not
      // get `namespace` field from store module
      namespaceName = storeNode.text;
    }
  } else {
    console.log("storeNode is undefined");
  }

  if (namespaceName === undefined) {
    console.error("Can not resolve dispatch namespace");
  }

  return namespaceName;
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
          if (val.name.getText() === TypeKeyName) {
            if (ts.isPropertyAssignment(val)) {
              const reducerName = getReducerName(val.initializer, typeChecker);
              const namespaceName = getNamespaceName(val.initializer, typeChecker);
              if (!!reducerName && !!namespaceName) {
                val.initializer = ts.createStringLiteral(namespaceName + "/" + reducerName);
              }
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
