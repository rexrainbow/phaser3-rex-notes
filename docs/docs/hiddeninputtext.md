## Introduction

A invisible [Input DOM element](https://www.w3schools.com/tags/tag_input.asp), to update 
the rendering result of [text](text.md), [bbocodetext](bbcodetext.md), or [tagtext](tagtext.md).

Inspirited by [CanvasInput](https://goldfirestudios.com/canvasinput-html5-canvas-text-input).

- Author: Rex
- [DOM Game object](domelement.md)

## Live demos

- [With Text](https://codepen.io/rexrainbow/pen/WNXxEMV)
- [With BBCodeText](https://codepen.io/rexrainbow/pen/YzEWrzR)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/hiddeninputtext)

### Install plugin

#### Load minify file

- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        dom: {
            createContainer: true
        },        
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexhiddeninputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhiddeninputtextplugin.min.js', true);
    ```
- Add input-text object
    ```javascript
    var hiddenInputText = scene.add.rexHiddenInputText(textGameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import HiddenInputTextPlugin from 'phaser3-rex-plugins/plugins/hiddeninputtext-plugin.js';
    var config = {
        parent: divId,
        dom: {
            createContainer: true
        },        
        // ...
        plugins: {
            global: [{
                key: 'rexHiddenInputTextPlugin',
                plugin: HiddenInputTextPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add input-text object
    ```javascript
    var hiddenInputText = scene.add.rexHiddenInputText(textGameObject, config);
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
        dom: {
            createContainer: true
        },        
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Import class
    ```javascript
    import HiddenInputText from 'phaser3-rex-plugins/plugins/hiddeninputtext.js';
    ```
- Add input-text object
    ```javascript    
    var hiddenInputText = new HiddenInputText(textGameObject, config);
    scene.add.existing(hiddenInputText);
    ```

### Add input text object

```javascript
var hiddenInputText = scene.add.rexHiddenInputText(textGameObject, {
    type: 'text',    // 'text'|'password'|'textarea'|'number'|'color'|...

    cursor: '|',
    // updateTextCallback: DefaultUpdateTextCallback,
    // updateTextCallbackScope: undefined

    // Element properties
    id: undefined,
    text: undefined,
    maxLength: undefined,
    minLength: undefined,
    readOnly: false,

    // Style properties
    direction: 'ltr',
});
```

- `type` : Type of element
    - `'text'`, `'password'`, `'textarea'`, `'number'`, `'color'`, ...
- `cursor` : Cursor character used in default update text callback.
- `updateTextCallback` : Callback of updating text at each tick. Default update text callback will insert `cursor` in to current string of this hidden input text.
    ```javascript
    function (text, hiddenInputText) {
        if (hiddenInputText.isFocused) {
            var cursorPosition = hiddenInputText.cursorPosition;
            return text.substring(0, cursorPosition) + hiddenInputText.cursor + text.substring(cursorPosition);
        } else {
            return text;
        }
    }
    ```
- `updateTextCallbackScope` : Scope of `updateTextCallback`.
- Element properties
    - `id` : `id` element property.
    - `text` : `value` element property.
    - `maxLength` : `maxLength` element property.
    - `minLength` : `minLength` element property.
    - `readOnly` : `readonly` element property.
- Element style properties
    - `direction` : `direction` style property.

!!! note

    This hiddenInputText will be destroyed when `textGameObject` is destroyed.

### Custom class

- Define class
    ```javascript
    class MyHiddenText extends HiddenInputText {
        constructor(textGameObject, config) {
            super(textGameObject, config) {
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var hiddenInputText = new MyHiddenText(textGameObject, config);
    ```

### Text

- Get
    ```javascript
    var text = hiddenInputText.text;
    ```
- Set
    ```javascript
    hiddenInputText.setText(text);
    // hiddenInputText.text = text;
    ```

### Focus

- Focus
    ```javascript
    hiddenInputText.setFocus();
    ```
- Blur
    ```javascript
    hiddenInputText.setBlur();
    ```
- Is focused
    ```javascript
    var isFocused = hiddenInputText.isFocused;
    ```

### Max length

- Get
    ```javascript
    var value = hiddenInputText.maxLength;
    ```
- Set
    ```javascript
    hiddenInputText.maxLength = value;
    ```
    or
    ```javascript
    hiddenInputText.setMaxLength(value);
    ```

### Min length

- Get
    ```javascript
    var value = hiddenInputText.minLength;
    ```
- Set
    ```javascript
    hiddenInputText.minLength = value;
    ```
    or
    ```javascript
    hiddenInputText.setMinLength(value);
    ```

### Select text

This feature does not support.

### Events

- On text changed
    ```javascript
    hiddenInputText.on('textchange', function(hiddenInputText, e){ }, scope);
    ```
- On focus
    ```javascript
    hiddenInputText.on('focus', function(hiddenInputText, e){ }, scope);
    ```
- On blur
    ```javascript
    hiddenInputText.on('blur', function(hiddenInputText, e){ }, scope);
    ```
- On click, double click
    ```javascript
    hiddenInputText.on('click', function(hiddenInputText, e){ }, scope);
    ```
    ```javascript
    hiddenInputText.on('dblclick', function(hiddenInputText, e){ }, scope);
    ```
    Touch/mouse events on input text object won't be propagated to game canvas.
- On keydown, keyup
    ```javascript
    hiddenInputText.on('keydown', function(hiddenInputText, e){ }, scope);
    ```
    ```javascript
    hiddenInputText.on('keyup', function(hiddenInputText, e){ }, scope);
    ```
    Keyboard events on input text object won't be propagated to game canvas.
- On pointerdown, pointermove, pointerup
    ```javascript
    hiddenInputText.on('pointerdown', function(hiddenInputText, e){ }, scope);
    ```
    ```javascript
    hiddenInputText.on('pointermove', function(hiddenInputText, e){ }, scope);
    ```
    ```javascript
    hiddenInputText.on('pointerup', function(hiddenInputText, e){ }, scope);
    ```
    Mouse/touch events on input text object won't be propagated to game canvas.
- On select
    ```javascript
    hiddenInputText.on('select', function(hiddenInputText, e){ 
        var selectedString = hiddenInputText.selectedText;
        var selectionStart = hiddenInputText.selectionStart;
        var selectionEnd = hiddenInputText.selectionEnd;
    }, scope);
    ```