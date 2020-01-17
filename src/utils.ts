import {
  JSXAttribute,
  JSXOpeningElement,
  isJSXIdentifier,
  jSXAttribute,
  isArrowFunctionExpression,
  isClassMethod,
  isFunctionExpression,
  isFunctionDeclaration,
  isObjectMethod,
  isIdentifier,
} from 'babel-types';

function addAttribute({
  node,
  attribute,
}: {
  node: JSXOpeningElement;
  attribute: JSXAttribute;
}): void {
  const { attributes } = node;

  attributes.push(attribute);
}

function createAttribute({ name, value }): JSXAttribute {
  return jSXAttribute(name, value);
}

function getAttribute({
  node,
  attributeName,
}: {
  node: JSXOpeningElement;
  attributeName: string;
}): JSXAttribute | null {
  return node.attributes && hasAttribute({ node, attributeName })
    ? Array.from(node.attributes).find((attribute) =>
        isJSXIdentifier(attribute.name, { name: attributeName }),
      )
    : null;
}

function hasAttribute({
  node,
  attributeName,
}: {
  node: JSXOpeningElement;
  attributeName: string;
}): boolean {
  return (
    node.attributes &&
    node.attributes.some((attribute) => isJSXIdentifier(attribute.name, { name: attributeName }))
  );
}

function isFunctionOrIdentifier(value): boolean {
  return (
    isArrowFunctionExpression(value) ||
    isClassMethod(value) ||
    isFunctionExpression(value) ||
    isFunctionDeclaration(value) ||
    isObjectMethod(value) ||
    isIdentifier(value)
  );
}

export default {
  addAttribute,
  createAttribute,
  getAttribute,
  hasAttribute,
  isFunctionOrIdentifier,
};
