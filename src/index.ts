import { JSXExpressionContainer } from 'babel-types';

import Constants from './constants';
import Utils from './utils';

export default function({ types: t }) {
  // --------------------- attribute injection

  function injectDataAttribute({ node }) {
    const name = t.jsxIdentifier(Constants.ATTRIBUTE_IDENTIFIERS.DATA);
    const dataAttribute = Utils.createAttribute({ name, value: null });

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
      JSXOpeningElement({ node }) {
        const hasOnClickAttribute = Utils.hasAttribute({
          node,
          attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
        });

        if (!hasOnClickAttribute) {
          return;
        }

        const onClickAttribute = Utils.getAttribute({
          node,
          attributeName: Constants.ATTRIBUTE_IDENTIFIERS.CLICK,
        });
        const value = t.isJSXExpressionContainer(onClickAttribute.value)
          ? (onClickAttribute.value as JSXExpressionContainer).expression
          : onClickAttribute.value;

        const isOnClickFunctionOrIdentifier = Utils.isFunctionOrIdentifier(value);

        if (!isOnClickFunctionOrIdentifier) {
          return;
        }

        injectDataAttribute({ node });
      },
    },
  };
}
