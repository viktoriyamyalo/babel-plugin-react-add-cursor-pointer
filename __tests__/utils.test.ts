import constants from '../src/constants';
import utils from '../src/utils';

import mocks from './mocks';

describe('addAttribute function', () => {
  it('adds an attribute to node correctly', () => {
    const node = mocks.jsx.mockNodeWithAttributes([]);
    const attribute = mocks.jsx.mockAttribute({ name: constants.ATTRIBUTE_IDENTIFIERS.CLICK });

    utils.AttributeHandler.addAttribute({ node, attribute });

    expect(node.attributes).toEqual([attribute]);
  });
});

describe('createAttribute function', () => {
  it('returns an attribute with correct name', () => {
    const name = { ...mocks.jsx.attributeName };
    const value = { ...mocks.jsx.attributeValue };

    const onClickAttribute = utils.AttributeHandler.createAttribute({ name, value });

    expect(onClickAttribute.name).toEqual(name);
  });

  it('returns an attribute with correct value', () => {
    const name = { ...mocks.jsx.attributeName };
    const value = { ...mocks.jsx.attributeValue };

    const onClickAttribute = utils.AttributeHandler.createAttribute({ name, value });

    expect(onClickAttribute.value).toEqual(value);
  });
});

describe('getAttribute function', () => {
  it('returns an attribute if the node has it', () => {
    const onClickAttribute = mocks.jsx.mockAttribute(constants.ATTRIBUTE_IDENTIFIERS.CLICK);
    const node = mocks.jsx.mockNodeWithAttributes([onClickAttribute]);

    const attribute = utils.AttributeHandler.getAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(attribute).toEqual(onClickAttribute);
  });

  it('returns null if the node has no such attribute', () => {
    const node = mocks.jsx.mockNodeWithAttributes([]);

    const attribute = utils.AttributeHandler.getAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(attribute).toBeNull();
  });
});

describe('hasAttribute function', () => {
  it('returns true if node has the desired attribute', () => {
    const onClickAttribute = mocks.jsx.mockAttribute(constants.ATTRIBUTE_IDENTIFIERS.CLICK);
    const node = mocks.jsx.mockNodeWithAttributes([onClickAttribute]);

    const hasOnClickAttribute = utils.AttributeHandler.hasAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(hasOnClickAttribute).toBe(true);
  });

  it('returns false if the node has no such attribute', () => {
    const node = mocks.jsx.mockNodeWithAttributes([]);

    const hasOnClickAttribute = utils.AttributeHandler.hasAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(hasOnClickAttribute).toBe(false);
  });
});

describe('isFunctionOrIdentifier function', () => {
  it('returns true if the value is an arrow function expression', () => {
    const value = mocks.functions.arrowFunctionExpression;

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is a class method', () => {
    const value = mocks.functions.classMethod;

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is a function expression', () => {
    const value = mocks.functions.functionExpression;

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is a function declaration', () => {
    const value = mocks.functions.functionDeclaration;

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is an object method', () => {
    const value = mocks.functions.objectMethod;

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is an identifier', () => {
    const value = mocks.identifier;

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('detects non-functions or identifiers correctly', () => {
    const values = [
      mocks.expressions.arrayExpression,
      mocks.expressions.emptyArrayExpression,
      mocks.expressions.emptyObjectExpression,
      mocks.expressions.objectExpression,
      mocks.literals.emptyStringLiteral,
      mocks.literals.falseBooleanLiteral,
      mocks.literals.floatNumberLiteral,
      mocks.literals.intNumberLiteral,
      mocks.literals.nanNumberLiteral,
      mocks.literals.nullLiteral,
      mocks.literals.stringLiteral,
      mocks.literals.zeroNumberLiteral,
      mocks.literals.trueBooleanLiteral,
      mocks.statements.emptyStatement,
    ];

    Object.keys(values).forEach((value) => {
      const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

      expect(isFunctionOrIdentifier).toBe(false);
    });
  });
});
