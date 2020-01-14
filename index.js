"use strict";

const fs = require("fs");

const {
  ATTRIBUTE_IDENTIFIERS, CSS_FILE_PATH, PLUGIN_NAME
} = require("./constants");

// TODO: using module.exports while importing the plugin locally; replace with export default once published
module.exports = function({ types: t }) {

  // ------------------ utility functions ------------------

  function hasAttribute({ node, attributeName }) {
    return (
      node.attributes &&
      node.attributes.some(attribute =>
        t.isJSXIdentifier(attribute.name, { name: attributeName })
      )
    );
  }

  function getAttribute({ node, attributeName }) {
    return (
      node.attributes ?
        node.attributes.find(attribute =>
          t.isJSXIdentifier(attribute.name, { name: attributeName })
      ) : null
    );
  }

  function addAttribute({ node, attribute }) {
    const { attributes } = node;

    attributes.push(attribute);
  }

  function createAttribute({ name, value }) {
    return t.jsxAttribute(name, value);
  }

  // TODO: implement isExecutable function

  // function isExecutable(value) {
  //   return (
  //     t.isObjectMethod(value) ||
  //     t.isArrowFunctionExpression(value) ||
  //     t.isisFunctionDeclaration(value) ||
  //     t.isFunctionExpression(value) ||
  //     t.isClassMethod(value)
  //   );
  // }

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
        if (fs.existsSync(CSS_FILE_PATH)) {
          // checking that the import string has been generated correctly to avoid breaking
          // code with an invalid import
          const cssImportDeclaration = t.importDeclaration([], t.stringLiteral(CSS_FILE_PATH));

          path.unshiftContainer("body", cssImportDeclaration);
        }
      },
      JSXOpeningElement({ node }) {

        const hasOnClickAttribute = hasAttribute({
          node,
          attributeName: ATTRIBUTE_IDENTIFIERS.CLICK
        });
        const hasDisabledAttribute = hasAttribute({
          node,
          attributeName: ATTRIBUTE_IDENTIFIERS.DISABLED
        });

        if (!hasOnClickAttribute || hasDisabledAttribute) {
          return;
        }

        // TODO: also check here if onClick is executable

        // const onClickAttribute = getAttribute({ node, attributeName: ATTRIBUTE_IDENTIFIERS.CLICK });
        // const isOnClickExecutable = isExecutable(onClickAttribute.value.value.expression);
        //
        // if (t.isNullLiteral(onClickAttribute.value.value)) {
        //   return;
        // }

        injectDataAttribute({ node });

      }
    }
  };
};
