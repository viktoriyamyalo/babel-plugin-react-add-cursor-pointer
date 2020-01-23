import {
  JSXAttribute,
  JSXExpressionContainer,
  JSXIdentifier,
  JSXOpeningElement,
} from 'babel-types';

import constants from './constants';
import utils from './utils';

export default function ({ types: t }) {
  // --------------------- attribute injection

  function injectDataAttribute({ node }: { node: JSXOpeningElement }) {
    const name: JSXIdentifier = t.jsxIdentifier(constants.ATTRIBUTE_IDENTIFIERS.DATA);
    const dataAttribute: JSXAttribute = utils.AttributeHandler.createAttribute({ name, value: null });

    utils.AttributeHandler.addAttribute({ node, attribute: dataAttribute });
  }

  // --------------------- visitor

  return {
    name: constants.PLUGIN_NAME,
    visitor: {
      Program(path) {
        const cssImportDeclaration = t.importDeclaration(
          [],
          t.stringLiteral(constants.CSS_FILE_PATH),
        );

        path.unshiftContainer('body', cssImportDeclaration);
      },
      JSXOpeningElement({ node }: { node: JSXOpeningElement }) {
        const onClickAttribute: JSXAttribute = utils.AttributeHandler.getAttribute({
          node,
          attributeName: constants.ATTRIBUTE_IDENTIFIERS.CLICK,
        });

        const hasOnClickAttribute: boolean = !!onClickAttribute;

        if (!hasOnClickAttribute) {
          return;
        }

        const onClickAttributeValue = t.isJSXExpressionContainer(onClickAttribute.value)
          ? (onClickAttribute.value as JSXExpressionContainer).expression
          : onClickAttribute.value;

        const isOnClickFunctionOrIdentifier: boolean = utils.isFunctionOrIdentifier(onClickAttributeValue);

        if (!isOnClickFunctionOrIdentifier) {
          return;
        }

        injectDataAttribute({ node });
      },
    },
  };
}
