import constants from '../src/constants';
import utils from '../src/utils';

import Mocks from './mocks';

describe('addAttribute function', () => {
  it('adds an attribute to node correctly', () => {
    const node = Mocks.jsx.mockNodeWithAttributes([]);
    const attribute = Mocks.jsx.mockAttribute({ name: constants.ATTRIBUTE_IDENTIFIERS.CLICK });

    utils.AttributeHandler.addAttribute({ node, attribute });

    expect(node.attributes).toEqual([attribute]);
  });
});

describe('createAttribute function', () => {
  it('returns an attribute with correct name', () => {
    const name = { ...Mocks.jsx.attributeName };
    const value = { ...Mocks.jsx.attributeValue };

    const onClickAttribute = utils.AttributeHandler.createAttribute({ name, value });

    expect(onClickAttribute.name).toEqual(name);
  });

  it('returns an attribute with correct value', () => {
    const name = { ...Mocks.jsx.attributeName };
    const value = { ...Mocks.jsx.attributeValue };

    const onClickAttribute = utils.AttributeHandler.createAttribute({ name, value });

    expect(onClickAttribute.value).toEqual(value);
  });
});

describe('getAttribute function', () => {
  it('returns an attribute if the node has it', () => {
    const onClickAttribute = Mocks.jsx.mockAttribute(constants.ATTRIBUTE_IDENTIFIERS.CLICK);
    const node = Mocks.jsx.mockNodeWithAttributes([onClickAttribute]);

    const attribute = utils.AttributeHandler.getAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(attribute).toEqual(onClickAttribute);
  });

  it('returns null if the node has no such attribute', () => {
    const node = Mocks.jsx.mockNodeWithAttributes([]);

    const attribute = utils.AttributeHandler.getAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(attribute).toBeNull();
  });
});

describe('hasAttribute function', () => {
  it('returns true if node has the desired attribute', () => {
    const onClickAttribute = Mocks.jsx.mockAttribute(constants.ATTRIBUTE_IDENTIFIERS.CLICK);
    const node = Mocks.jsx.mockNodeWithAttributes([onClickAttribute]);

    const hasOnClickAttribute = utils.AttributeHandler.hasAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(hasOnClickAttribute).toBe(true);
  });

  it('returns false if the node has no such attribute', () => {
    const node = Mocks.jsx.mockNodeWithAttributes([]);

    const hasOnClickAttribute = utils.AttributeHandler.hasAttribute({
      node,
      attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(hasOnClickAttribute).toBe(false);
  });
});

describe('isFunctionOrIdentifier function', () => {
  it('returns true if the value is an arrow function expression', () => {
    const value = { ...Mocks.functions.arrowFunctionExpression };

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is a class method', () => {
    const value = { ...Mocks.functions.classMethod };

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is a function expression', () => {
    const value = { ...Mocks.functions.functionExpression };

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is a function declaration', () => {
    const value = { ...Mocks.functions.functionDeclaration };

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is an object method', () => {
    const value = { ...Mocks.functions.objectMethod };

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('returns true if the value is an identifier', () => {
    const value = { ...Mocks.identifier };

    const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toBe(true);
  });

  it('detects non-functions or identifiers correctly', () => {
    const values = [
      { ...Mocks.expressions.arrayExpression },
      { ...Mocks.expressions.emptyArrayExpression },
      { ...Mocks.expressions.emptyObjectExpression },
      { ...Mocks.expressions.objectExpression },
      { ...Mocks.literals.emptyStringLiteral },
      { ...Mocks.literals.falseBooleanLiteral },
      { ...Mocks.literals.floatNumberLiteral },
      { ...Mocks.literals.intNumberLiteral },
      { ...Mocks.literals.nanNumberLiteral },
      { ...Mocks.literals.nullLiteral },
      { ...Mocks.literals.stringLiteral },
      { ...Mocks.literals.zeroNumberLiteral },
      { ...Mocks.literals.trueBooleanLiteral },
      { ...Mocks.statements.emptyStatement },
    ];

    Object.keys(values).forEach((value) => {
      const isFunctionOrIdentifier = utils.isFunctionOrIdentifier(value);

      expect(isFunctionOrIdentifier).toBe(false);
    });
  });
});
