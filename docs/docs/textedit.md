## Introduction

Create an [input text object](inputtext.md) above a text object to edit string content.

- Author: Rex
- Behavior of text object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/textedit-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rextexteditplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/textedit)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexTextEdit from './plugins/textedit.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import TextEditPlugin from './plugins/textedit-plugin.js';

var config = {
    // ...
    parent: divId,
    dom: {
        createContainer: true
    },
    plugins: {
        global: [{
            key: 'rexTextEdit',
            plugin: TextEditPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

- Set `parent` to divId
- Set `dom.createContainer` to `true`.

### Open text editor

[An easy way](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/behaviors/textedit/Edit.js) to open a text editor.

```javascript
var editor = scene.plugins.get('rexTextEdit').edit(textObject, config);
// var editor = scene.plugins.get('rexTextEdit').edit(textObject, config, onClose);
```

- `textObject` : Text object, [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).
- `config` : 
    - `config.type` : 
        - `text` (default), or 
        - `password`
        - `number`
    - `config.text` : Initial string content.
    - `config.onTextChanged` : Callback invoked when input text changed.
        ```javascript
        function (textObject, text) {
            textObject.text = text;
        }
        ```
    - [More configuration parameters](inputtext.md#add-text-object)...
- `onClose` : Callback invoked when text editor is closed.
    ```javascript
    var callback = function(textObject) {
    }
    ```

Create a text editor ([input element](inputtext.md)) above text object.

- Size, font size, font family, font color, background color of text editor will be equal to text object.
- Text object will be invisible when text editor is opened.
- Store reference of text editor at `textObject._editor`.
- Text editor will be closed when 
    - Press enter key, or
    - Touch outside of editor, or
    - Open another text editor, or
    - Call `editor.close()`

### Create instance

```javascript
var txt = scene.add.text(x, y, 'abc', {
    fixedWidth: 200,
    fixedHeight: 30,
});
var editor = scene.plugins.get('rexTextEdit').add(txt);
```

### Open editor

```javascript
editor.open(config);
// editor.open(config, onClose);
```

- `config`
    - `config.type` : 
        - `text` (default), or 
        - `password`
    - `config.text` : Initial string content.
    - `config.onTextChanged` : Callback invoked when input text changed.
        ```javascript
        function (textObject, text) {
            textObject.text = text;
        }
        ```
    - [More configuration parameters](inputtext.md#add-text-object)...
- `onClose` : Callback invoked when text editor is closed.
    ```javascript
    var callback = function(textObject) {
    }
    ```

Create a text editor ([input element](inputtext.md)) above text object.

- Size, font size, font family, font color, background color of text editor will be equal to text object.
- Text object will be invisible when text editor is opened.

#### Is opened

```javascript
var isOpened = editor.isOpened;
```

### Close editor

```javascript
editor.close();
```

Text editor will be closed when 

- Press enter key, or
- Touch outside of editor, or
- Open another text editor, or
- Call `editor.close()`
