import {
  ArrowFunctionExpression,
  BlockStatement,
  ClassMethod,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  JSXAttribute,
  JSXExpressionContainer,
  JSXIdentifier,
  JSXOpeningElement,
  NullLiteral,
  ObjectMethod,
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
  ...locationInfo,
  generator: false,
  async: false,
  params: [],
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
  ...locationInfo,
  value: { ...attributeValue },
};

const nullLiteral: NullLiteral = {
  type: 'NullLiteral',
  ...locationInfo,
};

// --------------------- utility methods

const mockAttribute = (name): JSXAttribute => ({ ...attribute, name: { ...attribute.name, name } });
const mockNodeWithAttributes = (attributes: JSXAttribute[] | [] = []): JSXOpeningElement => ({
  ...node,
  attributes,
});

export default {
  attributeName,
  attributeValue,
  functions: {
    arrowFunctionExpression,
    classMethod,
    functionDeclaration,
    functionExpression,
    objectMethod,
  },
  identifier,
  mockAttribute,
  mockNodeWithAttributes,
  nullLiteral,
};
