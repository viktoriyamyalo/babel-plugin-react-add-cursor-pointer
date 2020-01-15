import {
  ImportDeclaration,
  JSXAttribute,
  JSXExpressionContainer,
  JSXOpeningElement,
} from 'babel-types';

import { ATTRIBUTE_IDENTIFIERS, CSS_FILE_PATH, PLUGIN_NAME } from './constants';

export default function({ types: t }) {
  // ------------------ utility functions ------------------

  function hasAttribute({
    node,
    attributeName,
  }: {
    node: JSXOpeningElement;
    attributeName: string;
  }): boolean {
    return (
      node.attributes &&
      node.attributes.some((attribute) =>
        t.isJSXIdentifier(attribute.name, { name: attributeName }),
      )
    );
  }

  function getAttribute({
    node,
    attributeName,
  }: {
    node: JSXOpeningElement;
    attributeName: string;
  }): JSXAttribute | null {
    return node.attributes
      ? Array.from(node.attributes).find((attribute) =>
          t.isJSXIdentifier(attribute.name, { name: attributeName }),
        )
      : null;
  }

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
    return t.jsxAttribute(name, value);
  }

  function isFunctionOrIdentifier(value): boolean {
    return (
      t.isArrowFunctionExpression(value) ||
      t.isClassMethod(value) ||
      t.isFunctionExpression(value) ||
      t.isFunctionDeclaration(value) ||
      t.isObjectMethod(value) ||
      t.isIdentifier(value)
    );
  }

  // ------------------ injection method ------------------

  function injectDataAttribute({ node }) {
    const name = t.jsxIdentifier(ATTRIBUTE_IDENTIFIERS.DATA);
    const dataAttribute = createAttribute({ name, value: null });

    addAttribute({ node, attribute: dataAttribute });
  }

  // ----------------------- visitor -----------------------

  return {
    name: PLUGIN_NAME,
    visitor: {
      Program(path) {
        const cssImportDeclaration: ImportDeclaration = t.importDeclaration(
          [],
          t.stringLiteral(CSS_FILE_PATH),
        );

        path.unshiftContainer('body', cssImportDeclaration);
      },
      JSXOpeningElement({ node }) {
        const hasOnClickAttribute = hasAttribute({
          node,
          attributeName: ATTRIBUTE_IDENTIFIERS.CLICK,
        });

        if (!hasOnClickAttribute) {
          return;
        }

        const onClickAttribute = getAttribute({
          node,
          attributeName: ATTRIBUTE_IDENTIFIERS.CLICK,
        });
        const value = t.isJSXExpressionContainer(onClickAttribute.value)
          ? (onClickAttribute.value as JSXExpressionContainer).expression
          : onClickAttribute.value;

        const isOnClickFunctionOrIdentifier = isFunctionOrIdentifier(value);

        if (!isOnClickFunctionOrIdentifier) {
          return;
        }

        injectDataAttribute({ node });
      },
    },
  };
}
