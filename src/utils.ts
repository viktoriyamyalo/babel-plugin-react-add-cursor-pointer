import {
  isArrowFunctionExpression,
  isClassMethod,
  isFunctionDeclaration,
  isFunctionExpression,
  isIdentifier,
  isJSXIdentifier,
  isObjectMethod,
  JSXAttribute,
  jSXAttribute,
  JSXIdentifier,
  JSXOpeningElement,
} from 'babel-types';

class AttributeHandler {
  public static addAttribute({
    node,
    attribute,
  }: {
    node: JSXOpeningElement;
    attribute: JSXAttribute;
  }): void {
    const { attributes } = node;

    attributes.push(attribute);
  }

  public static createAttribute({
    name,
    value,
  }: {
    name: JSXIdentifier;
    value?;
  }): JSXAttribute {
    return jSXAttribute(name, value);
  }

  public static hasAttribute({
    node,
    attributeName,
  }: {
    node: JSXOpeningElement;
    attributeName: string;
  }): boolean {
    return (
      node.attributes
      && node.attributes.some((attribute) => isJSXIdentifier(attribute.name, { name: attributeName }))
    );
  }

  public static getAttribute({
    node,
    attributeName,
  }: {
    node: JSXOpeningElement;
    attributeName: string;
  }): JSXAttribute | null {
    return node.attributes && AttributeHandler.hasAttribute({ node, attributeName })
      ? Array.from(node.attributes).find((attribute) => isJSXIdentifier(attribute.name, { name: attributeName }))
      : null;
  }
}

function isFunctionOrIdentifier(value): boolean {
  return (
    isArrowFunctionExpression(value)
    || isClassMethod(value)
    || isFunctionExpression(value)
    || isFunctionDeclaration(value)
    || isObjectMethod(value)
    || isIdentifier(value)
  );
}

export default {
  AttributeHandler,
  isFunctionOrIdentifier,
};
