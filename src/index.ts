import {
  JSXAttribute,
  JSXExpressionContainer,
  JSXIdentifier,
  JSXOpeningElement,
} from 'babel-types';

import Constants from './constants';
import Utils from './utils';

export default function({ types: t }) {
  // --------------------- attribute injection

  function injectDataAttribute({ node }: { node: JSXOpeningElement }) {
    const name: JSXIdentifier = t.jsxIdentifier(Constants.ATTRIBUTE_IDENTIFIERS.DATA);
    const dataAttribute: JSXAttribute = Utils.createAttribute({ name, value: null });

    Utils.addAttribute({ node, attribute: dataAttribute });
  }

  // --------------------- visitor

  return {
    name: Constants.PLUGIN_NAME,
    visitor: {
      Program(path) {
        const cssImportDeclaration = t.importDeclaration(
          [],
          t.stringLiteral(Constants.CSS_FILE_PATH),
        );

        path.unshiftContainer('body', cssImportDeclaration);
      },
      JSXOpeningElement({ node }: { node: JSXOpeningElement }) {
        const hasOnClickAttribute: boolean = Utils.hasAttribute({
          node,
          attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
        });

        if (!hasOnClickAttribute) {
          return;
        }

        const onClickAttribute: JSXAttribute = Utils.getAttribute({
          node,
          attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
        });
        const value = t.isJSXExpressionContainer(onClickAttribute.value)
          ? (onClickAttribute.value as JSXExpressionContainer).expression
          : onClickAttribute.value;

        const isOnClickFunctionOrIdentifier: boolean = Utils.isFunctionOrIdentifier(value);

        if (!isOnClickFunctionOrIdentifier) {
          return;
        }

        injectDataAttribute({ node });
      },
    },
  };
}
