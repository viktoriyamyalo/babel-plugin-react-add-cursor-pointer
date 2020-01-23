# babel-plugin-react-add-cursor-pointer

This babel plugin styles any enabled JSX element that has an `onClick` prop with `cursor: pointer`.

## The problem

As your project grows, styling each and every clickable element with a repeating `cursor: pointer` can become a tedious task. 

## The solution

This plugin will style all of your enabled clickable elements with `cursor: pointer` automatically.

## Getting started

### Installation

Install the plugin:

```$ npm i https://github.com/viktoriyamyalo/babel-plugin-react-add-cursor-pointer.git```

### Usage

### via .babelrc

Add `"babel-plugin-react-add-cursor-pointer"` to `"plugins"` in your `.babelrc`:

```"plugins": ["babel-plugin-react-add-cursor-pointer"]```

### via package.json

Add `"babel-plugin-react-add-cursor-pointer"` to `"babel": { "plugins": [] }` inside your package.json. It should end up looking something like the following:

```$xslt
 "babel": {
    "plugins": [
        "babel-plugin-react-add-cursor-pointer"
        ]
    }
```

## How does it work?

- This babel plugin visits any JSX element you have in your code and checks if it has an onClick prop.
- If it does, the plugin then checks if the value of the `onClick` prop is a function (e.g. arrow function, class method, function declaration...) or an identifier.
- If the `onClick` prop passes this check, then the plugin will add a `data-react-add-cursor-pointer__is-clickable-element` attribute to the element.
- If the `onClick` prop doesn't pass the `function or identifier` check, no attribute is added to the element.
- At the entry point of your program (e.g. your `App.js` or `index.js` file), the plugin will add an import declaration for css file that looks like this:


```$xslt
[data-react-add-cursor-pointer__is-clickable-element] {
    cursor: pointer;
}

:disabled {
    cursor: auto;
}
```

- This will style all of the elements that got injected with the data attribute.
- The cursor for any elements that are disabled at the moment will be reset back to `auto`.
- You can easily override the plugin's styles with a single class and style your element with a different cursor if need be.

## Example

#### Your clickable element:

### In

```$xslt
class Button extends Component {
    handleClick = () => {};
    
    render() {
        return (
            <button onClick={this.handleClick}>
                I have an onClick prop
            </button>
        )
    }
}
```

### Out

```$xslt
class Button extends Component {
    handleClick = () => {};
    
    render() {
        return (
            <button onClick={this.handleClick} data-react-add-cursor-pointer__is-clickable-element>
                I have an onClick prop
            </button>
        )
    }
}
```

#### Your app's entry point:

### In

```$xslt
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

### Out

```$xslt
import "babel-plugin-react-add-cursor-pointer/minified.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

## License

MIT, see [LICENSE](https://github.com/viktoriyamyalo/babel-plugin-react-add-cursor-pointer/blob/master/LICENSE) for details.
