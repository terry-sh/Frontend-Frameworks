interface FunctionObject {}
interface ScriptRecord {}

interface ModuleRecord {}
interface GeneratorObject {}

interface ExecutionContext {
  CodeEvalutionState: any;
  Function: FunctionObject;
  Realm: RealmRecord;
  ScriptOrModule: ScriptRecord;

  LexicalEnvironment: LexicalEnvironment;
  VariableEnvironment: LexicalEnvironment;
  Generator: GeneratorObject;
}
