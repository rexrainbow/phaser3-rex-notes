## Introduction

Create an [input text object](inputtext.md) above a text object to edit string content.

- Author: Rex
- Behavior of text object

## Live demos

- [Text edit](https://codepen.io/rexrainbow/pen/dyezeQN)
- [Text area](https://codepen.io/rexrainbow/pen/eYQMwYj)
- [Number edit](https://codepen.io/rexrainbow/pen/OJLQyKz)
- [With rexui-Label](https://codepen.io/rexrainbow/pen/YbvwBw)
- [Text game object inside container](https://codepen.io/rexrainbow/pen/JjzoxXL)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/textedit)

### Install plugin

#### Load minify file

- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },
        input: {
            mouse: {
                target: divId
            },
            touch: {
                target: divId
            },
        },
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true);
    ```
- Open editor
    - Add text-edit behavior, will open editor under `'pointerdown'` event.
        ```javascript
        var editor = scene.plugins.get('rextexteditplugin').add(textGameObject, config);
        ```
    - Open editor directly
        ```javascript
        var editor = scene.plugins.get('rextexteditplugin').edit(textGameObject, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TextEditPlugin from 'phaser3-rex-plugins/plugins/textedit-plugin.js';
    var config = {
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },
        input: {
            mouse: {
                target: divId
            },
            touch: {
                target: divId
            },
        },
        // ...
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
- Open editor
    - Add text-edit behavior, will open editor under `'pointerdown'` event.
        ```javascript
        var editor = scene.plugins.get('rexTextEdit').add(textGameObject, config);
        ```
    - Open editor directly
        ```javascript
        var editor = scene.plugins.get('rexTextEdit').edit(textGameObject, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },
        input: {
            mouse: {
                target: divId
            },
            touch: {
                target: divId
            },
        },
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Import class
    ```javascript
    import { TextEdit, Edit } from 'phaser3-rex-plugins/plugins/textedit.js';
    ```
- Open editor
    - Add text-edit behavior, will open editor under `'pointerdown'` event.
        ```javascript
        var editor = new TextEdit(textGameObject, config);
        ```
    - Open editor directly
        ```javascript
        var editor = Edit(textGameObject, config);
        ```
 
### Open text editor

Open editor directly.

```javascript
var editor = scene.plugins.get('rexTextEdit').edit(textObject, {
    // inputType: 'text',   // 'text'|'password'|'textarea'|...
    // type: 'text',    // 'text'|'password'|'textarea'|...

    // enterClose: true,
    // selectAll: false,

    // onCreate: undefined,
    // onOpen: undefined,
    // onTextChanged: undefined,
    // onClose: undefined,

    // text: '',

    // other_style: '...'
});
// var editor = scene.plugins.get('rexTextEdit').edit(textObject, config, onClose);
```

- `textObject` : [Text object](text.md), [bbcode text object](bbcodetext.md), or [tag text object](tagtext.md).
- `config` : 
    - `config.inputType`, or `config.type` : 
        - `'text'` (default), or 
        - `'password'`
        - `'number'`
    - `config.onCreate` : Callback invoked when input text is created, before focusing.
        ```javascript
        function (textObject, inputText) {
        }
        ```
        - `textObject` : Target text object.
        - `inputText` : [input text object](inputtext.md) for editor.
    - `config.onOpen` : Callback invoked when [input text object](inputtext.md) is created and focused.
        ```javascript
        function (textObject, inputText) {
        }
        ```
        - `textObject` : Target text object.
        - `inputText` : [input text object](inputtext.md) for editor.
    - `config.onTextChanged` : Callback invoked when input text changed.
        ```javascript
        function (textObject, text) {
            textObject.text = text;
        }
        ```
    - `config.onClose` : Callback invoked when input text is closed. This parameter is valid only when `onClose` parameter is not given.
        ```javascript
        function (textObject) {
        }
        ```
    - `enterClose` : 
        - `true` : Close input text when enter-key was pressed. Default value is `true` if `inputType` is not `'textarea'`.
        - `false` : If `inputType` is set to `'textarea'`, default value will be `false`.
    - `config.selectAll` : Set `true` to select all text.
    - `config.text` : Initial string content. Default is the string content of textObject.
    - [More configuration parameters](inputtext.md#add-input-text-object)...
- `onClose` : Callback invoked when input text is closed.
    ```javascript
    var callback = function(textObject) {
    }
    ```

Create a text editor ([input element](textedit.md)) above text object.

- Size, font size, font family, font color, background color, background corner radius, padding-left, padding-right of text editor will be assigned from text object.
- Text object will be invisible when text editor is opened.
- Store reference of text editor at `textObject._editor`.
- Text editor will be closed when 
    - Press enter key and `enterClose` is set, or
    - Touch outside of editor, or
    - Open another text editor, or
    - Call `editor.close()`

!!! important "Limitation of text game object"
    Don't assign *height* property of text game object.  
    Because that text input element does not have vertical align setting, text will always align to middle/center.

### Create instance

Add text-edit behavior, will open editor under `'pointerdown'` event.

```javascript
var editor = scene.plugins.get('rexTextEdit').add(textGameObject, {
    // type: 'text',   //'text','password','number'
    // enterClose: true,
    // selectAll: false,

    // onOpen: undefined,
    // onTextChanged: undefined,
    // onClose: undefined,

    // text: '',
});
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
    - [More configuration parameters](textedit.md#add-text-object)...
- `onClose` : Callback invoked when text editor is closed.
    ```javascript
    var callback = function(textObject) {
    }
    ```

Create a text editor ([input element](textedit.md)) above text object.

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

### Get DOM

```javascript
var inputText = editor.inputText.node;
```

### Bypass key input

See [InputText/Bypass key input](inputtext.md#bypass-key-input)

### Deactive editor

```javascript
textObject.disableInteractive();
```

See also [touch input/disable interactive](touchevents.md#disable-interactive)


### Interactive with other game objects

See [dom-element's Interactive with other game objects](domelement.md#interactive-with-other-game-objects)