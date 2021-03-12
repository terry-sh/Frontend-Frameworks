
/**
 * value of any [ECMAScript language type].
 */
 type Value = {};

 type WithObject = {};
 
 // =========
 
 interface LexicalEnvironment {
   environmentRecord: EnvironmentRecord;
   outerLexicalEnvironment: LexicalEnvironment | null;
 }
 
 interface GlobalEnvironment extends LexicalEnvironment {
   /** The global environment's outer environment reference is null */
   outerLexicalEnvironment: null;
 }
 
 interface ModuleRecord {}
 interface Binding {}
 
 interface ModuleEnvironment extends LexicalEnvironment {
   /** The outer environment of a module environment is a global environment. */
   outerLexicalEnvironment: GlobalEnvironment;
 }
 
 /**
  * A function environment may establish a new this binding. A function environment also captures the state necessary to support super method invocations.
  */
 interface FuncitonEnvironment extends LexicalEnvironment {}
 
 declare const globalEnvironment: GlobalEnvironment;
 
 // =======
 interface EnvironmentRecord {
   /** Determine if an Environment Record has a binding for the String value N. Return true if it does and false if it does not. */
   HasBinding(N: string): boolean;
 
   /**
    * Create a new but uninitialized mutable binding in an Environment Record. The String value N is the text of the bound name. If the Boolean argument D is true the binding may be subsequently deleted.
    * @param N
    * @param D
    */
   CreateMutableBinding(N: string, D: boolean): void;
 
   /**
    * Create a new but uninitialized immutable binding in an Environment Record. The String value N is the text of the bound name. If S is true then attempts to set it after it has been initialized will always throw an exception, regardless of the strict mode setting of operations that reference that binding.
    * @param N
    * @param S
    */
   CreateImmutableBinding(N: string, S: boolean): void;
 
   /**
    * Set the value of an already existing but uninitialized binding in an Environment Record. The String value N is the text of the bound name. V is the value for the binding and is a value of any ECMAScript language type.
    * @param N
    * @param V
    */
   InitializeBinding(N: string, V: Value): void;
 
   /**
    * Set the value of an already existing mutable binding in an Environment Record. The String value N is the text of the bound name. V is the value for the binding and may be a value of any ECMAScript language type. S is a Boolean flag. If S is true and the binding cannot be set throw a TypeError exception.
    * @param N
    * @param V
    * @param S
    */
   SetMutableBinding(N: string, V: Value, S: boolean): void;
 
   /**
    * Returns the value of an already existing binding from an Environment Record. The String value N is the text of the bound name. S is used to identify references originating in strict mode code or that otherwise require strict mode reference semantics. If S is true and the binding does not exist throw a ReferenceError exception. If the binding exists but is uninitialized a ReferenceError is thrown, regardless of the value of S.
    * @param N
    * @param S
    */
   GetBindingValue(N: string, S: boolean): Value;
 
   /**
    * Delete a binding from an Environment Record. The String value N is the text of the bound name. If a binding for N exists, remove the binding and return true. If the binding exists but cannot be removed return false. If the binding does not exist return true.
    * @param N
    *
    * @remark Typically, use `delete` to delete a binding.
    */
   DeleteBinding(N: string): boolean;
 
   /**
    * Determine if an Environment Record establishes a this binding. Return true if it does and false if it does not.
    */
   HasThisBinding(): boolean;
 
   /**
    * Determine if an Environment Record establishes a super method binding. Return true if it does and false if it does not.
    */
   HasSuperBinding(): boolean;
 
   /**
    * If this Environment Record is associated with a with statement, return the with object. Otherwise, return undefined.
    */
   WithBaseObject(): WithObject | undefined;
 }
 
 /**
  * Declarative Environment Records are used to define the effect of ECMAScript language syntactic elements such as FunctionDeclarations, VariableDeclarations, and Catch clauses that directly associate identifier bindings with ECMAScript language values
  */
 interface DeclarativeEnvironmentRecord extends EnvironmentRecord {
   HasThisBinding(): false;
 
   HasSuperBinding(): false;
 
   WithBaseObject(): undefined;
 }
 
 /**
  * Object Environment Records are used to define the effect of ECMAScript elements such as WithStatement that associate identifier bindings with the properties of some object.
  */
 interface ObjectEnvironmentRecord extends EnvironmentRecord {}
 
 /**
  * Global Environment Records are specializations that are used for specifically for Script global declarations.
  */
 interface GlobalEnvironmentRecord extends EnvironmentRecord {
   /**
    * @virtual
    * The object Environment Record component of a global Environment Record contains the bindings for all built-in globals (clause 18) and all bindings introduced by a FunctionDeclaration, GeneratorDeclaration, AsyncFunctionDeclaration, AsyncGeneratorDeclaration, or VariableStatement contained in global code.
    */
   ObjectRecord: ObjectEnvironmentRecord;
 
   /**
    * The value returned by this in global scope. Hosts may provide any ECMAScript Object value.
    */
   GlobalThisValue: Object;
 
   /**
    * The bindings for all other ECMAScript declarations in global code are contained in the declarative Environment Record component of the global Environment Record.
    */
   DeclarativeRecord: DeclarativeEnvironmentRecord;
 
   /**
    * The string names bound by FunctionDeclaration, GeneratorDeclaration, AsyncFunctionDeclaration, AsyncGeneratorDeclaration, and VariableDeclaration declarations in global code for the associated realm.
    */
   VarNames: string[];
 }
 
 /**
  * Function Environment Records are specializations that are used for specifically top-level declarations within functions.
  *
  * A function Environment Record is a declarative Environment Record that is used to represent the top-level scope of a function and, if the function is not an ArrowFunction, provides a *this* binding.
  * If a function is not an ArrowFunction function and references *super*, its function Environment Record also contains the state that is used to perform *super* method invocations from within the function.
  */
 interface FunctionEnvironmentRecord extends DeclarativeEnvironmentRecord {
   /** This is the *this* value used for this invocation of the function. */
   ThisValue: any;
 
   /** If the value is lexical, this is an ArrowFunction and does not have a local this value. */
   ThisBindingStatus: "lexical" | "initialized" | "uninitialized";
 
   /**
    * The function object whose invocation caused this Environment Record to be created.
    */
   FunctionObject: Object;
 
   /**
    * If the associated function has super property accesses and is not an ArrowFunction, [[HomeObject]] is the object that the function is bound to as a method. The default value for [[HomeObject]] is undefined.
    */
   HomeObject: Object | undefined;
 
   /**
    * If this Environment Record was created by the [[Construct]] internal method, [[NewTarget]] is the value of the [[Construct]] newTarget parameter. Otherwise, its value is undefined.
    */
   NewTarget: Object | undefined;
 
   /**
    * Set the [[ThisValue]] and record that it has been initialized.
    * @param V
    */
   BindThisValue(V: any): void;
 
   /**
    * Return the value of this Environment Record's this binding. Throws a ReferenceError if the this binding has not been initialized.
    */
   GetThisBinding(): any;
 
   /**
    * Return the object that is the base for super property accesses bound in this Environment Record. The object is derived from this Environment Record's [[HomeObject]] field. The value undefined indicates that super property accesses will produce runtime errors.
    */
   GetSuperBase(): Object;
 }
 
 interface ModuleEnvironmentRecord extends DeclarativeEnvironmentRecord {
   /**
    * Create an immutable indirect binding in a module Environment Record. The String value N is the text of the bound name. M is a Module Record, and N2 is a binding that exists in M's module Environment Record.
    * @param N 
    * @param M 
    * @param N2 
    */
   CreateImportBinding(N: string, M: ModuleRecord, N2: Binding);
 
   /**
    * Return the value of this Environment Record's *this* binding.
    */
   GetThisBinding(): any;
 }
 
 // 问题
 // CreateMutableBinding 和 InitializeBinding 是分离的
 // 意即 `let a = 2` 并不是一个原子操作，而是分为两步。
 // 那么 `let a; a = 2;` 中的第二步是属于 InitializeBinding 还是属于 SetMutableBinding ?
 // 代码示例 `const f = () => {let a; console.log(a); a = 2;}` 的结果是 undefiend，所以第二步 `a  = 2` 应该属于 SetMutableBinding。
 
 // ====
 