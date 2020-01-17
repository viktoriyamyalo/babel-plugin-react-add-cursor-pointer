import pluginTester from 'babel-plugin-tester';
import * as path from 'path';

import BabelPluginCursorPointer from '../src/index';

pluginTester({
  plugin: BabelPluginCursorPointer,
  babelOptions: {
    presets: ['@babel/preset-react'],
  },
  tests: [
    {
      title:
        'adds a data-babel-plugin-cursor-pointer__is-clickable attribute if element has an onClick attribute',
      fixture: path.join(__dirname, '__fixtures__/with-onclick', 'input.js'),
      outputFixture: path.join(__dirname, '__fixtures__/with-onclick', 'output.js'),
    },
    {
      title: 'adds no attributes if element has no onClick attribute',
      fixture: path.join(__dirname, '__fixtures__/without-onclick', 'input.js'),
      outputFixture: path.join(__dirname, '__fixtures__/without-onclick', 'output.js'),
    },
    {
      title: 'adds no attributes if element has an onClick attribute with value null',
      fixture: path.join(__dirname, '__fixtures__/with-onclick-null', 'input.js'),
      outputFixture: path.join(__dirname, '__fixtures__/with-onclick-null', 'output.js'),
    },
    {
      title: 'adds CSS import declaration at the start of the program',
      fixture: path.join(__dirname, '__fixtures__/import-declaration', 'input.js'),
      outputFixture: path.join(__dirname, '__fixtures__/import-declaration', 'output.js'),
    },
  ],
});
