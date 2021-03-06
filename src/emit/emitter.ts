<<<<<<< HEAD
import NodeKind, {nodeKindName} from '../syntax/nodeKind';
import * as Keywords from '../syntax/keywords';
import Node, {createNode} from '../syntax/node';
import assign = require('object-assign')
import {CustomVisitor} from "../custom-visitors"
import {VERBOSE_MASK, AS3_UTIL, INTERFACE_METHOD, INTERFACE_INF, WARNINGS, FOR_IN_KEY, FOR_IN_OBJ, INDENT} from '../config';
import ClassList, {ClassKind, ClassMember, ClassMemberKind, ClassRecord, ModifierKind, MODIFIERS} from "./classlist";
import {ReportFlags} from '../reports/report-flags';
=======
import NodeKind from "../syntax/nodeKind";
import * as Keywords from "../syntax/keywords";
import Node, { createNode } from "../syntax/node";
import assign = require("object-assign");
import { CustomVisitor } from "../custom-visitors";
>>>>>>> 3a7b243

const util = require("util");

const GLOBAL_NAMES = [
<<<<<<< HEAD
	'undefined', 'NaN', 'Infinity',
	'Array', 'Boolean', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
	'int', 'isFinite', 'isNaN', 'isXMLName', 'Number', 'Object',
	'parseFloat', 'parseInt', 'String', 'trace', 'uint', 'unescape', 'Vector', 'XML', 'XMLList',
	'arguments', 'Class', 'Date', 'Function', 'Math',
	'Namespace', 'QName', 'RegExp', 'JSON',
	'Error', 'EvalError', 'RangeError', 'ReferenceError',
	'SyntaxError', 'TypeError', 'URIError',
	'getDefinitionByName'
];

const TYPE_REMAP:{ [id:string]:string } = {
	'Class': 'any', // 80pro: was mapped to 'Object' before
	'Object': 'any',
	'String': 'string',
	'Boolean': 'boolean',
	'Number': 'number',
	'int': 'number',
	'uint': 'number',
	'*': 'any',
	'Array': 'any[]',
	'Dictionary': 'Object',// 80pro: was mapped to 'Map<any, any>' before

	// Inexistent errors
	'ArgumentError': 'Error',
	'DefinitionError': 'Error',
	'SecurityError': 'Error',
	'VerifyError': 'Error'
}
=======
  "undefined",
  "NaN",
  "Infinity",
  "Array",
  "Boolean",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "int",
  "isFinite",
  "isNaN",
  "isXMLName",
  "Number",
  "Object",
  "parseFloat",
  "parseInt",
  "String",
  "trace",
  "uint",
  "unescape",
  "Vector",
  "XML",
  "XMLList",
  "arguments",
  "Class",
  "Date",
  "Function",
  "Math",
  "Namespace",
  "QName",
  "RegExp",
  "JSON",
  "Error",
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError",
];

const TYPE_REMAP: { [id: string]: string } = {
  Class: "Object",
  Object: "any",
  String: "string",
  Boolean: "boolean",
  Number: "number",
  int: "number",
  uint: "number",
  "*": "any",
  Array: "any[]",
  Dictionary: "Map<any, any>",

  // Inexistent errors
  ArgumentError: "Error",
  DefinitionError: "Error",
  SecurityError: "Error",
  VerifyError: "Error",
};
>>>>>>> 3a7b243

// TODO: improve me (used only on emitType())
const TYPE_REMAP_VALUES = ["void"];
for (var k in TYPE_REMAP) {
<<<<<<< HEAD
	TYPE_REMAP_VALUES.push(TYPE_REMAP[k]);
}

const IDENTIFIER_REMAP:{ [id:string]:string } = {
	'Dictionary': 'Map<any, any>',

	// Inexistent errors
	'ArgumentError': 'Error',
	'DefinitionError': 'Error',
	'SecurityError': 'Error',
	'VerifyError': 'Error',
	'getDefinitionByName': 'AS3Utils.getDefinitionByName'
}

interface Scope {
	parent:Scope;
	declarations:Declaration[];
	className?:string;
}

/*class Scope {
	public parent:Scope;
	public declarations:Declaration[];
	public className:string;
}

class Declaration {
	public name:string;
	public type:string;
	public bound:string;
}*/


interface Declaration {
	name:string;
	type?:string;
	bound?:string;
}



export interface EmitterOptions {
	lineSeparator:string;
	useNamespaces:boolean;
	customVisitors:CustomVisitor[];
	definitionsByNamespace?:{[ns:string]:string[]};
=======
  TYPE_REMAP_VALUES.push(TYPE_REMAP[k]);
}

const IDENTIFIER_REMAP: { [id: string]: string } = {
  Dictionary: "Map<any, any>",

  // Inexistent errors
  ArgumentError: "Error",
  DefinitionError: "Error",
  SecurityError: "Error",
  VerifyError: "Error",
};

interface Scope {
  parent: Scope;
  declarations: Declaration[];
  className?: string;
}

interface Declaration {
  name: string;
  type?: string;
  bound?: string;
}

export interface EmitterOptions {
  lineSeparator: string;
  useNamespaces: boolean;
  customVisitors: CustomVisitor[];
  definitionsByNamespace?: { [ns: string]: string[] };
>>>>>>> 3a7b243
}

interface NodeVisitor {
<<<<<<< HEAD
	(emitter:Emitter, node:Node):void;
}


const VISITORS:{[kind:number]:NodeVisitor} = {
	[NodeKind.PACKAGE]: emitPackage,
	[NodeKind.META]: emitMeta,
	[NodeKind.IMPORT]: emitImport,
	[NodeKind.EMBED]: emitEmbed,
	[NodeKind.USE]: emitUse,
	[NodeKind.FUNCTION]: emitFunction,
	[NodeKind.LAMBDA]: emitFunction,
	[NodeKind.FOREACH]: emitForEach,
	[NodeKind.FORIN]: emitForIn,
	[NodeKind.INTERFACE]: emitInterface,
	[NodeKind.CLASS]: emitClass,
	[NodeKind.VECTOR]: emitVector,
	[NodeKind.SHORT_VECTOR]: emitShortVector,
	[NodeKind.TYPE]: emitType,
	[NodeKind.CALL]: emitCall,
	[NodeKind.CATCH]: emitCatch,
	[NodeKind.NEW]: emitNew,
	[NodeKind.RELATION]: emitRelation,
	[NodeKind.OP]: emitOp,
	[NodeKind.OR]: emitOr,
	[NodeKind.IDENTIFIER]: emitIdent,
	[NodeKind.XML_LITERAL]: emitXMLLiteral,
	[NodeKind.CONST_LIST]: emitConstList,
	[NodeKind.NAME_TYPE_INIT]: emitNameTypeInit,
	[NodeKind.VALUE]: emitObjectValue,
	[NodeKind.DOT]: emitDot,
	[NodeKind.LITERAL]: emitLiteral,
	[NodeKind.ARRAY]: emitArray,
	[NodeKind.BLOCK]: emitBlock,
	[NodeKind.MINUS]: emitMinus,
	//[NodeKind.PARAMETER_LIST]: emitParametersList
};


export function visitNodes(emitter:Emitter, nodes:Node[]):void {
	if (nodes) {
		nodes.forEach(node => visitNode(emitter, node));
	}
}


export function visitNode(emitter:Emitter, node:Node):void {

	if (!node) {
		return;
	}

	// use custom visitor. allow custom node manipulation
	for (let i = 0, l = emitter.options.customVisitors.length; i < l; i++) {
		let customVisitor = emitter.options.customVisitors[i];
		if (customVisitor.visit(emitter, node) === true) {
			return;
		}
	}

	let visitor = VISITORS[node.kind] || function (emitter:Emitter, node:Node):void {
			emitter.catchup(node.start);
			visitNodes(emitter, node.children);
		};

	//if(VERBOSE >= 2 && VISITORS[node.kind]) {
	if ((VERBOSE_MASK & ReportFlags.NODES_TREE) == ReportFlags.NODES_TREE && VISITORS[node.kind]) {
		console.log("visit:" + VISITORS[node.kind].name + "() <=====================================");
		console.log("node: " + node.toString());
	}

	visitor(emitter, node);

}

function filterAST(node:Node):Node {

	function isInteresting(child:Node):boolean {
		// we don't care about comment
		return !!child && child.kind !== NodeKind.AS_DOC && child.kind !== NodeKind.MULTI_LINE_COMMENT;
	}

	let newNode = createNode(
		node.kind,
		node,
		... node.children.filter(isInteresting).map(filterAST));

	newNode.children.forEach(child => child.parent = newNode);

	return newNode;
=======
  (emitter: Emitter, node: Node): void;
}

const VISITORS: { [kind: number]: NodeVisitor } = {
  [NodeKind.PACKAGE]: emitPackage,
  [NodeKind.META]: emitMeta,
  [NodeKind.IMPORT]: emitImport,
  [NodeKind.INCLUDE]: emitInclude,
  [NodeKind.USE]: emitInclude,
  [NodeKind.FUNCTION]: emitFunction,
  [NodeKind.LAMBDA]: emitFunction,
  [NodeKind.FOREACH]: emitForEach,
  [NodeKind.INTERFACE]: emitInterface,
  [NodeKind.CLASS]: emitClass,
  [NodeKind.VECTOR]: emitVector,
  [NodeKind.SHORT_VECTOR]: emitShortVector,
  [NodeKind.TYPE]: emitType,
  [NodeKind.CALL]: emitCall,
  [NodeKind.CATCH]: emitCatch,
  [NodeKind.NEW]: emitNew,
  [NodeKind.RELATION]: emitRelation,
  [NodeKind.OP]: emitOp,
  [NodeKind.OR]: emitOr,
  [NodeKind.IDENTIFIER]: emitIdent,
  [NodeKind.XML_LITERAL]: emitXMLLiteral,
  [NodeKind.CONST_LIST]: emitConstList,
  [NodeKind.NAME_TYPE_INIT]: emitNameTypeInit,
  [NodeKind.VALUE]: emitObjectValue,
  [NodeKind.DOT]: emitDot,
  [NodeKind.LITERAL]: emitLiteral,
  [NodeKind.ARRAY]: emitArray,
};

export function visitNodes(emitter: Emitter, nodes: Node[]): void {
  if (nodes) {
    nodes.forEach((node) => visitNode(emitter, node));
  }
}

export function visitNode(emitter: Emitter, node: Node): void {
  if (!node) {
    return;
  }

  // use custom visitor. allow custom node manipulation
  for (let i = 0, l = emitter.options.customVisitors.length; i < l; i++) {
    let customVisitor = emitter.options.customVisitors[i];
    if (customVisitor.visit(emitter, node) === true) {
      return;
    }
  }

  let visitor =
    VISITORS[node.kind] ||
    function (emitter: Emitter, node: Node): void {
      emitter.catchup(node.start);
      visitNodes(emitter, node.children);
    };

  visitor(emitter, node);
}

function filterAST(node: Node): Node {
  function isInteresting(child: Node): boolean {
    // we don't care about comment
    return (
      !!child &&
      child.kind !== NodeKind.AS_DOC &&
      child.kind !== NodeKind.MULTI_LINE_COMMENT
    );
  }

  let newNode = createNode(
    node.kind,
    node,
    ...node.children.filter(isInteresting).map(filterAST)
  );

  newNode.children.forEach((child) => (child.parent = newNode));

  return newNode;
>>>>>>> 3a7b243
}

export default class Emitter {
<<<<<<< HEAD
	public isNew:boolean = false;
	public isExtended:boolean = false;
	public skipNewLines:boolean = false;
	public loopObjectCounter:number = 0;

	private _emitThisForNextIdent:boolean = true;
	get emitThisForNextIdent():boolean {
		return this._emitThisForNextIdent;
	}

	set emitThisForNextIdent(val:boolean) {
		this._emitThisForNextIdent = val;
	}

	public source:string;
	public options:EmitterOptions;

	public headOutput:string = "";

	public output:string = '';
	public index:number = 0;

/*	public rootScope:Scope = null;
	public scope:Scope = null;*/

	get scope(): Scope {
		return this._scope;
	}

	set scope(value: Scope) {
		this._scope = value;
	}
	private _scope:Scope;

	get rootScope(): Scope {
		return this._rootScope;
	}

	set rootScope(value: Scope) {
		this._rootScope = value;
	}

	private _rootScope:Scope;


	constructor(source:string, options?:EmitterOptions) {
		this.source = source;
		this.options = assign({
			includePath: "",
			lineSeparator: '\n',
			useNamespaces: false,
			customVisitors: []
		}, options || {});
	}

	emit(ast:Node):string {

		//if(VERBOSE >= 1) {
		if ((VERBOSE_MASK & ReportFlags.KEY_POINTS) == ReportFlags.KEY_POINTS) {
			console.log("emit() ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
		}

		this.withScope([], (rootScope) => {
			this.rootScope = rootScope;
			visitNode(this, filterAST(ast));
			this.catchup(this.source.length);
		});
		this.output = this.output.replace(/\s([^\n])\s*?=>/gm, " =>");//TODO hotfix. To remove new lines between arrow operator nad {
		return this.headOutput + this.output;
	}

	enterScope(declarations:Declaration[]):Scope {
		return this.scope = {parent: this.scope, declarations};
	}

	exitScope(checkScope:Scope = null):void {
		if (checkScope && this.scope !== checkScope) {
			throw new Error('Mismatched enterScope() / exitScope().');
		}
		if (!this.scope) {
			throw new Error('Unmatched exitScope().');
		}
		this.scope = this.scope.parent;
	}

	withScope(declarations:Declaration[], body:(scope:Scope) => void):void {
		let scope = this.enterScope(declarations);
		try {
			body(scope);
		} finally {
			this.exitScope(scope);
		}
	}

	get currentClassName():string {
		for (var scope = this.scope; scope; scope = scope.parent) {
			if (scope.className) {
				return scope.className;
			}
		}
		return null;
	}

	declareInScope(declaration:Declaration):void {
		let previousDeclaration:Declaration = null;
		for (var i = 0, len = this.scope.declarations.length; i < len; i++) {
			if (this.scope.declarations[i].name === declaration.name) {
				previousDeclaration = this.scope.declarations[i];
			}
		}

		if (previousDeclaration) {
			if (declaration.type !== undefined) previousDeclaration.type = declaration.type;
			if (declaration.bound !== undefined) previousDeclaration.bound = declaration.bound;
		} else {
			this.scope.declarations.push(declaration);
		}
	}


	findDefInScope(text:string):Declaration {
		let scope = this.scope;
		while (scope) {
			for (let i = 0; i < scope.declarations.length; i++) {
				if (scope.declarations[i].name === text) {
					return scope.declarations[i];
				}
			}
			scope = scope.parent;
		}
		return null;
	}

	commentNode(node:Node, catchSemi:boolean):void {
		this.insert('/*');
		this.catchup(node.end);
		let index = this.index;
		if (catchSemi) {
			while (true) {
				if (index >= this.source.length) {
					break;
				}
				if (this.source[index] === '\n') {
					this.catchup(index);
					break;
				}
				if (this.source[index] === ';') {
					this.catchup(index + 1);
					break;
				}
				index++;
			}
		}
		this.insert('*/');
	}

	catchup(index:number):void {
		if (this.index >= index) {
			return;
		}
		let text = this.sourceBetween(this.index, index);
		this.index = index;
		this.insert(text);
	}
	setIndexPos(index:number):void {
		this.index = index;

	}

	sourceBetween(start:number, end:number) {
		return this.source.substring(start, end);
	}

	skipTo(index:number):void {
		this.index = index;
	}

	getIndex():number {
		return this.index;
	}

	skip(number:number):void {
		this.index += number;
	}

	insert(str:string):void {
		this.output += str;

		// Debug util (comment out on production).
		// let split = this.output.split(" ");
		// let lastWord = split[split.length - 1];
		// console.log("    emitter.ts - output += " + lastWord);
		// process.stdout.write(" " + lastWord);
		// console.log("+++++++++ " + (string.indexOf("for(") !== -1));
		//if(VERBOSE >= 2 ) {
		if ((VERBOSE_MASK & ReportFlags.TRANSPILED_CODE) == ReportFlags.TRANSPILED_CODE) {
			console.log("output (all): " + this.output);
			// let a = 1; // insert breakpoint here
		}
	}

	consume(string:string, limit:number):void {
		let index = this.source.indexOf(string, this.index) + string.length;
		if (index > limit || index < this.index) {
			throw new Error('invalid consume');
		}
		this.index = index;
	}
	consumeRegExp(reg:RegExp, limit:number):void {
		let matches = this.source.slice(this.index).match(reg);
		if (matches.length < 1) return
		let matchStr = matches[0];
		let index = this.source.indexOf(matchStr, this.index) + matchStr.length;
		if (index > limit || index < this.index) return
		this.index = index;
	}

	/**
	 * Utilities
	 */
	ensureImportIdentifier(identifier:string, from = `./${identifier}`, checkGlobals:boolean = true):void {
		if (identifier == "number" || identifier == "number[]"
			|| identifier == "any" || identifier == "any[]"
			|| identifier == "boolean" || identifier == "boolean[]"
			|| identifier == "string" || identifier == "string[]"
			|| identifier == "Array")
			return;

		// warning if this is a as3-path, not a plain name (like shared.Node should error)
		if (WARNINGS >= 1 && identifier.split(".").length > 1) {
			console.log(`emitter.ts: *** MAJOR WARNING *** ensureImportIdentifier() => : invalid object name identifier: ${ identifier })`)
		}

		let isGloballyAvailable = checkGlobals
			? GLOBAL_NAMES.indexOf(identifier) >= 0
			: false;

		// change to root scope temporarily
		let previousScope = this.scope;
		this.scope = this.rootScope;

		// Ensure this file is not declaring this class
		if (
			this.source.indexOf(`class ${ identifier } `) === -1 && !isGloballyAvailable && !this.findDefInScope(identifier)
		) {
			this.headOutput += `import { ${ identifier } } from "${ from }";\n`;
			this.declareInScope({name: identifier});
		}

		// change back to previous scope
		this.scope = previousScope;
	}

	getTypeRemap(text:string):string {
		for (let i = 0, l = this.options.customVisitors.length; i < l; i++) {
			let customVisitor = this.options.customVisitors[i];
			if (customVisitor.typeMap && customVisitor.typeMap[text]) {
				return customVisitor.typeMap[text];
			}
		}
		return TYPE_REMAP[text];
	}

	getIdentifierRemap(text:string):string {
		for (let i = 0, l = this.options.customVisitors.length; i < l; i++) {
			let customVisitor = this.options.customVisitors[i];
			if (customVisitor.identifierMap && customVisitor.identifierMap[text]) {
				return customVisitor.identifierMap[text];
			}
		}
		return IDENTIFIER_REMAP[text];
	}

}


function emitPackage(emitter:Emitter, node:Node):void {
	let packageName = node.findChild(NodeKind.NAME);
	let content = node.findChild(NodeKind.CONTENT);

	if (content){
		let classNode = content.findChild(NodeKind.CLASS);
		let classRecord:ClassRecord;
		if (classNode)
		{
			let className = classNode.findChild(NodeKind.NAME);
			let classList = ClassList.classList;
			classRecord = new ClassRecord(packageName.text, className.text);
			classRecord.classKind = ClassKind.CLASS;
		}
		let interfaceNode = content.findChild(NodeKind.INTERFACE);
		if (interfaceNode)
		{
			let interfaceName = interfaceNode.findChild(NodeKind.NAME);
			let interfaceList = ClassList.classList;
			classRecord = new ClassRecord(packageName.text, interfaceName.text);
			classRecord.classKind = ClassKind.INTERFACE;

		}
		if (classRecord)
		{
			if (ClassList.isScanning)
			{
				ClassList.addClass(classRecord);
			}
			else
			{
				ClassList.setCurrentClassRecord(classRecord);
			}

		}
	}

	if (emitter.options.useNamespaces) {
		emitter.catchup(node.start);
		emitter.skip(Keywords.PACKAGE.length);
		emitter.insert('namespace');
		visitNodes(emitter, node.children);

	} else {
		emitter.catchup(node.start);
		emitter.skip(Keywords.PACKAGE.length + node.children[0].text.length + 4);

		visitNodes(emitter, node.children);
		emitter.catchup(node.end - 1);
		emitter.skip(1);
	}
}


function emitMeta(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	emitter.commentNode(node, false);
}


function emitUse(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	emitter.commentNode(node, false);
}

function emitEmbed(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	emitter.commentNode(node, false);
}

function emitImport(emitter:Emitter, node:Node):void {
	let statement = Keywords.IMPORT + " ";
/*	let split = node.text.split('.');
	let name = split[split.length - 1];
	split.pop();
	let ns = split.join(".");*/
	ClassList.addImportToLast(node.text.concat());

	// emit one import statement for each definition found in that namespace
	if (node.text.indexOf("*") !== -1) {
		let ns = node.text.substring(0, node.text.length - 2);
		let definitions = emitter.options.definitionsByNamespace[ns];

		let skipTo = node.end;

		if (definitions && definitions.length > 0) {
			definitions.forEach(definition => {
				let importNode = createNode(node.kind, node);
				importNode.text = `${ ns }.${ definition }`;
				importNode.parent = node.parent;
				emitImport(emitter, importNode);
				emitter.insert(";\n");
			})

			skipTo = node.end + Keywords.IMPORT.length + 2;

		} else {
			emitter.catchup(node.start);
			node.end += node.text.length - ns.length + 6;
			emitter.commentNode(node, true);
			skipTo = node.end;
			if (WARNINGS >= 1) {
				console.log(`emitter.ts: *** MINOR WARNING *** emitImport() => : nothing found to import on namespace ${ ns }. (import ${ node.text })`)
			}
		}

		emitter.skipTo(skipTo);
		return;
	}

	let text = node.text.concat();
	let hasCustomVisitor = false;

	// apply custom visitor import maps
	for (let i = 0, l = emitter.options.customVisitors.length; i < l; i++) {
		let customVisitor = emitter.options.customVisitors[i];
		if (customVisitor.imports) {
			hasCustomVisitor = true;
			customVisitor.imports.forEach((replacement, regexp) => {
				text = text.replace(regexp, replacement);
			});
		}
	}

	// // apply "bridge" translation
	// if (emitter.hasBridge && emitter.options.bridge.imports) {
	//     text = node.text.concat();
	//     emitter.options.bridge.imports.forEach((replacement, regexp) => {
	//         text = text.replace(regexp, replacement);
	//     });
	// }

	if (emitter.options.useNamespaces) {
		emitter.catchup(node.start);
		emitter.insert(statement);

		let split = node.text.split('.');
		let name = split[split.length - 1];
		emitter.insert(name + ' = ');

		// apply custom visitor translation
		if (hasCustomVisitor) {
			let diff = node.text.length - text.length;

			emitter.insert(text);
			emitter.skip(text.length + diff + statement.length);

		} else {
			emitter.catchup(node.end + statement.length);
		}

		emitter.declareInScope({name});

	} else {

		emitter.catchup(node.start);
		emitter.insert(Keywords.IMPORT + " ");

		let split = text.split(".");
		let name = split.pop();

		// Find current module name to output relative import
		let currentModule = "";
		let parentNode = node.parent;
		while (parentNode) {
			if (parentNode.kind === NodeKind.PACKAGE) {
				currentModule = parentNode.children[0].text;
				break;
			}
			parentNode = parentNode.parent;
		}

		text = `{ ${ name } } from "${ getRelativePath(currentModule.split("."), text.split(".")) }"`;
		emitter.insert(text);
		emitter.skipTo(node.end + Keywords.IMPORT.length + 1);
		emitter.declareInScope({name});
	}
}

function getRelativePath(currentPath:string[], targetPath:string[]) {
	while (currentPath.length > 0 && targetPath[0] === currentPath[0]) {
		currentPath.shift();
		targetPath.shift();
	}

	let relative = (currentPath.length === 0)
		? "."
		: currentPath.map(() => "..").join("/")

	return `${ relative }/${ targetPath.join("/") }`;
}

function getDeclarationType(emitter:Emitter, node:Node):string {
	let declarationType:string = null;
	let typeNode = node && node.findChild(NodeKind.TYPE);

	if (typeNode) {
		declarationType = emitter.getTypeRemap(typeNode.text) || typeNode.text;
	}

	return declarationType;
}

function emitInterface(emitter:Emitter, node:Node):void {
	emitDeclaration(emitter, node);

	//we'll catchup the other part
	emitter.declareInScope({
		name: node.findChild(NodeKind.NAME).text
	});

	// ensure extends identifier is being imported
	let extendsNode = node.findChild(NodeKind.EXTENDS);
	if (extendsNode) {
		emitter.ensureImportIdentifier(extendsNode.text);
	}

	let content = node.findChild(NodeKind.CONTENT);
	let contentsNode = content && content.children;
	let foundVariables:{ [name:string]:boolean } = {};
	if (contentsNode) {
		contentsNode.forEach(node => {
			visitNode(emitter, node.findChild(NodeKind.META_LIST));
			emitter.catchup(node.start);
			let type = node.findChild(NodeKind.TYPE) || node.children[2];
			if (node.kind === NodeKind.TYPE && node.text === "function") {
				emitter.skip(Keywords.FUNCTION.length + 1);
				//visitNode(emitter, node.findChild(NodeKind.PARAMETER_LIST));
				let parametersListNode = node.findChild(NodeKind.PARAMETER_LIST);
				if (parametersListNode)
				{
					let params = parametersListNode.children;
					for (var i = 0; i < params.length; i++) {
						let parameterNode = params[i];
						if (parameterNode.kind == NodeKind.PARAMETER)
						{
							let nameTypeInitNode = parameterNode.findChild(NodeKind.NAME_TYPE_INIT);
							if (nameTypeInitNode)
							{
								let nameNode = nameTypeInitNode.findChild(NodeKind.NAME);
								let typeParamNode = nameTypeInitNode.findChild(NodeKind.TYPE);
								let initNode = nameTypeInitNode.findChild(NodeKind.INIT);
								if (initNode)
								{
									//visitNode(emitter, nameNode);
									//emitter.skipTo(nameNode.start);
									//emitter.insert(nameNode.text);
									if (typeParamNode)
									{
										emitter.catchup(nameNode.start);
										//visitNode(emitter, nameNode);
										//emitter.skipTo(nameNode.end);
										//emitter.skipTo(typeParamNode.start);
										emitter.insert(nameNode.text);
										emitter.skipTo(typeParamNode.end);
										emitter.insert("?:");

										visitNode(emitter, typeParamNode);
										emitter.skipTo(nameTypeInitNode.end);
										//isitNode(emitter, initNode);
									}
									else
									{
										emitter.insert("?");
									}


									//emitter.skipTo(nameTypeInitNode.end);
								}
								else
								{
									visitNode(emitter, nameNode);
									//emitter.catchup(nameTypeInitNode.end);
								}

							}
						}
						else
						{
							console.log(`emitter.ts: *** WARNING *** there is unexpected node "${parameterNode}" in PARAMETER_LIST`);
						}
					}

				}


				visitNode(emitter, type);

			} else if (node.kind === NodeKind.GET || node.kind === NodeKind.SET) {
				let name = node.findChild(NodeKind.NAME);
				let parameterList = node.findChild(NodeKind.PARAMETER_LIST);
				if (!foundVariables[name.text]) {
					emitter.skipTo(name.start);
					emitter.catchup(name.end);
					foundVariables[name.text] = true;

					if (node.kind === NodeKind.GET) {
						emitter.skipTo(parameterList.end);
						if (type) {
							emitType(emitter, type);
						}

					} else if (node.kind === NodeKind.SET) {
						let parameterNode = parameterList.findChild(NodeKind.PARAMETER);
						let nameTypeInit = parameterNode.findChild(NodeKind.NAME_TYPE_INIT);
						emitter.skipTo(nameTypeInit.findChild(NodeKind.NAME).end);
						type = nameTypeInit.findChild(NodeKind.TYPE);
						if (type) {
							emitType(emitter, type);
						}
						emitter.skipTo(node.end);
					}

				} else {
					emitter.commentNode(node, true);
				}

			} else {
				//include or import in interface content not supported
				emitter.commentNode(node, true);
			}
		});
	}
}


function getFunctionDeclarations(emitter:Emitter, node:Node):Declaration[] {
	let decls:Declaration[] = [];
	let params = node.findChild(NodeKind.PARAMETER_LIST);
	if (params && params.children.length) {
		decls = params.children.map(param => {
			let nameTypeInit = param.findChild(NodeKind.NAME_TYPE_INIT);
			if (nameTypeInit) {
				return {
					name: nameTypeInit.findChild(NodeKind.NAME).text,
					type: getDeclarationType(emitter, nameTypeInit)
				};
			}
			let rest = param.findChild(NodeKind.REST);
			return {name: rest.text};
		});
	}
	let block = node.findChild(NodeKind.BLOCK);
	if (block) {
		function traverse(node:Node):Declaration[] {
			let result:Declaration[] = [];
			if (node.kind === NodeKind.VAR_LIST || node.kind === NodeKind.CONST_LIST ||
				node.kind === NodeKind.VAR || node.kind === NodeKind.CONST) {
				result = result.concat(
					node
						.findChildren(NodeKind.NAME_TYPE_INIT)
						.map(node => ({name: node.findChild(NodeKind.NAME).text}))
				);
			}
			if (node.kind !== NodeKind.FUNCTION && node.children && node.children.length) {
				result = Array.prototype.concat.apply(result, node.children.map(traverse));
			}
			return result.filter(decl => !!decl);
		}

		decls = decls.concat(traverse(block));
	}
	return decls;
}


function emitFunction(emitter:Emitter, node:Node):void {
	emitDeclaration(emitter, node);
	emitter.withScope(getFunctionDeclarations(emitter, node), () => {
		let rest = node.getChildFrom(NodeKind.MOD_LIST);
		let blockNode = node.findChild(NodeKind.BLOCK);
		emitter.skipNewLines = true;
		for (var i = 0; i < rest.length; i++) {
			var childNode:Node = rest[i];

			if (childNode.kind == NodeKind.PARAMETER_LIST) {
				let params = childNode.children;
				emitter.consume(Keywords.FUNCTION, childNode.end);


			}

			if (childNode.kind == NodeKind.TYPE) {

				let blockChildren = childNode.children;


			}
			for (var j = childNode.start; j < childNode.end; j++) {
				let char:string = emitter.source.substr(j, 1);
				//emitter.insert("\n" + NodeKind[childNode.kind] + ")" + j + ")" + char.charCodeAt(0) + ":" + char);

			}

			visitNode(emitter, childNode);


			if (childNode.kind == NodeKind.TYPE) {
				emitter.insert(" => ");
			}


		}
		emitter.skipNewLines = true;

	});
}

function emitParametersList(emitter:Emitter, node:Node):void {

}

function emitForIn(emitter:Emitter, node:Node):void {
	let initNode = node.children[0];
	let varNode = initNode.children[0];
	let inNode = node.children[1];
	let blockNode = node.children[2];
	let nameTypeInitNode = varNode.findChild(NodeKind.NAME_TYPE_INIT);
	let typeStr = "";
	if (nameTypeInitNode) {
		// emit variable type on for..of statements, but outside of the loop header.
		let nameNode = nameTypeInitNode.findChild(NodeKind.NAME);
		let typeNode = nameTypeInitNode.findChild(NodeKind.TYPE);
		if (typeNode) {
			emitter.catchup(node.start);
			/*            let typeRemapped = emitter.getTypeRemap(typeNode.text) || typeNode.text;
			 emitter.insert(`let ${ nameNode.text }:${ typeRemapped };\n`);*/

			let typeRemapped = emitter.getTypeRemap(typeNode.text) || typeNode.text;
			typeStr = typeRemapped == undefined ? '' : ':' + typeRemapped;
			emitter.insert(`var ${ nameNode.text }${ typeStr };\n`);
		}
		else {
			let vecNode = nameTypeInitNode.findChild(NodeKind.VECTOR);
			if (vecNode) {
				if (WARNINGS >= 1) {
					console.log("emitter.ts: *** WARNING *** for iterators of type vector not supported. Please declare iterator outside of the for's header");
				}
			}
		}
		emitter.catchup(node.start + Keywords.FOR.length + 1);
		emitter.catchup(varNode.start);
		emitter.insert(`${ nameNode.text }`);
		emitter.skipTo(varNode.end);
	} else {
		emitter.catchup(node.start + Keywords.FOR.length + 1);
		visitNode(emitter, initNode);
	}

	emitter.catchup(inNode.start);
	emitter.insert(' ');
	/*    emitter.skip(Keywords.IN.length + 1); // replace "in " with "of "
	 emitter.insert('of ');*/

	visitNodes(emitter, inNode.children);
	visitNode(emitter, blockNode);
}

function emitForEach(emitter:Emitter, node:Node):void {
	let varNode = node.children[0];
	let inNode = node.children[1];
	let objNode = inNode.children[0];
	let blockNode = node.children[2];

	if (objNode.kind == NodeKind.ARRAY)
	{
		emitter.catchup(node.start);
		emitter.loopObjectCounter++;
		emitter.insert(`\tvar ${FOR_IN_OBJ}${emitter.loopObjectCounter};\n\t\t`);
	}

	let nameTypeInitNode = varNode.findChild(NodeKind.NAME_TYPE_INIT);
	let nameNode:Node;
	let typeNode:Node;
	let typeStr:string = "";
	let castStr:string = "";
	let variableContNode = nameTypeInitNode ? nameTypeInitNode : node;
	nameNode = variableContNode.findChild(NodeKind.NAME);
	typeNode = variableContNode.findChild(NodeKind.TYPE);
	if (typeNode) {
		emitter.catchup(node.start);
		let typeRemapped = emitter.getTypeRemap(typeNode.text) || typeNode.text;
		emitter.ensureImportIdentifier(typeRemapped);
		typeStr = typeRemapped == undefined ? '' : ':' + typeRemapped;
		castStr = typeRemapped == undefined ? '' : '<' + typeRemapped + '>';
	}
	else {
		if (nameTypeInitNode) {
			let vecNode = nameTypeInitNode.findChild(NodeKind.VECTOR);
			if (vecNode) {
				if (WARNINGS >= 1) {
					console.log("emitter.ts: *** WARNING *** for iterators of type vector not supported. Please declare iterator outside of the for's header");
				}
			}
		}
	}
	emitter.catchup(node.start + Keywords.FOR.length + 1);
	emitter.skip(4); // "each"
	emitter.catchup(varNode.start);
	emitter.insert(`var ${FOR_IN_KEY}`);
	emitter.declareInScope({name:FOR_IN_KEY});
	emitter.skipTo(varNode.end);

	emitter.catchup(inNode.start);
	emitter.insert(' ');

	if (objNode.kind == NodeKind.ARRAY) {
		emitter.catchup(objNode.start);
		emitter.insert(` ${FOR_IN_OBJ}${emitter.loopObjectCounter} = `);
	}
	visitNodes(emitter, inNode.children);
	emitter.catchup(blockNode.start + 1);

	let def = emitter.findDefInScope(nameNode.text);
	if (def.type && castStr == "" ){
		castStr = `<${def.type.toString()}>`;
	}
	let declarationWord:string = "";
	if (nameTypeInitNode) {
		declarationWord = "var ";
		//emitter.declareInScope({name:nameNode.text});

	}
	else {
		if (def) {
			if (def.bound) {
				declarationWord = def.bound + ".";
			}
			else {
				declarationWord = "";
			}
		}
		else {
			declarationWord = "this.";
		}
	}



	/*  if(!objNode.text){

	 console.log("node", node);
	 }*/

	var obj_name = objNode.text;
	if (objNode.kind == NodeKind.ARRAY) {
		//TODO check nested object
		emitter.insert(`\n\t\t\t${ declarationWord }${ nameNode.text }${ typeStr } =${ castStr }  ${ FOR_IN_OBJ }${emitter.loopObjectCounter}[${ FOR_IN_KEY }];\n`);

	}
	else{

		if (objNode.children.length > 0 && obj_name == undefined) {
			obj_name = getNodeNameRecursive(objNode);
		}

		emitter.insert(`\n\t\t\t${ declarationWord }${ nameNode.text }${ typeStr } = ${ castStr }`);
		let lastIndex:number = emitter.getIndex();
		let inNodeChild = inNode.children[0];
		emitter.skipTo(inNode.start);
		emitter.consume("in", inNodeChild.start);
		visitNode(emitter, inNode);
		emitter.catchup(inNode.end);
		emitter.skipTo(lastIndex);
		emitter.insert (`[${ FOR_IN_KEY }];\n`);

	}

	visitNode(emitter, blockNode);

}

function getNodeNameRecursive(objNode:Node):string{
	var obj_name = objNode.text;
	if(obj_name != undefined)
		return obj_name;
	obj_name = "";
	if (objNode.children.length > 0) {
		if(objNode.kind==NodeKind.CALL) {
			for (var i = 0; i < objNode.children.length; i++) {
				obj_name += getNodeNameRecursive(objNode.children[i]);
				if (i < objNode.children.length - 2) {
					obj_name += ".";
				}
				else if (i == objNode.children.length - 1) {
					return obj_name += "()";
				}
			}
		}
		else if(objNode.kind==NodeKind.ARRAY_ACCESSOR) {
			for (var i = 0; i < objNode.children.length; i++) {
				if (i == objNode.children.length - 1) {
					obj_name += "[";
				}
				obj_name += getNodeNameRecursive(objNode.children[i]);
				if (i < objNode.children.length - 2) {
					obj_name += ".";
				}
				else if (i == objNode.children.length - 1) {
					obj_name += "]";
				}
			}
		}
		else  {
			for (var i = 0; i < objNode.children.length; i++) {
				obj_name += getNodeNameRecursive(objNode.children[i]);
				if (i != objNode.children.length - 1) {
					obj_name += ".";
				}
			}
		}
	}
	return obj_name;
}

function emitBlock(emitter:Emitter, node:Node):void {
	visitNodes(emitter, node.children);
}
function emitMinus(emitter:Emitter, node:Node):void {
	//emitter.insert("-");
	visitNodes(emitter, node.children);
}

function getClassDeclarations(emitter:Emitter, className:string, contentsNode:Node[]):Declaration[] {
	let found:{ [name:string]:boolean } = {};

	let resultDeclarations:Declaration[] = [];
	contentsNode.forEach(node => {

		//let nameNode:Node;
		let nameNodeList:Node[];

		switch (node.kind) {
			case NodeKind.SET:
			case NodeKind.GET:
			case NodeKind.FUNCTION:
				//nameNode = node.findChild(NodeKind.NAME);
				nameNodeList = node.findChildren(NodeKind.NAME);
				break;
			case NodeKind.VAR_LIST:
			case NodeKind.CONST_LIST:
				//nameNode = node.findChild(NodeKind.NAME_TYPE_INIT).findChild(NodeKind.NAME);
				nameNodeList = node.findChildren(NodeKind.NAME_TYPE_INIT)
				break;
			default:
				break;
		}
		if (!nameNodeList || nameNodeList.length == 0)
		{
			return null;
		}
		let modList = node.findChild(NodeKind.MOD_LIST);
		let isStatic = modList && modList.children.some(mod => mod.text === 'static');

		nameNodeList.forEach(nodeInit =>{
				let nameNode:Node = nodeInit.kind == NodeKind.NAME_TYPE_INIT ? nodeInit.findChild(NodeKind.NAME) : nodeInit;
				let typeNode:Node = nodeInit.kind == NodeKind.NAME_TYPE_INIT ? nodeInit : node.findChild(NodeKind.NAME_TYPE_INIT);
				if (!nameNode || found[nameNode.text]) {
					return null;
				}
				found[nameNode.text] = true;
				if (nameNode.text === className) {
					return;
				}

				let declaration = <Declaration>{
					name: nameNode.text,
					type: getDeclarationType(emitter, typeNode),
					bound: isStatic ? className : 'this'
				};
				resultDeclarations.push(declaration);
			}

		)



	})
	resultDeclarations = resultDeclarations.filter(el => !!el);
	return resultDeclarations;
}
/*
function getClassDeclarations(emitter:Emitter, className:string, contentsNode:Node[]):Declaration[] {
	let found:{ [name:string]:boolean } = {};

	return contentsNode.map(node => {
		let nameNode:Node;

		switch (node.kind) {
			case NodeKind.SET:
			case NodeKind.GET:
			case NodeKind.FUNCTION:
				nameNode = node.findChild(NodeKind.NAME);
				break;
			case NodeKind.VAR_LIST:
			case NodeKind.CONST_LIST:
				nameNode = node.findChild(NodeKind.NAME_TYPE_INIT).findChild(NodeKind.NAME);
				//nameNodeList
				break;
			default:
				break;
		}
		if (!nameNode || found[nameNode.text]) {
			return null;
		}
		found[nameNode.text] = true;
		if (nameNode.text === className) {
			return;
		}

		let modList = node.findChild(NodeKind.MOD_LIST);
		let isStatic = modList && modList.children.some(mod => mod.text === 'static');
		return {
			name: nameNode.text,
			type: getDeclarationType(emitter, node.findChild(NodeKind.NAME_TYPE_INIT)),
			bound: isStatic ? className : 'this'
		};
	}).filter(el => !!el);
}
*/


function emitClass(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	visitNode(emitter, node.findChild(NodeKind.META_LIST));
	let mods = node.findChild(NodeKind.MOD_LIST);
	if (mods && mods.children.length) {
		emitter.catchup(mods.start);
		emitter.insert("\n@classBound\n");
		let insertExport = false;
		mods.children.forEach(node => {
			if (node.text !== 'private') {
				insertExport = true;
			}
			emitter.skipTo(node.end);
		});
		if (insertExport) {
			emitter.insert('export');
		}
	}

	//let interfaces:string[] = [];
	let name = node.findChild(NodeKind.NAME);
	let content = node.findChild(NodeKind.CONTENT);
	let contentsNode = content && content.children;
	if (!contentsNode) {
		return;
	}


	// ensure extends identifier is being imported
	let extendsNode = node.findChild(NodeKind.EXTENDS);
	if (extendsNode) {
		emitIdent(emitter, extendsNode);
		emitter.isExtended = true;
		ClassList.addExtendToLast(extendsNode.text);
		emitter.ensureImportIdentifier(extendsNode.text);

	} else {
		emitter.isExtended = false;
	}

	// ensure implements identifiers are being imported
	let implementsNode = node.findChild(NodeKind.IMPLEMENTS_LIST);
	if (implementsNode) {
		implementsNode.children.forEach((node) => {
			emitter.ensureImportIdentifier(node.text);
			ClassList.addInterfaceToLast(node.text);
		})
	}

	emitter.withScope(getClassDeclarations(emitter, name.text, contentsNode), scope => {
		scope.className = name.text;
		let isInterfaceLinkPrinted:boolean = false;
		contentsNode.forEach(node => {
			visitNode(emitter, node.findChild(NodeKind.META_LIST));
			emitter.catchup(node.start);
			if (isInterfaceLinkPrinted == false) {
				//if (implementsNode) emitter.insert(`static ${INTERFACE_INF};\n`);
				if (implementsNode) {
					let classesList = ""
					implementsNode.children.forEach((node) => {

						classesList += `"${node.text}", `;
					});
					classesList = classesList.substring(0, classesList.length - 2);
					//emitter.insert(`\n${name.text}.${INTERFACE_INF} = [${classesList}];`);
					emitter.insert(`static ${INTERFACE_INF} = [${classesList}];\n`);
				}
				isInterfaceLinkPrinted = true;
			}
			// console.log(node)
			storeClassMember(node);
			switch (node.kind) {
				case NodeKind.SET:
					emitSet(emitter, node);
					break;
				case NodeKind.GET:
					emitGet(emitter, node);
					break;
				case NodeKind.FUNCTION:
					emitMethod(emitter, node);
					break;
				case NodeKind.VAR_LIST:
					emitPropertyDecl(emitter, node);
					break;
				case NodeKind.CONST_LIST:
					emitPropertyDecl(emitter, node, true);
					break;
				default:
					visitNode(emitter, node);
			}
		});

		let pathToRoot = ClassList.getLastPathToRoot();
		emitter.ensureImportIdentifier("classBound", `${pathToRoot}classBound`);
	});

	emitter.catchup(node.end);

}

function storeClassMember(node:Node):void
{
	let modeListNode = node.findChild(NodeKind.MOD_LIST);
	let isStatic:boolean = false;
	let isOverridden:boolean = false;
	let nsModifier:number = 0;
	if (modeListNode)
	{
		let modifiers = modeListNode.findChildren(NodeKind.MODIFIER);
		modifiers.forEach((mode) => {

			if (mode.text == Keywords.STATIC) isStatic = true;
			if (mode.text == Keywords.OVERRIDE) isOverridden = true;
			nsModifier = MODIFIERS[mode.text] ;
			//if (mode.text == Keywords.PUBLIC || )
		});
	}
	let nameNode:Node;
	let typeNode:Node;

	let namesInitList:Node[];

	switch (node.kind) {
		case NodeKind.SET:
		case NodeKind.GET:
		case NodeKind.FUNCTION:
			nameNode = node.findChild(NodeKind.NAME);
			typeNode = node.findChild(NodeKind.TYPE);
			break;
		case NodeKind.VAR_LIST:
		case NodeKind.CONST_LIST:
			let nameInitNode = node.findChild(NodeKind.NAME_TYPE_INIT);
			namesInitList = node.findChildren(NodeKind.NAME_TYPE_INIT);
			if (nameInitNode)
			{
				nameNode = nameInitNode.findChild(NodeKind.NAME);
				typeNode = nameInitNode.findChild(NodeKind.TYPE);
			}
			break;
		default:
			return;
	}
	if (namesInitList && namesInitList.length > 1)
	{

		for (var i = 0; i < namesInitList.length; i++) {
			let nameInitNode = namesInitList[i]
			if (nameInitNode)
			{
				nameNode = nameInitNode.findChild(NodeKind.NAME);
				typeNode = nameInitNode.findChild(NodeKind.TYPE);
				processClassMember(node, nameNode, typeNode, nsModifier, isStatic, isOverridden);
			}
		}
	}
	else
	{
		processClassMember(node, nameNode, typeNode, nsModifier, isStatic, isOverridden);
	}


}

function processClassMember(node:Node, nameNode:Node, typeNode:Node, nsModifier:number, isStatic:boolean, isOverridden:boolean):void
{
	let classMemberKind:number = 0;
	switch (node.kind) {
		case NodeKind.SET:
			classMemberKind = ClassMemberKind.SET;
			break;
		case NodeKind.GET:
			classMemberKind = ClassMemberKind.GET;
			break;
		case NodeKind.FUNCTION:
			classMemberKind = ClassMemberKind.METHOD;
			break;
		case NodeKind.VAR_LIST:
			classMemberKind = ClassMemberKind.VARIABLE;
			break;
		case NodeKind.CONST_LIST:
			classMemberKind = ClassMemberKind.CONST;
			break;
	}

	if (nameNode)
	{
		let typeStr = typeNode && typeNode.text ? typeNode.text : "";
		let classMember:ClassMember = new ClassMember(nameNode.text, ClassMemberKind.VARIABLE, typeStr);
		classMember.nsModifier = nsModifier ? nsModifier : ModifierKind.PROTECTED;
		classMember.isStatic = isStatic;
		classMember.isOverridden = isOverridden;
		classMember.kind = classMemberKind;
		if (isStatic)
		{
			ClassList.addStaticMemberToLast(classMember);
		}
		else
		{
			ClassList.addClassMemberToLast(classMember);
		}
		//console.log("***<" + nameNode.text +  ":" + typeStr + "/" + classMember.nsModifier  + "/isStatic:" + isStatic + "/isOverride:" + isOverride + ">***");


	}

}


function emitSet(emitter:Emitter, node:Node):void {
	emitClassField(emitter, node);

	let name = node.findChild(NodeKind.NAME);
	emitter.consume('function', name.start);

	let params = node.findChild(NodeKind.PARAMETER_LIST);
	visitNode(emitter, params);
	emitter.catchup(params.end);

	let type = node.findChild(NodeKind.TYPE);
	if (type) {
		emitter.skipTo(type.end);
	}

	emitter.withScope(getFunctionDeclarations(emitter, node), () => {
		visitNodes(emitter, node.getChildFrom(NodeKind.TYPE));
	});
}


function emitConstList(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	let nameTypeInit = node.findChild(NodeKind.NAME_TYPE_INIT);
	emitter.skipTo(nameTypeInit.start);
	emitter.insert('const ');
	visitNode(emitter, nameTypeInit);
}

function emitObjectValue(emitter:Emitter, node:Node):void {
	visitNodes(emitter, node.children);
}

function emitNameTypeInit(emitter:Emitter, node:Node):void {
	emitter.declareInScope({
		name: node.findChild(NodeKind.NAME).text,
		type: getDeclarationType(emitter, node)
	});
	emitter.catchup(node.start);
	visitNodes(emitter, node.children);
}

function emitMethod(emitter:Emitter, node:Node):void {
	var isConstructor:boolean = false;
	let name = node.findChild(NodeKind.NAME);
	if (node.kind !== NodeKind.FUNCTION || name.text !== emitter.currentClassName) {
		let pathToRoot = ClassList.getLastPathToRoot();
		emitter.ensureImportIdentifier("bound", `${pathToRoot}bound`);
		let mods = node.findChild(NodeKind.MOD_LIST);
		if (mods)
			emitter.catchup(mods.start);
		else
			emitter.catchup(name.start);
		emitter.insert("@bound\n");
		emitClassField(emitter, node);
		emitter.consume('function', name.start);
		emitter.catchup(name.end);
		//emitter.insert(" = ");

	} else {
		let mods = node.findChild(NodeKind.MOD_LIST);
		if (mods) {
			emitter.catchup(mods.start);
		}
		emitter.insert('constructor');
		isConstructor = true;

		// Check if the class extends an Array, in which an insertion
		// is required in the constructor. It's a weird
		// case but necessary.
		if (emitter.output.indexOf('extends Array') > -1) {

			// Prepare the injection.
			var className = name.text;
			var injection = '\nvar thisAny:any=this;\nthisAny.__proto__ = ' + className + '.prototype;\n';

			// Find position of insertion.
			// Enter child nodes and process 1 by 1...
			emitter.withScope(getFunctionDeclarations(emitter, node), () => {
				emitter.skipTo(name.end);
				var children = node.getChildFrom(NodeKind.NAME);
				for (var i:number = 0; i < children.length; i++) {
					var child = children[i];
					if (child.kind !== NodeKind.BLOCK) { // visit all other nodes normally
						visitNode(emitter, child);
						// emitter.skipTo(child.end);
					}
					else { // treat block node differently
						// Find super()
						for (var j:number = 0; j < child.children.length; j++) {
							var grandChild = child.children[j];
							visitNode(emitter, grandChild);
							emitter.catchup(grandChild.end + 1);
							if (containsSuperCall(grandChild)) {
								emitter.insert(injection);
							}
						}
					}
				}
			});

			return;
		}
		else {
			emitter.skipTo(name.end);
		}

		// // find "super" on constructor and move it to the beginning of the
		// // block
		// let blockNode = node.findChild(NodeKind.BLOCK);
		// let blockSuperIndex = -1;
		// for (var i = 0, len = blockNode.children.length; i < len; i++) {
		//     let blockChildNode = blockNode.children[i];
		//     if (blockChildNode.kind === NodeKind.CALL
		//         && blockChildNode.children[0].text === "super") {
		//         blockSuperIndex = i;
		//         break;
		//     }
		// }
		//
		// if (childCalls.length > 0) {
		//     console.log(childCalls)
		//     let superIndex = -1;
		//     childCalls.forEach((child, i) => {
		//         if (child.children[0].text === "super") superIndex = blockNode.children.indexOf(child);
		//     })
		//     console.log("super index:", superIndex)
		// }

	}
	//emitter.catchup(blockNode.start + 1);
	emitter.withScope(getFunctionDeclarations(emitter, node), () => {
		let children = node.getChildFrom(NodeKind.NAME);
		let nameNode = children[0];
		for (var i = 0; i < children.length; i++) {
			let childNode = children[i];
			//var implemented = emitter.scope.parent.parent.declarations[0].name; //can not use because it icludes also imports
			if (childNode.kind == NodeKind.BLOCK) {
				if (isConstructor) {
					if (emitter.isExtended) {
						emitter.catchup(childNode.start + 1);
						if (!containsSuperCall(childNode)) {
							emitter.insert("\n\t\tsuper();");
						}
					}
				}
				else {
					//emitter.insert(" => ");

				}
				visitNode(emitter, childNode);
				/*                if (isConstructor) {
				 let  blockChildren = childNode.children;
				 emitter.insert("super()");
				 let firstChild = blockChildren[0];
				 visitNode(emitter, firstChild);
				 for (var j = 1; j < blockChildren.length; j++) {
				 var blockChild = blockChildren[j];
				 visitNode(emitter, firstChild);
				 }
				 } else {
				 emitter.insert(" => ");
				 visitNode(emitter, childNode);
				 }*/
			}
			else {
				visitNode(emitter, childNode);
			}

		}
		//visitNodes(emitter, node.getChildFrom(NodeKind.NAME));

	});
}

function emitGet(emitter:Emitter, node:Node):void {
	let name = node.findChild(NodeKind.NAME);
	if (node.kind !== NodeKind.FUNCTION || name.text !== emitter.currentClassName) {
		emitClassField(emitter, node);
		emitter.consume('function', name.start);
		emitter.catchup(name.end);
	} else {
		let mods = node.findChild(NodeKind.MOD_LIST);
		if (mods) {
			emitter.catchup(mods.start);
		}
		emitter.insert('constructor');

		// Check if the class extends an Array, in which an insertion
		// is required in the constructor. It's a weird
		// case but necessary.
		if (emitter.output.indexOf('extends Array') > -1) {

			// Prepare the injection.
			var className = name.text;
			var injection = '\nvar thisAny:any=this;\nthisAny.__proto__ = ' + className + '.prototype;\n';

			// Find position of insertion.
			// Enter child nodes and process 1 by 1...
			emitter.withScope(getFunctionDeclarations(emitter, node), () => {
				emitter.skipTo(name.end);
				var children = node.getChildFrom(NodeKind.NAME);
				for (var i:number = 0; i < children.length; i++) {
					var child = children[i];
					if (child.kind !== NodeKind.BLOCK) { // visit all other nodes normally
						visitNode(emitter, child);
						// emitter.skipTo(child.end);
					}
					else { // treat block node differently
						// Find super()
						for (var j:number = 0; j < child.children.length; j++) {
							var grandChild = child.children[j];
							visitNode(emitter, grandChild);
							emitter.catchup(grandChild.end + 1);
							if (containsSuperCall(grandChild)) {
								emitter.insert(injection);
							}
						}
					}
				}
			});

			return;
		}
		else {
			emitter.skipTo(name.end);
		}


	}
	emitter.withScope(getFunctionDeclarations(emitter, node), () => {
		visitNodes(emitter, node.getChildFrom(NodeKind.NAME));
	});
}

function containsSuperCall(node:Node):boolean {
	for (var i:number = 0; i < node.children.length; i++) {
		var child = node.children[i];
		if (child.text === 'super') {
			return true;
		}
		return containsSuperCall(child);
	}
	return false;
}


function emitPropertyDecl(emitter:Emitter, node:Node, isConst = false):void {

	let names = node.findChildren(NodeKind.NAME_TYPE_INIT);
	if (names.length > 1)
	{
		//emitter.insert("<prop:>");
		let typeNode:Node;
		let typeStr:string;
		let lastNameNode = names[names.length -1];
		let type = lastNameNode.findChild(NodeKind.TYPE);
		if (type.text != "") typeNode = type;
		typeStr = typeNode ? `:${typeNode.text}` : "";

		let mods = node.findChild(NodeKind.MOD_LIST);
		let start = node.start;
		names.forEach((nameTypeInit, i) => {
			emitClassField(emitter, node);
			emitter.consume(isConst ? Keywords.CONST : Keywords.VAR, nameTypeInit.start);
			//visitNode(emitter, name);


			emitter.declareInScope({
				name: nameTypeInit.findChild(NodeKind.NAME).text,
				type: getDeclarationType(emitter, node)
			});
			//emitter.catchup(nameTypeInit.start);
			let nameNode:Node = nameTypeInit.children[0];
			//let typeNode:Node = nameTypeInit.children[1];
			//visitNodes(emitter, nameTypeInit.children);
			//emitter.index

			emitter.insert(` ${nameNode.text}`);
			if (typeNode)
			{
				emitter.insert(":");
				emitter.skipTo(typeNode.start);
				visitNode(emitter, typeNode);
				emitter.insert(";\n\t");
			}

			//emitter.insert(`${typeStr};\n\t`);
			emitter.setIndexPos(start);
		})
		//emitter.insert("</prop:>");
		emitter.skipTo(node.nextSibling.start);
	}
	else
	{
		emitClassField(emitter, node);
		names.forEach((nameTypeInit, i) => {
			if (i === 0) {
				emitter.consume(isConst ? Keywords.CONST : Keywords.VAR, nameTypeInit.start);
			}
			visitNode(emitter, nameTypeInit);
		})
	}


}


function emitClassField(emitter:Emitter, node:Node):void {
	let mods = node.findChild(NodeKind.MOD_LIST);
	if (mods) {
		emitter.catchup(mods.start);
		mods.children.forEach(node => {
			emitter.catchup(node.start);
			if (node.text !== Keywords.PRIVATE &&
				node.text !== Keywords.PUBLIC &&
				node.text !== Keywords.PROTECTED &&
				node.text !== Keywords.STATIC) {
				emitter.commentNode(node, false);
			}
			emitter.catchup(node.end);
		});
	}
}


function emitDeclaration(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	visitNode(emitter, node.findChild(NodeKind.META_LIST));
	let mods = node.findChild(NodeKind.MOD_LIST);
	if (mods && mods.children.length) {
		emitter.catchup(mods.start);
		let insertExport = false;
		mods.children.forEach(node => {
			if (node.text !== 'private') {
				insertExport = true;
			}
			emitter.skipTo(node.end);
		});
		if (insertExport) {
			emitter.insert('export');
		}
	}
}


function emitType(emitter:Emitter, node:Node):void {
	// Don't emit type on 'constructor' functions.
	if (node.parent.kind === NodeKind.FUNCTION) {
		let name = node.parent.findChild(NodeKind.NAME);
		if (name && name.text === emitter.currentClassName) {
			emitter.catchup(node.previousSibling.end);
			emitter.skipTo(node.end);
			return;
		}
	}

	emitter.catchup(node.start);

	if (!node.text) {
		if (node.kind === NodeKind.VECTOR) {
			emitVector(emitter, node);
		}
		return;
	}

	emitter.skipTo(node.end);

	// ensure type is imported
	if (
		GLOBAL_NAMES.indexOf(node.text) === -1 && !emitter.getTypeRemap(node.text) &&
		TYPE_REMAP_VALUES.indexOf(node.text) === -1
	) {
		emitter.ensureImportIdentifier(node.text);
	}

	let typeName = emitter.getTypeRemap(node.text) || node.text;

	emitter.insert(typeName);
}


function emitVector(emitter:Emitter, node:Node):void {
	if (!emitter.isNew) {
		emitter.catchup(node.start);
	}

	let type = node.findChild(NodeKind.TYPE);
	if (!type) {
		type = createNode(NodeKind.TYPE, {
			text: 'any',
			start: node.start,
			end: node.end
		});
		type.parent = node;
	}

	emitter.skipTo(type.start);

	if (!emitter.isNew) {
		emitType(emitter, type);
	}

	emitter.insert('[]');

	emitter.skipTo(node.end);
}


function emitShortVector(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	let vector = node.findChild(NodeKind.VECTOR);
	emitter.insert('Array');
	let type = vector.findChild(NodeKind.TYPE);
	if (type) {
		emitType(emitter, type);
	} else {
		emitter.insert('any');
	}
	emitter.catchup(vector.end);
	emitter.insert('(');
	let arrayLiteral = node.findChild(NodeKind.ARRAY);
	emitArray(emitter, arrayLiteral);
	emitter.insert(')');
	emitter.skipTo(node.end);
}


function emitNew(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	emitter.isNew = true;
	emitter.emitThisForNextIdent = false;
	visitNodes(emitter, node.children);
	emitter.isNew = false;
	emitter.emitThisForNextIdent = true;
}

function emitCall(emitter:Emitter, node:Node):void {

	let isNew = emitter.isNew;
	emitter.isNew = false;

	let isRETURNINDEXEDARRAY = false;
	//is RETURNINDEXEDARRAY
	let args = node.findChild(NodeKind.ARGUMENTS);
	if (args){
		let arrayDotNode = args.findChild(NodeKind.DOT);
		if (arrayDotNode) {
			let arrayCNode = arrayDotNode.children[0] as Node;
			let literalNode = arrayDotNode.children[1] as Node;
			if (arrayCNode && arrayCNode && literalNode.text == 'RETURNINDEXEDARRAY') {
				let callDot = node.findChild(NodeKind.DOT);
				if (callDot){
					let identifierNode = callDot.findChild(NodeKind.IDENTIFIER);
					let literalSortNode = callDot.findChild(NodeKind.LITERAL);
					if (identifierNode && literalSortNode && literalSortNode.text == 'sort'){
						//emitter.consume(")", 1);
						emitter.catchup(node.start);
						emitter.skipTo(node.end);
						emitter.insert(`AS3Utils.sortRETURNINDEXEDARRAY(${identifierNode.text})`);
						let pathToRoot = ClassList.getLastPathToRoot();
						emitter.ensureImportIdentifier(AS3_UTIL, `${pathToRoot}${AS3_UTIL}`);
						//emitter.insert("*|*");

						isRETURNINDEXEDARRAY = true;

					}
				}

			}
		}
	}

	if (node.children[0].kind === NodeKind.VECTOR) {
		if (isNew) {
			let vector = node.children[0];
			let args = node.children[1];
			emitter.insert('[');
			if (WARNINGS >= 2 && args.children.length > 0) {
				console.log("emitter.ts: *** MINOR WARNING *** emitCall() => NodeKind.VECTOR with arguments not implemented.");
			}
			emitter.insert(']');
			emitter.skipTo(args.end);

			return;
		}
		else {
			if (isCast(emitter, node)) {
				emitter.catchup(node.start);
				emitter.insert('<');
				const vec:Node = node.findChild(NodeKind.VECTOR);
				visitNodes(emitter, [vec]);
				emitter.insert('>');
				const args:Node = node.findChild(NodeKind.ARGUMENTS);
				emitter.skipTo(args.start);
				visitNodes(emitter, [args]);
				return;
			}
		}
	}
	else {
		if (!isNew && isCast(emitter, node)) {
			const type:Node = node.findChild(NodeKind.IDENTIFIER);
			const args:Node = node.findChild(NodeKind.ARGUMENTS);
			const rtype:string = emitter.getTypeRemap(type.text) || type.text;
			emitter.catchup(node.start);
			if (rtype === "string" || rtype === "number") {
				emitter.catchup(node.start);
			}
			else {
				emitter.insert('<');
				emitter.insert(rtype);
				emitter.insert('>');
				emitter.skipTo(args.start);
				visitNodes(emitter, [args]);
				return;
			}
		}
		else {
			emitter.catchup(node.start);
		}
	}

 	if (isRETURNINDEXEDARRAY == false)visitNodes(emitter, node.children);

}

function isCast(emitter:Emitter, node:Node):boolean {

	if (node.children.length == 0) {
		return false;
	}
	const isVector = node.children[0].kind === NodeKind.VECTOR;
	if (isVector && !emitter.isNew) {
		return true;
	}

	const type:Node = node.findChild(NodeKind.IDENTIFIER);
	if (!type || !type.text) {
		return false;
	}

	const declaration = emitter.findDefInScope(type.text);

	if (declaration) {
		return false;
	}

	// If the declaration is not found in scope, AND
	// starts with an uppercase, consider it a cast.
	// (this is quite vague, but its a start)
	const firstLetter = type.text.substring(0, 1);
	if (firstLetter === firstLetter.toLowerCase()) {
		return false;
	}

	emitter.ensureImportIdentifier(type.text);
	return true;
}


function emitCatch(emitter:Emitter, node:Node):void {
	emitter.declareInScope({name: node.children[0].text})
	emitter.catchup(node.start);
	visitNodes(emitter, node.children);
}


function emitRelation(emitter:Emitter, node:Node):void {

	emitter.catchup(node.start);

	// Check for 'as' in relation.
	let as = node.findChild(NodeKind.AS);
	if (as) {
		// TODO: implement relation with type cast to vectors
		//       e.g. (myVector as Vector.<Boolean>)
		if (node.lastChild.kind === NodeKind.IDENTIFIER) {
			emitter.insert('(<');
			let typeText = emitter.getTypeRemap(node.lastChild.text) || node.lastChild.text;

			emitter.insert(typeText);
			emitter.ensureImportIdentifier(typeText);
			emitter.insert('>');
			visitNodes(emitter, node.getChildUntil(NodeKind.AS));
			emitter.catchup(as.start);
			emitter.insert(')');
			emitter.skipTo(node.end);

		} else if (node.lastChild.kind === NodeKind.VECTOR) {
			visitNodes(emitter, node.children);
		} else {
			emitter.commentNode(node, false);
		}
		return;
	}

	// Check for 'is' in relation.
	let is = containsIsKeyword(node);
	if (is) {

		// Determine if the check is against a primitive or a custom type.
		// console.log(node.toString());
		var isPrimitiveCheck:boolean = containsPrimitiveIdentifier(node);
		var isClassCheck:boolean = containsClassIdentifier(node);
		if (isPrimitiveCheck || isClassCheck) {

			// Identify players.
			var varNode = node.children[0];
			var isNode = node.children[1];
			var typeNode = node.children[2];

			// Insert 'typeof' before instance name.
			emitter.catchup(node.start);
			emitter.insert('typeof ');
			// Emit variable name.
			visitNode(emitter, varNode);

			// 80pro hotfix for missing "]"
			if (varNode.kind == NodeKind.ARRAY_ACCESSOR) {
				emitter.insert('] ');
			}

			emitter.skipTo(varNode.end);
			// Emit equality check.
			emitter.insert(' === ');
			//emitter.insert(' instanceof ');

			// Replace type with string comparison.

			let typeRemapped = emitter.getTypeRemap(typeNode.text) || typeNode.text;
			//if (typeRemapped == "number") typeRemapped = "Number";
			//if (typeRemapped == "string") typeRemapped = "String";
			if (isClassCheck) typeRemapped = "function";
			emitter.insert(`'${typeRemapped}'`);
			if (isClassCheck == false) emitter.ensureImportIdentifier(typeRemapped);

			// Skip the rest... 'is Number/String/Boolean'
			emitter.skipTo(node.end);

			return;
		}
		else {
/*			// TODO: custom type interface checks are currently not checked by the compiler
			if (WARNINGS >= 1) {
				console.log("emitter.ts: *** WARNING *** custom type interface checks are currently not treated by the compiler.");
			}*/
			let children = node.children;
			let leftIdent = children[0];
			let castedStr:string;
			let castedComplexNode:Node;
			let arrayAccessorNode:Node;
			if (leftIdent.kind == NodeKind.IDENTIFIER)
			{
				castedStr = leftIdent.text;
			} else
			{
				castedComplexNode = leftIdent;
			}

			let middleNode = children[1];
			let rightIdent = children[2];
			//visitNode(emitter, leftIdent);
			//visitNode(emitter, middleNode);
			let isInterface = ClassList.checkIsInterface(rightIdent.text);
			if (isInterface)
			{
				emitter.insert(`${AS3_UTIL}.${INTERFACE_METHOD}(`);
				if (castedStr){
					emitter.insert(castedStr);
				} else if (castedComplexNode){
					visitNode(emitter, castedComplexNode);
					emitter.catchup(castedComplexNode.end);
				}

				emitter.insert (`, "${rightIdent.text}")`);

				if ((VERBOSE_MASK & ReportFlags.EXT_AST_SHOW_CASTING_INTERFACE) == ReportFlags.EXT_AST_SHOW_CASTING_INTERFACE) {
					console.log(">>>Class: " + ClassList.currentClassRecord.getFullPath() + "; ident: " + castedStr + " casts "  + isInterface.getFullPath());
				}
			}
			else
			{
/*				if (castedStr){
					emitter.insert(castedStr);
				}else if (castedComplexNode){

					visitNode(emitter, castedComplexNode);
					emitter.catchup(castedComplexNode.end);
				}*/

				if (rightIdent.text === 'Class'){

				}
				else
				{

				}
				visitNode(emitter, leftIdent);
				emitter.catchup(leftIdent.end);
				emitter.insert(` instanceof ${rightIdent.text}`);
			}

			emitter.skipTo(node.end);
			let pathToRoot = ClassList.getLastPathToRoot();
			emitter.ensureImportIdentifier(AS3_UTIL, `${pathToRoot}${AS3_UTIL}`);
			return
		}
	}

	visitNodes(emitter, node.children);
}

function containsIsKeyword(node:Node) {
	for (var i:number = 0; i < node.children.length; i++) {
		var child:Node = node.children[i];
		if (child.text == 'is') {
			return true;
		}
	}
	return false;
	;
}

function containsPrimitiveIdentifier(node:Node) {
	for (var i:number = 0; i < node.children.length; i++) {
		var child:Node = node.children[i];
		if (child.kind == NodeKind.IDENTIFIER) {
			if (child.text === 'Number' || child.text === 'String' || child.text === 'Boolean') {
				return true;
			}
		}
	}
	return false;
}
function containsClassIdentifier(node:Node) {
	for (var i:number = 0; i < node.children.length; i++) {
		var child:Node = node.children[i];
		if (child.kind == NodeKind.IDENTIFIER) {
			if (child.text === 'Class') {
				return true;
			}
		}
	}
	return false;
}

function emitOp(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	if (node.text === Keywords.IS) {
		emitter.insert(Keywords.INSTANCE_OF);
		emitter.skipTo(node.end);
		return;
	}
	emitter.catchup(node.end);
}

function emitOr(emitter:Emitter, node:Node):void {
	// // TODO: support for `value ||= 10` expressions;
	// if (node.children.length === 3 && node.children[2].text === "=")
	// {
	//     node.children[2].text = node.children[0].text + " =";
	// }

	emitter.catchup(node.start);
	visitNodes(emitter, node.children);
}


export function emitIdent(emitter:Emitter, node:Node):void {
	if (node.text == "getDefinitionByName") {
		let pathToRoot = ClassList.getLastPathToRoot();
		emitter.ensureImportIdentifier(AS3_UTIL, `${pathToRoot}${AS3_UTIL}`);
	}
	emitter.catchup(node.start);
	let staticRef:ClassRecord;
	if (ClassList.isScanning == false)
	{
		staticRef = ClassList.checkIsStaticParentMamber(node.text);
		if (staticRef && (VERBOSE_MASK & ReportFlags.EXT_AST_SHOW_PARENT_STATIC) == ReportFlags.EXT_AST_SHOW_PARENT_STATIC) {
			console.log(">>> Static in parent: " + node.text + "  " + staticRef.getFullPath());
		}
		if ((VERBOSE_MASK & ReportFlags.EXT_AST_SHOW_ALL_STATIC) == ReportFlags.EXT_AST_SHOW_ALL_STATIC) {
			let allStatic = ClassList.checkIsStatic(node.text);
			if (allStatic) console.log(">>> Static ref: " + node.text + "  " + allStatic.getFullPath());

		}
		if ((VERBOSE_MASK & ReportFlags.EXT_AST_SHOW_STATIC_VARIABLES) == ReportFlags.EXT_AST_SHOW_STATIC_VARIABLES) {
			let staticVariable = ClassList.checkIsStaticVariable(node.text);
			if (staticVariable) console.log(">>> Static variable: " + node.text + "  " + staticVariable.getFullPath());

		}


	}

	if (node.parent && node.parent.kind === NodeKind.DOT) {
		//in case of dot just check the first
		if (node.parent.children[0] !== node) {
			return;
		}
	}

	if (Keywords.isKeyWord(node.text)) {
		emitter.insert(node.text);
		emitter.skipTo(node.end);
		return;
	}

	let def = emitter.findDefInScope(node.text);
	if (def && def.bound) {
		emitter.insert(def.bound + '.');
	}
	if (staticRef){
		emitter.ensureImportIdentifier(staticRef.className);
		emitter.insert(staticRef.className + ".");
	} else {
		let isClassMember = ClassList.checkIsClassMember(node.text);
		let IsSuperClassName = ClassList.checkIdentIsSuperClassName(node.text);
/*		if (isClassMember)
		{
			if (ClassList.checkIsParentIdent(node.text) == false) {
				if (emitter.emitThisForNextIdent) emitter.insert('this.');

			}

		}*/
		if (!def &&
			emitter.currentClassName &&
			GLOBAL_NAMES.indexOf(node.text) === -1 &&
			TYPE_REMAP[node.text] === undefined &&
			node.text !== emitter.currentClassName
		) {
			if (node.text.match(/^[A-Z]/)) {
				// Import missing identifier from this namespace
				if (!emitter.options.useNamespaces) {
					if (staticRef == undefined)
					{
						emitter.ensureImportIdentifier(node.text);
					}

				}

			} else if (emitter.emitThisForNextIdent) {
				// Identifier belongs to `this.` scope.
				emitter.insert('this.');
			}
		}
	}

	// emitter.ensureImportIdentifier(node.text);

	node.text = emitter.getIdentifierRemap(node.text) || node.text;

	emitter.insert(node.text);
	emitter.skipTo(node.end);
	emitter.emitThisForNextIdent = true;

}

function emitDot(emitter:Emitter, node:Node) {
	let dotSibling = node.nextSibling;
	let isConditionalCompilation = (dotSibling && dotSibling.kind === NodeKind.BLOCK);
	let template = "if ($1)";

	if (!isConditionalCompilation && node.parent.kind === NodeKind.CONDITION) {
		let separator = emitter.sourceBetween(node.children[0].end, node.children[0].end + 2);
		isConditionalCompilation = (separator === "::");
		template = "$1";
	}

	// wrap conditional compilation into Node.js conditional for
	// `process.env.VARIABLE`
	//
	// More info about Flex conditional compilation:
	// http://help.adobe.com/en_US/flex/using/WS2db454920e96a9e51e63e3d11c0bf69084-7abd.html

	if (isConditionalCompilation) {
		emitter.catchup(node.start);
		emitter.insert(template.replace("$1", `process.env.${ node.children[1].text.toUpperCase() }`));
		emitter.skipTo(node.end);
		return;

	} else {
		// TODO: allow conditional compilation for function/class definitions

	}

	visitNodes(emitter, node.children);
}

function emitXMLLiteral(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	emitter.insert(JSON.stringify(node.text));
	emitter.skipTo(node.end);
}

function emitLiteral(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	emitter.insert(node.text);
	emitter.skipTo(node.end);
}

function emitArray(emitter:Emitter, node:Node):void {
	emitter.catchup(node.start);
	emitter.insert('[');
	if (node.children.length > 0) {
		//emitter.skipTo(node.children[0].start);
		emitter.skip(1);
		//emitter.consume("\n", node.children[0].start);
		emitter.consumeRegExp(/\s+(?=\W)/m, node.children[0].start);
		visitNodes(emitter, node.children);
		emitter.catchup(node.lastChild.end);
	}
	emitter.insert(']');
	emitter.skipTo(node.end);
}



export function emit(ast:Node, source:string, options?:EmitterOptions):string {
	let emitter = new Emitter(source, options);
	return emitter.emit(ast);
=======
  public isNew = false;
  public emitThisForNextIdent = true;

  public source: string;
  public options: EmitterOptions;

  public headOutput = "";

  public output = "";
  public index = 0;

  public rootScope: Scope = null;
  public scope: Scope = null;

  constructor(source: string, options?: EmitterOptions) {
    this.source = source;
    this.options = assign(
      {
        lineSeparator: "\n",
        useNamespaces: false,
        customVisitors: [],
      },
      options || {}
    );
  }

  emit(ast: Node): string {
    this.withScope([], (rootScope) => {
      this.rootScope = rootScope;
      visitNode(this, filterAST(ast));
      this.catchup(this.source.length - 1);
    });
    return this.headOutput + this.output;
  }

  enterScope(declarations: Declaration[]): Scope {
    return (this.scope = { parent: this.scope, declarations });
  }

  exitScope(checkScope: Scope = null): void {
    if (checkScope && this.scope !== checkScope) {
      throw new Error("Mismatched enterScope() / exitScope().");
    }
    if (!this.scope) {
      throw new Error("Unmatched exitScope().");
    }
    this.scope = this.scope.parent;
  }

  withScope(declarations: Declaration[], body: (scope: Scope) => void): void {
    let scope = this.enterScope(declarations);
    try {
      body(scope);
    } finally {
      this.exitScope(scope);
    }
  }

  get currentClassName(): string {
    for (var scope = this.scope; scope; scope = scope.parent) {
      if (scope.className) {
        return scope.className;
      }
    }
    return null;
  }

  declareInScope(declaration: Declaration): void {
    let previousDeclaration: Declaration = null;
    for (var i = 0, len = this.scope.declarations.length; i < len; i++) {
      if (this.scope.declarations[i].name === declaration.name) {
        previousDeclaration = this.scope.declarations[i];
      }
    }

    if (previousDeclaration) {
      if (declaration.type !== undefined)
        previousDeclaration.type = declaration.type;
      if (declaration.bound !== undefined)
        previousDeclaration.bound = declaration.bound;
    } else {
      this.scope.declarations.push(declaration);
    }
  }

  findDefInScope(text: string): Declaration {
    let scope = this.scope;
    while (scope) {
      for (let i = 0; i < scope.declarations.length; i++) {
        if (scope.declarations[i].name === text) {
          return scope.declarations[i];
        }
      }
      scope = scope.parent;
    }
    return null;
  }

  commentNode(node: Node, catchSemi: boolean): void {
    this.insert("/*");
    this.catchup(node.end);
    let index = this.index;
    if (catchSemi) {
      while (true) {
        if (index >= this.source.length) {
          break;
        }
        if (this.source[index] === "\n") {
          this.catchup(index);
          break;
        }
        if (this.source[index] === ";") {
          this.catchup(index + 1);
          break;
        }
        index++;
      }
    }
    this.insert("*/");
  }

  catchup(index: number): void {
    if (this.index >= index) {
      return;
    }
    let text = this.sourceBetween(this.index, index);
    this.index = index;
    this.insert(text);
  }

  sourceBetween(start: number, end: number) {
    return this.source.substring(start, end);
  }

  skipTo(index: number): void {
    this.index = index;
  }

  skip(number: number): void {
    this.index += number;
  }

  insert(string: string): void {
    this.output += string;
  }

  consume(string: string, limit: number): void {
    let index = this.source.indexOf(string, this.index) + string.length;
    if (index > limit || index < this.index) {
      throw new Error("invalid consume");
    }
    this.index = index;
  }

  /**
   * Utilities
   */
  ensureImportIdentifier(
    identifier: string,
    from = `./${identifier}`,
    checkGlobals = true
  ): void {
    let isGloballyAvailable = checkGlobals
      ? GLOBAL_NAMES.indexOf(identifier) >= 0
      : false;

    // change to root scope temporarily
    let previousScope = this.scope;
    this.scope = this.rootScope;

    // Ensure this file is not declaring this class
    if (
      this.source.indexOf(`class ${identifier}`) === -1 &&
      !isGloballyAvailable &&
      !this.findDefInScope(identifier)
    ) {
      this.headOutput += `import { ${identifier} } from "${from}";\n`;
      this.declareInScope({ name: identifier });
    }

    // change back to previous scope
    this.scope = previousScope;
  }

  getTypeRemap(text: string): string {
    for (let i = 0, l = this.options.customVisitors.length; i < l; i++) {
      let customVisitor = this.options.customVisitors[i];
      if (customVisitor.typeMap && customVisitor.typeMap[text]) {
        return customVisitor.typeMap[text];
      }
    }
    return TYPE_REMAP[text];
  }

  getIdentifierRemap(text: string): string {
    for (let i = 0, l = this.options.customVisitors.length; i < l; i++) {
      let customVisitor = this.options.customVisitors[i];
      if (customVisitor.identifierMap && customVisitor.identifierMap[text]) {
        return customVisitor.identifierMap[text];
      }
    }
    return IDENTIFIER_REMAP[text];
  }
}

function emitPackage(emitter: Emitter, node: Node): void {
  if (emitter.options.useNamespaces) {
    emitter.catchup(node.start);
    emitter.skip(Keywords.PACKAGE.length);
    emitter.insert("namespace");
    visitNodes(emitter, node.children);
  } else {
    emitter.catchup(node.start);
    emitter.skip(Keywords.PACKAGE.length + node.children[0].text.length + 4);

    visitNodes(emitter, node.children);
    emitter.catchup(node.end - 1);
    emitter.skip(1);
  }
}

function emitMeta(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  emitter.commentNode(node, false);
}

function emitInclude(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  emitter.commentNode(node, true);
}

function emitImport(emitter: Emitter, node: Node): void {
  let statement = Keywords.IMPORT + " ";

  // emit one import statement for each definition found in that namespace
  if (node.text.indexOf("*") !== -1) {
    let ns = node.text.substring(0, node.text.length - 2);
    let definitions = emitter.options.definitionsByNamespace[ns];

    let skipTo = node.end;

    if (definitions && definitions.length > 0) {
      definitions.forEach((definition) => {
        let importNode = createNode(node.kind, node);
        importNode.text = `${ns}.${definition}`;
        importNode.parent = node.parent;
        emitImport(emitter, importNode);
        emitter.insert(";\n");
      });

      skipTo = node.end + Keywords.IMPORT.length + 2;
    } else {
      emitter.catchup(node.start);
      node.end += node.text.length - ns.length + 6;
      emitter.commentNode(node, true);
      skipTo = node.end;
      console.warn(
        `emitter.ts: emitImport() => : nothing found to import on namespace ${ns}. (import ${node.text})`
      );
    }

    emitter.skipTo(skipTo);
    return;
  }

  let text = node.text.concat();
  let hasCustomVisitor = false;

  // apply custom visitor import maps
  for (let i = 0, l = emitter.options.customVisitors.length; i < l; i++) {
    let customVisitor = emitter.options.customVisitors[i];
    if (customVisitor.imports) {
      hasCustomVisitor = true;
      customVisitor.imports.forEach((replacement, regexp) => {
        text = text.replace(regexp, replacement);
      });
    }
  }

  // // apply "bridge" translation
  // if (emitter.hasBridge && emitter.options.bridge.imports) {
  //     text = node.text.concat();
  //     emitter.options.bridge.imports.forEach((replacement, regexp) => {
  //         text = text.replace(regexp, replacement);
  //     });
  // }

  if (emitter.options.useNamespaces) {
    emitter.catchup(node.start);
    emitter.insert(statement);

    let split = node.text.split(".");
    let name = split[split.length - 1];
    emitter.insert(name + " = ");

    // apply custom visitor translation
    if (hasCustomVisitor) {
      let diff = node.text.length - text.length;

      emitter.insert(text);
      emitter.skip(text.length + diff + statement.length);
    } else {
      emitter.catchup(node.end + statement.length);
    }

    emitter.declareInScope({ name });
  } else {
    emitter.catchup(node.start);
    emitter.insert(Keywords.IMPORT + " ");

    let split = text.split(".");
    let name = split.pop();

    // Find current module name to output relative import
    let currentModule = "";
    let parentNode = node.parent;
    while (parentNode) {
      if (parentNode.kind === NodeKind.PACKAGE) {
        currentModule = parentNode.children[0].text;
        break;
      }
      parentNode = parentNode.parent;
    }

    text = `{ ${name} } from "${getRelativePath(
      currentModule.split("."),
      text.split(".")
    )}"`;
    emitter.insert(text);
    emitter.skipTo(node.end + Keywords.IMPORT.length + 1);
    emitter.declareInScope({ name });
  }
}

function getRelativePath(currentPath: string[], targetPath: string[]) {
  while (currentPath.length > 0 && targetPath[0] === currentPath[0]) {
    currentPath.shift();
    targetPath.shift();
  }

  let relative =
    currentPath.length === 0 ? "." : currentPath.map(() => "..").join("/");

  return `${relative}/${targetPath.join("/")}`;
}

function getDeclarationType(emitter: Emitter, node: Node): string {
  let declarationType: string = null;
  let typeNode = node && node.findChild(NodeKind.TYPE);

  if (typeNode) {
    declarationType = emitter.getTypeRemap(typeNode.text) || typeNode.text;
  }

  return declarationType;
}

function emitInterface(emitter: Emitter, node: Node): void {
  emitDeclaration(emitter, node);

  //we'll catchup the other part
  emitter.declareInScope({
    name: node.findChild(NodeKind.NAME).text,
  });

  // ensure extends identifier is being imported
  let extendsNode = node.findChild(NodeKind.EXTENDS);
  if (extendsNode) {
    emitter.ensureImportIdentifier(extendsNode.text);
  }

  let content = node.findChild(NodeKind.CONTENT);
  let contentsNode = content && content.children;
  let foundVariables: { [name: string]: boolean } = {};
  if (contentsNode) {
    contentsNode.forEach((node) => {
      visitNode(emitter, node.findChild(NodeKind.META_LIST));
      emitter.catchup(node.start);
      let type = node.findChild(NodeKind.TYPE) || node.children[2];

      if (node.kind === NodeKind.TYPE && node.text === "function") {
        emitter.skip(Keywords.FUNCTION.length + 1);
        visitNode(emitter, node.findChild(NodeKind.PARAMETER_LIST));
        visitNode(emitter, type);
      } else if (node.kind === NodeKind.GET || node.kind === NodeKind.SET) {
        let name = node.findChild(NodeKind.NAME);
        let parameterList = node.findChild(NodeKind.PARAMETER_LIST);
        if (!foundVariables[name.text]) {
          emitter.skipTo(name.start);
          emitter.catchup(name.end);
          foundVariables[name.text] = true;

          if (node.kind === NodeKind.GET) {
            emitter.skipTo(parameterList.end);
            if (type) {
              emitType(emitter, type);
            }
          } else if (node.kind === NodeKind.SET) {
            let parameterNode = parameterList.findChild(NodeKind.PARAMETER);
            let nameTypeInit = parameterNode.findChild(NodeKind.NAME_TYPE_INIT);
            emitter.skipTo(nameTypeInit.findChild(NodeKind.NAME).end);
            type = nameTypeInit.findChild(NodeKind.TYPE);
            if (type) {
              emitType(emitter, type);
            }
            emitter.skipTo(node.end);
          }
        } else {
          emitter.commentNode(node, true);
        }
      } else {
        //include or import in interface content not supported
        emitter.commentNode(node, true);
      }
    });
  }
}

function getFunctionDeclarations(emitter: Emitter, node: Node): Declaration[] {
  let decls: Declaration[] = [];
  let params = node.findChild(NodeKind.PARAMETER_LIST);
  if (params && params.children.length) {
    decls = params.children.map((param) => {
      let nameTypeInit = param.findChild(NodeKind.NAME_TYPE_INIT);
      if (nameTypeInit) {
        return {
          name: nameTypeInit.findChild(NodeKind.NAME).text,
          type: getDeclarationType(emitter, nameTypeInit),
        };
      }
      let rest = param.findChild(NodeKind.REST);
      return { name: rest.text };
    });
  }
  let block = node.findChild(NodeKind.BLOCK);
  if (block) {
    function traverse(node: Node): Declaration[] {
      let result: Declaration[] = [];
      if (
        node.kind === NodeKind.VAR_LIST ||
        node.kind === NodeKind.CONST_LIST ||
        node.kind === NodeKind.VAR ||
        node.kind === NodeKind.CONST
      ) {
        result = result.concat(
          node
            .findChildren(NodeKind.NAME_TYPE_INIT)
            .map((node) => ({ name: node.findChild(NodeKind.NAME).text }))
        );
      }
      if (
        node.kind !== NodeKind.FUNCTION &&
        node.children &&
        node.children.length
      ) {
        result = Array.prototype.concat.apply(
          result,
          node.children.map(traverse)
        );
      }
      return result.filter((decl) => !!decl);
    }

    decls = decls.concat(traverse(block));
  }
  return decls;
}

function emitFunction(emitter: Emitter, node: Node): void {
  emitDeclaration(emitter, node);
  emitter.withScope(getFunctionDeclarations(emitter, node), () => {
    let rest = node.getChildFrom(NodeKind.MOD_LIST);
    visitNodes(emitter, rest);
  });
}

function emitForEach(emitter: Emitter, node: Node): void {
  let varNode = node.children[0];
  let inNode = node.children[1];
  let blockNode = node.children[2];

  emitter.catchup(node.start + Keywords.FOR.length + 1);
  emitter.skip(4); // "each"

  let nameTypeInitNode = varNode.findChild(NodeKind.NAME_TYPE_INIT);
  if (nameTypeInitNode) {
    // don't emit variable type on for..of statements
    let nameNode = nameTypeInitNode.findChild(NodeKind.NAME);
    emitter.catchup(varNode.start);
    emitter.insert(`let ${nameNode.text}`);
    emitter.skipTo(varNode.end);
  } else {
    visitNode(emitter, varNode);
  }

  emitter.catchup(inNode.start);
  emitter.skip(Keywords.IN.length + 1); // replace "in " with "of "
  emitter.insert("of ");

  visitNodes(emitter, inNode.children);
  visitNode(emitter, blockNode);
}

function getClassDeclarations(
  emitter: Emitter,
  className: string,
  contentsNode: Node[]
): Declaration[] {
  let found: { [name: string]: boolean } = {};

  return contentsNode
    .map((node) => {
      let nameNode: Node;

      switch (node.kind) {
        case NodeKind.SET:
        case NodeKind.GET:
        case NodeKind.FUNCTION:
          nameNode = node.findChild(NodeKind.NAME);
          break;
        case NodeKind.VAR_LIST:
        case NodeKind.CONST_LIST:
          nameNode = node
            .findChild(NodeKind.NAME_TYPE_INIT)
            .findChild(NodeKind.NAME);
          break;
        default:
          break;
      }
      if (!nameNode || found[nameNode.text]) {
        return null;
      }
      found[nameNode.text] = true;
      if (nameNode.text === className) {
        return;
      }

      let modList = node.findChild(NodeKind.MOD_LIST);
      let isStatic =
        modList && modList.children.some((mod) => mod.text === "static");
      return {
        name: nameNode.text,
        type: getDeclarationType(
          emitter,
          node.findChild(NodeKind.NAME_TYPE_INIT)
        ),
        bound: isStatic ? className : "this",
      };
    })
    .filter((el) => !!el);
}

function emitClass(emitter: Emitter, node: Node): void {
  emitDeclaration(emitter, node);

  let name = node.findChild(NodeKind.NAME);

  let content = node.findChild(NodeKind.CONTENT);
  let contentsNode = content && content.children;
  if (!contentsNode) {
    return;
  }

  // ensure extends identifier is being imported
  let extendsNode = node.findChild(NodeKind.EXTENDS);
  if (extendsNode) {
    emitIdent(emitter, extendsNode);
    emitter.ensureImportIdentifier(extendsNode.text);
  }

  // ensure implements identifiers are being imported
  let implementsNode = node.findChild(NodeKind.IMPLEMENTS_LIST);
  if (implementsNode) {
    implementsNode.children.forEach((node) =>
      emitter.ensureImportIdentifier(node.text)
    );
  }

  emitter.withScope(
    getClassDeclarations(emitter, name.text, contentsNode),
    (scope) => {
      scope.className = name.text;

      contentsNode.forEach((node) => {
        visitNode(emitter, node.findChild(NodeKind.META_LIST));
        emitter.catchup(node.start);
        // console.log(node)
        switch (node.kind) {
          case NodeKind.SET:
            emitSet(emitter, node);
            break;
          case NodeKind.GET:
          case NodeKind.FUNCTION:
            emitMethod(emitter, node);
            break;
          case NodeKind.VAR_LIST:
            emitPropertyDecl(emitter, node);
            break;
          case NodeKind.CONST_LIST:
            emitPropertyDecl(emitter, node, true);
            break;
          default:
            visitNode(emitter, node);
        }
      });
    }
  );

  emitter.catchup(node.end);
}

function emitSet(emitter: Emitter, node: Node): void {
  emitClassField(emitter, node);

  let name = node.findChild(NodeKind.NAME);
  emitter.consume("function", name.start);

  let params = node.findChild(NodeKind.PARAMETER_LIST);
  visitNode(emitter, params);
  emitter.catchup(params.end);

  let type = node.findChild(NodeKind.TYPE);
  if (type) {
    emitter.skipTo(type.end);
  }

  emitter.withScope(getFunctionDeclarations(emitter, node), () => {
    visitNodes(emitter, node.getChildFrom(NodeKind.TYPE));
  });
}

function emitConstList(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  let nameTypeInit = node.findChild(NodeKind.NAME_TYPE_INIT);
  emitter.skipTo(nameTypeInit.start);
  emitter.insert("const ");
  visitNode(emitter, nameTypeInit);
}

function emitObjectValue(emitter: Emitter, node: Node): void {
  visitNodes(emitter, node.children);
}

function emitNameTypeInit(emitter: Emitter, node: Node): void {
  emitter.declareInScope({
    name: node.findChild(NodeKind.NAME).text,
    type: getDeclarationType(emitter, node),
  });
  emitter.catchup(node.start);
  visitNodes(emitter, node.children);
}

function emitMethod(emitter: Emitter, node: Node): void {
  let name = node.findChild(NodeKind.NAME);
  if (
    node.kind !== NodeKind.FUNCTION ||
    name.text !== emitter.currentClassName
  ) {
    emitClassField(emitter, node);
    emitter.consume("function", name.start);
    emitter.catchup(name.end);
  } else {
    let mods = node.findChild(NodeKind.MOD_LIST);
    if (mods) {
      emitter.catchup(mods.start);
    }
    emitter.insert("constructor");
    emitter.skipTo(name.end);

    // // find "super" on constructor and move it to the beginning of the
    // // block
    // let blockNode = node.findChild(NodeKind.BLOCK);
    // let blockSuperIndex = -1;
    // for (var i = 0, len = blockNode.children.length; i < len; i++) {
    //     let blockChildNode = blockNode.children[i];
    //     if (blockChildNode.kind === NodeKind.CALL
    //         && blockChildNode.children[0].text === "super") {
    //         blockSuperIndex = i;
    //         break;
    //     }
    // }
    //
    // if (childCalls.length > 0) {
    //     console.log(childCalls)
    //     let superIndex = -1;
    //     childCalls.forEach((child, i) => {
    //         if (child.children[0].text === "super") superIndex = blockNode.children.indexOf(child);
    //     })
    //     console.log("super index:", superIndex)
    // }
  }
  emitter.withScope(getFunctionDeclarations(emitter, node), () => {
    visitNodes(emitter, node.getChildFrom(NodeKind.NAME));
  });
}

function emitPropertyDecl(emitter: Emitter, node: Node, isConst = false): void {
  emitClassField(emitter, node);
  let names = node.findChildren(NodeKind.NAME_TYPE_INIT);
  names.forEach((name, i) => {
    if (i === 0) {
      emitter.consume(isConst ? Keywords.CONST : Keywords.VAR, name.start);
    }
    visitNode(emitter, name);
  });
}

function emitClassField(emitter: Emitter, node: Node): void {
  let mods = node.findChild(NodeKind.MOD_LIST);
  if (mods) {
    emitter.catchup(mods.start);
    mods.children.forEach((node) => {
      emitter.catchup(node.start);
      if (
        node.text !== Keywords.PRIVATE &&
        node.text !== Keywords.PUBLIC &&
        node.text !== Keywords.PROTECTED &&
        node.text !== Keywords.STATIC
      ) {
        emitter.commentNode(node, false);
      }
      emitter.catchup(node.end);
    });
  }
}

function emitDeclaration(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  visitNode(emitter, node.findChild(NodeKind.META_LIST));
  let mods = node.findChild(NodeKind.MOD_LIST);
  if (mods && mods.children.length) {
    emitter.catchup(mods.start);
    let insertExport = false;
    mods.children.forEach((node) => {
      if (node.text !== "private") {
        insertExport = true;
      }
      emitter.skipTo(node.end);
    });
    if (insertExport) {
      emitter.insert("export");
    }
  }
}

function emitType(emitter: Emitter, node: Node): void {
  // Don't emit type on 'constructor' functions.
  if (node.parent.kind === NodeKind.FUNCTION) {
    let name = node.parent.findChild(NodeKind.NAME);
    if (name && name.text === emitter.currentClassName) {
      emitter.catchup(node.previousSibling.end);
      emitter.skipTo(node.end);
      return;
    }
  }

  emitter.catchup(node.start);

  if (!node.text) {
    if (node.kind === NodeKind.VECTOR) {
      emitVector(emitter, node);
    }
    return;
  }

  emitter.skipTo(node.end);

  // ensure type is imported
  if (
    GLOBAL_NAMES.indexOf(node.text) === -1 &&
    !emitter.getTypeRemap(node.text) &&
    TYPE_REMAP_VALUES.indexOf(node.text) === -1
  ) {
    emitter.ensureImportIdentifier(node.text);
  }

  let typeName = emitter.getTypeRemap(node.text) || node.text;

  emitter.insert(typeName);
}

function emitVector(emitter: Emitter, node: Node): void {
  if (!emitter.isNew) {
    emitter.catchup(node.start);
  }

  let type = node.findChild(NodeKind.TYPE);
  if (!type) {
    type = createNode(NodeKind.TYPE, {
      text: "any",
      start: node.start,
      end: node.end,
    });
    type.parent = node;
  }

  emitter.skipTo(type.start);

  if (!emitter.isNew) {
    emitType(emitter, type);
  }

  emitter.insert("[]");

  emitter.skipTo(node.end);
}

function emitShortVector(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  let vector = node.findChild(NodeKind.VECTOR);
  emitter.insert("Array");
  let type = vector.findChild(NodeKind.TYPE);
  if (type) {
    emitType(emitter, type);
  } else {
    emitter.insert("any");
  }
  emitter.catchup(vector.end);
  emitter.insert("(");
  let arrayLiteral = node.findChild(NodeKind.ARRAY);
  emitArray(emitter, arrayLiteral);
  emitter.insert(")");
  emitter.skipTo(node.end);
}

function emitNew(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  emitter.isNew = true;
  emitter.emitThisForNextIdent = false;
  visitNodes(emitter, node.children);
  emitter.isNew = false;
}

function emitCall(emitter: Emitter, node: Node): void {
  let isNew = emitter.isNew;
  emitter.isNew = false;
  if (node.children[0].kind === NodeKind.VECTOR) {
    if (isNew) {
      let vector = node.children[0];
      let args = node.children[1];

      emitter.insert("[");

      if (args.children.length > 0) {
        console.warn(
          "emitter.ts: emitCall() => NodeKind.VECTOR with arguments not implemented."
        );
      }

      emitter.insert("]");

      // emitter.insert('Array');
      // emitter.insert('<');
      // let type = vector.findChild(NodeKind.TYPE);
      // if (type) {
      //     emitter.skipTo(type.start);
      //     emitType(emitter, type);
      // } else {
      //     emitter.insert('any');
      // }

      emitter.skipTo(args.end);

      // emitter.insert('>');
      // let vectorNode = node.getChildFrom(NodeKind.VECTOR)
      // visitNodes(emitter, vectorNode);

      return;
    }

    // let args = node.findChild(NodeKind.ARGUMENTS);
    // //vector conversion lets just cast to array
    // if (args.children.length === 1) {
    //     emitter.insert('(<');
    //     emitVector(emitter, node.children[0]);
    //     emitter.insert('>');
    //     emitter.skipTo(args.children[0].start);
    //     visitNode(emitter, args.children[0]);
    //     emitter.catchup(node.end);
    //     return;
    // }
  } else {
    emitter.catchup(node.start);
  }

  visitNodes(emitter, node.children);
}

function emitCatch(emitter: Emitter, node: Node): void {
  emitter.declareInScope({ name: node.children[0].text });
  emitter.catchup(node.start);
  visitNodes(emitter, node.children);
}

function emitRelation(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  let as = node.findChild(NodeKind.AS);
  if (as) {
    // TODO: implement relation with type cast to vectors
    //       e.g. (myVector as Vector.<Boolean>)
    if (node.lastChild.kind === NodeKind.IDENTIFIER) {
      emitter.insert("(<");
      emitter.insert(
        emitter.getTypeRemap(node.lastChild.text) || node.lastChild.text
      );
      emitter.insert(">");
      visitNodes(emitter, node.getChildUntil(NodeKind.AS));
      emitter.catchup(as.start);
      emitter.insert(")");
      emitter.skipTo(node.end);
    } else if (node.lastChild.kind === NodeKind.VECTOR) {
      visitNodes(emitter, node.children);
    } else {
      emitter.commentNode(node, false);
    }
    return;
  }
  visitNodes(emitter, node.children);
}

function emitOp(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  if (node.text === Keywords.IS) {
    emitter.insert(Keywords.INSTANCE_OF);
    emitter.skipTo(node.end);
    return;
  }
  emitter.catchup(node.end);
}

function emitOr(emitter: Emitter, node: Node): void {
  // // TODO: support for `value ||= 10` expressions;
  // if (node.children.length === 3 && node.children[2].text === "=")
  // {
  //     node.children[2].text = node.children[0].text + " =";
  // }

  emitter.catchup(node.start);
  visitNodes(emitter, node.children);
}

export function emitIdent(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);

  if (node.parent && node.parent.kind === NodeKind.DOT) {
    //in case of dot just check the first
    if (node.parent.children[0] !== node) {
      return;
    }
  }

  if (Keywords.isKeyWord(node.text)) {
    emitter.insert(node.text);
    emitter.skipTo(node.end);
    return;
  }

  let def = emitter.findDefInScope(node.text);
  if (def && def.bound) {
    emitter.insert(def.bound + ".");
  }

  if (
    !def &&
    emitter.currentClassName &&
    GLOBAL_NAMES.indexOf(node.text) === -1 &&
    TYPE_REMAP[node.text] === undefined &&
    node.text !== emitter.currentClassName
  ) {
    if (node.text.match(/^[A-Z]/)) {
      // Import missing identifier from this namespace
      if (!emitter.options.useNamespaces) {
        emitter.ensureImportIdentifier(node.text);
      }
    } else if (emitter.emitThisForNextIdent) {
      // Identifier belongs to `this.` scope.
      emitter.insert("this.");
    }
  }

  node.text = emitter.getIdentifierRemap(node.text) || node.text;

  emitter.insert(node.text);
  emitter.skipTo(node.end);
  emitter.emitThisForNextIdent = true;
}

function emitDot(emitter: Emitter, node: Node) {
  let dotSibling = node.nextSibling;
  let isConditionalCompilation =
    dotSibling && dotSibling.kind === NodeKind.BLOCK;
  let template = "if ($1)";

  if (!isConditionalCompilation && node.parent.kind === NodeKind.CONDITION) {
    let separator = emitter.sourceBetween(
      node.children[0].end,
      node.children[0].end + 2
    );
    isConditionalCompilation = separator === "::";
    template = "$1";
  }

  // wrap conditional compilation into Node.js conditional for
  // `process.env.VARIABLE`
  //
  // More info about Flex conditional compilation:
  // http://help.adobe.com/en_US/flex/using/WS2db454920e96a9e51e63e3d11c0bf69084-7abd.html

  if (isConditionalCompilation) {
    emitter.catchup(node.start);
    emitter.insert(
      template.replace(
        "$1",
        `process.env.${node.children[1].text.toUpperCase()}`
      )
    );
    emitter.skipTo(node.end);
    return;
  } else {
    // TODO: allow conditional compilation for function/class definitions
  }

  visitNodes(emitter, node.children);
}

function emitXMLLiteral(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  emitter.insert(JSON.stringify(node.text));
  emitter.skipTo(node.end);
}

function emitLiteral(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  emitter.insert(node.text);
  emitter.skipTo(node.end);
}

function emitArray(emitter: Emitter, node: Node): void {
  emitter.catchup(node.start);
  emitter.insert("[");
  if (node.children.length > 0) {
    emitter.skipTo(node.children[0].start);
    visitNodes(emitter, node.children);
    emitter.catchup(node.lastChild.end);
  }
  emitter.insert("]");
  emitter.skipTo(node.end);
}

export function emit(
  ast: Node,
  source: string,
  options?: EmitterOptions
): string {
  let emitter = new Emitter(source, options);
  return emitter.emit(ast);
>>>>>>> 3a7b243
}


