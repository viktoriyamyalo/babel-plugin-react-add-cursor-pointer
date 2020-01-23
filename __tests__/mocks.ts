import {
  ArrayExpression,
  ArrowFunctionExpression,
  BlockStatement,
  BooleanLiteral,
  ClassMethod,
  EmptyStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  JSXAttribute,
  JSXExpressionContainer,
  JSXIdentifier,
  JSXOpeningElement,
  NullLiteral,
  NumericLiteral,
  ObjectExpression,
  ObjectMethod,
  StringLiteral,
} from 'babel-types';

// --------------------- utility stubs

const locationInfo = {
  start: 1,
  end: 2,
  loc: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 2,
      column: 1,
    },
  },
};

const identifier: Identifier = {
  type: 'Identifier',
  name: 'id',
  ...locationInfo,
};

const body: BlockStatement = {
  type: 'BlockStatement',
  body: null,
  ...locationInfo,
};

const functionStub = {
  id: { ...identifier },
  body: { ...body },
  generator: false,
  async: false,
  params: [],
  ...locationInfo,
};

// --------------------- function mocks

const arrowFunctionExpression: ArrowFunctionExpression = {
  ...functionStub,
  type: 'ArrowFunctionExpression',
  expression: false,
};

const classMethod: ClassMethod = {
  ...functionStub,
  type: 'ClassMethod',
  key: null,
  kind: 'method',
  computed: false,
  static: false,
  expression: false,
};

const functionExpression: FunctionExpression = {
  ...functionStub,
  type: 'FunctionExpression',
};

const functionDeclaration: FunctionDeclaration = {
  ...functionStub,
  type: 'FunctionDeclaration',
};

const objectMethod: ObjectMethod = {
  ...functionStub,
  type: 'ObjectMethod',
  key: null,
  kind: 'method',
  computed: false,
  shorthand: null,
  value: null,
};

// --------------------- JSX mocks

const node: JSXOpeningElement = {
  type: 'JSXOpeningElement',
  name: {
    type: 'JSXIdentifier',
    name: 'button',
    ...locationInfo,
  },
  selfClosing: false,
  attributes: [],
  ...locationInfo,
};

const attributeValue: JSXExpressionContainer = {
  type: 'JSXExpressionContainer',
  expression: { ...arrowFunctionExpression },
  ...locationInfo,
};

const attributeName: JSXIdentifier = {
  type: 'JSXIdentifier',
  name: 'onClick',
  ...locationInfo,
};

const attribute: JSXAttribute = {
  type: 'JSXAttribute',
  name: { ...attributeName },
  value: { ...attributeValue },
  ...locationInfo,
};

// --------------------- literal mocks

const emptyStringLiteral: StringLiteral = {
  type: 'StringLiteral',
  value: '',
  ...locationInfo,
};

const falseBooleanLiteral: BooleanLiteral = {
  type: 'BooleanLiteral',
  value: false,
  ...locationInfo,
};

const floatNumberLiteral: NumericLiteral = {
  type: 'NumericLiteral',
  value: 1.1,
  ...locationInfo,
};

const intNumberLiteral: NumericLiteral = {
  type: 'NumericLiteral',
  value: 1,
  ...locationInfo,
};

const nanNumberLiteral: NumericLiteral = {
  type: 'NumericLiteral',
  value: NaN,
  ...locationInfo,
};

const nullLiteral: NullLiteral = {
  type: 'NullLiteral',
  ...locationInfo,
};

const stringLiteral: StringLiteral = {
  type: 'StringLiteral',
  value: 'string',
  ...locationInfo,
};

const trueBooleanLiteral: BooleanLiteral = {
  type: 'BooleanLiteral',
  value: true,
  ...locationInfo,
};

const zeroNumberLiteral: NumericLiteral = {
  type: 'NumericLiteral',
  value: 0,
  ...locationInfo,
};

// --------------------- expression mocks

const arrayExpression: ArrayExpression = {
  type: 'ArrayExpression',
  elements: [{ ...identifier }],
  ...locationInfo,
};

const emptyArrayExpression: ArrayExpression = {
  type: 'ArrayExpression',
  elements: [],
  ...locationInfo,
};

const emptyObjectExpression: ObjectExpression = {
  type: 'ObjectExpression',
  properties: [],
  ...locationInfo,
};

const objectExpression: ObjectExpression = {
  type: 'ObjectExpression',
  properties: [{
    type: 'ObjectProperty',
    key: { ...identifier },
    computed: false,
    value: null,
    shorthand: false,
    ...locationInfo,
  }],
  ...locationInfo,
};

// --------------------- statement mocks

const emptyStatement: EmptyStatement = {
  type: 'EmptyStatement',
  ...locationInfo,
};

// --------------------- utility methods

const mockAttribute = (name): JSXAttribute => ({ ...attribute, name: { ...attribute.name, name } });
const mockNodeWithAttributes = (attributes: JSXAttribute[] | [] = []): JSXOpeningElement => ({
  ...node,
  attributes,
});

export default {
  expressions: {
    arrayExpression,
    emptyArrayExpression,
    objectExpression,
    emptyObjectExpression,
  },
  functions: {
    arrowFunctionExpression,
    classMethod,
    functionDeclaration,
    functionExpression,
    objectMethod,
  },
  identifier,
  jsx: {
    attributeName,
    attributeValue,
    mockAttribute,
    mockNodeWithAttributes,
  },
  literals: {
    emptyStringLiteral,
    falseBooleanLiteral,
    floatNumberLiteral,
    intNumberLiteral,
    nanNumberLiteral,
    nullLiteral,
    stringLiteral,
    trueBooleanLiteral,
    zeroNumberLiteral,
  },
  statements: {
    emptyStatement,
  },
};
