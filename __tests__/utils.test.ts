import Constants from '../src/constants';
import Utils from '../src/utils';

import Mocks from './mocks';

describe('addAttribute function', () => {
  it('adds an attribute to node correctly', () => {
    const node = Mocks.mockNodeWithAttributes([]);
    const attribute = Mocks.mockAttribute({ name: Constants.ATTRIBUTE_IDENTIFIERS.CLICK });

    Utils.addAttribute({ node, attribute });

    expect(node.attributes).toEqual([attribute]);
  });
});

describe('createAttribute function', () => {
  it('creates and returns an attribute with correct name and value', () => {
    const name = { ...Mocks.attributeName };
    const value = { ...Mocks.attributeValue };

    const onClickAttribute = Utils.createAttribute({ name, value });

    expect(onClickAttribute.name).toEqual(name);
    expect(onClickAttribute.value).toEqual(value);
  });
});

describe('getAttribute function', () => {
  it('returns an attribute if the node has it', () => {
    const onClickAttribute = Mocks.mockAttribute(Constants.ATTRIBUTE_IDENTIFIERS.CLICK);
    const node = Mocks.mockNodeWithAttributes([onClickAttribute]);

    const attribute = Utils.getAttribute({
      node,
      attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(attribute).toEqual(onClickAttribute);
  });

  it('returns null if the node has no such attribute', () => {
    const node = Mocks.mockNodeWithAttributes([]);

    const attribute = Utils.getAttribute({
      node,
      attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(attribute).toEqual(null);
  });
});

describe('hasAttribute function', () => {
  it('returns true if node has the desired attribute', () => {
    const onClickAttribute = Mocks.mockAttribute(Constants.ATTRIBUTE_IDENTIFIERS.CLICK);
    const node = Mocks.mockNodeWithAttributes([onClickAttribute]);

    const hasOnClickAttribute = Utils.hasAttribute({
      node,
      attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(hasOnClickAttribute).toEqual(true);
  });

  it('returns false if the node has no such attribute', () => {
    const node = Mocks.mockNodeWithAttributes([]);

    const hasOnClickAttribute = Utils.hasAttribute({
      node,
      attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
    });

    expect(hasOnClickAttribute).toEqual(false);
  });
});

describe('isFunctionOrIdentifier function', () => {
  it('returns true if the value is an arrow function expression', () => {
    const value = { ...Mocks.functions.arrowFunctionExpression };

    const isFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toEqual(true);
  });

  it('returns true if the value is a class method', () => {
    const value = { ...Mocks.functions.classMethod };

    const isFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toEqual(true);
  });

  it('returns true if the value is a function expression', () => {
    const value = { ...Mocks.functions.functionExpression };

    const isFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toEqual(true);
  });

  it('returns true if the value is a function declaration', () => {
    const value = { ...Mocks.functions.functionDeclaration };

    const isFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toEqual(true);
  });

  it('returns true if the value is an object method', () => {
    const value = { ...Mocks.functions.objectMethod };

    const isFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toEqual(true);
  });

  it('returns true if the value is an identifier', () => {
    const value = { ...Mocks.identifier };

    const isFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toEqual(true);
  });

  it('returns false if the value is a null literal', () => {
    const value = { ...Mocks.nullLiteral };

    const isFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

    expect(isFunctionOrIdentifier).toEqual(false);
  });
});
