# babel-plugin-cursor-pointer

This babel plugin styles any enabled JSX element that has an onClick prop with cursor: pointer.

### Installation

```npm i https://github.com/viktoriyamyalo/babel-plugin-cursor-pointer.git```

### Usage

#### via .babelrc

Add `"babel-plugin-cursor-pointer` to `"plugins"` in your .babelrc:

```  "plugins": ["babel-plugin-cursor-pointer"]```

#### via package.json


Add `"babel-plugin-cursor-pointer` to `"babel": { "plugins": [] }` inside your package.json. It should end up looking something like the following:

```
 "babel": {
       "plugins": [
         "babel-plugin-cursor-pointer"
       ]
     }
```

### How does it work?

- This plugin will style any of your JSX elements that has an onClick prop and is not currently disabled with `cursor: pointer;`.
- If the onClick prop on your element is not executable (e.g. `onClick={null}`), it will not be styled.
- The styling is easy to override with a class or any more specific selector if need be.

