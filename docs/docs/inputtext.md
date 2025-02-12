## Introduction

[Input DOM element](https://www.w3schools.com/tags/tag_input.asp).

- Author: Rex
- [DOM Game object](domelement.md)

## Live demos

- [Input text](https://codepen.io/rexrainbow/pen/WBxveQ)
- [Number input](https://codepen.io/rexrainbow/pen/mddNbPj)
- [In fullscreen](https://codepen.io/rexrainbow/pen/poKYPvG)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/inputtext)

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
    scene.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    ```
- Add input-text object
    ```javascript
    var inputText = scene.add.rexInputText(x, y, width, height, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
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
                key: 'rexInputTextPlugin',
                plugin: InputTextPlugin,
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
    var inputText = scene.add.rexInputText(x, y, width, height, config);
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
    import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
    ```
- Add input-text object
    ```javascript    
    var inputText = new InputText(scene, x, y, width, height, config);
    scene.add.existing(inputText);
    ```

### Add input text object

```javascript
var inputText = scene.add.rexInputText(x, y, width, height, config);
// var inputText = scene.add.rexInputText(x, y, config);
// var inputText = scene.add.rexInputText(config);
```

Default configuration

```javascript
{
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

    type: 'text',    // 'text'|'password'|'textarea'|'number'|'color'|...

    // Element properties
    id: undefined,
    text: undefined,
    maxLength: undefined,
    minLength: undefined,    
    placeholder: undefined,
    tooltip: undefined,
    readOnly: false,
    spellCheck: false,
    autoComplete: 'off',
    autoCapitalize: 'off',

    // Style properties
    align: undefined,
    paddingLeft: undefined,
    paddingRight: undefined,
    paddingTop: undefined,
    paddingBottom: undefined,
    fontFamily: undefined,
    fontSize: undefined,
    color: '#ffffff',
    border: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: undefined,
    outline: 'none',
    direction: 'ltr',

    selectAll: false
}
```

- `x`, `y` : Position
- `width`, `height` : Size of element
- `type` : Type of element
    - `'text'`, `'password'`, `'textarea'`, `'number'`, `'color'`, ...
- Element properties
    - `id` : `id` element property.
    - `text` : `value` element property.
    - `maxLength` : `maxLength` element property.
    - `minLength` : `minLength` element property.
    - `placeholder` : `placeholder` element property.
    - `tooltip` : `title` element property.
    - `readOnly` : `readonly` element property.
    - `spellCheck` : `spellcheck` element property.
    - `autoComplete` : `autocomplete` element property.
    - `autoCapitalize` : `autocapitalize` element property.
- Element style properties
    - `align` : `text-align` style property.
    - `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` : `padding-left`, `padding-right`, `padding-top`, `padding-bottom` style property.
    - `fontFamily` : `font-family` style property.
    - `fontSize` : `font-size` style property.
    - `color` : `color` style property.
    - `backgroundColor` : `backgroundColor` style property.
    - `border`, `borderColor`, `borderRadius` : `border`, `borderColor`, `border-radius` style property.
    - `outline` : `outline` style property.
    - `direction` : `direction` style property.
- `selectAll` : Set `true` to select all text.

### Custom class

- Define class
    ```javascript
    class MyText extends InputText {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config) {
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
    var inputText = new MyText(scene, x, y, width, height, config);
    ```

### Text

- Get
    ```javascript
    var text = inputText.text;
    ```
- Set
    ```javascript
    inputText.setText(text);
    // inputText.text = text;
    ```
- Scroll to bottom
    ```javascript
    inputText.scrollToBottom();
    ```

### Style

- Get
    ```javascript
    var value = inputText.getStyle(key);
    ```
- Set
    ```javascript
    inputText.setStyle(key, value)
    ```

### Focus

- Focus
    ```javascript
    inputText.setFocus();
    ```
- Blur
    ```javascript
    inputText.setBlur();
    ```
- Is focused
    ```javascript
    var isFocused = inputText.isFocused;
    ```

### Font color

- Get
    ```javascript
    var color = inputText.fontColor;
    // var color = inputText.node.style.color;
    ```
- Set
    ```javascript
    inputText.fontColor = color;  // CSS color string
    // inputText.node.style.color = color;
    ```
    or
    ```javascript
    inputText.setFontColor(color);  // CSS color string
    ```

### Max length

- Get
    ```javascript
    var value = inputText.maxLength;
    ```
- Set
    ```javascript
    inputText.maxLength = value;
    ```
    or
    ```javascript
    inputText.setMaxLength(value);
    ```

### Min length

- Get
    ```javascript
    var value = inputText.minLength;
    ```
- Set
    ```javascript
    inputText.minLength = value;
    ```
    or
    ```javascript
    inputText.setMinLength(value);
    ```

### Placeholder

- Get
    ```javascript
    var value = inputText.placeholder;
    ```
- Set
    ```javascript
    inputText.placeholder = value;
    ```
    or
    ```javascript
    inputText.setPlaceholder(value);
    ```

### Tooltip

- Get
    ```javascript
    var value = inputText.tooltip;
    ```
- Set
    ```javascript
    inputText.tooltip = value;
    ```
    or
    ```javascript
    inputText.setTooltip(value);
    ```

### Readonly

- Get
    ```javascript
    var readOnly = inputText.readOnly;
    ```
- Set
    ```javascript
    inputText.readOnly = value;
    ```
    ```javascript
    inputText.setReadOnly();
    // inputText.setReadOnly(value);
    ```

### Resize

```javascript
inputText.resize(width, height);
```

### Select text

- Select all text
    ```javascript
    inputText.selectText();
    // inputText.selectAll();
    ```
- Select sub-string
    ```javascript
    inputText.selectText(selectionStart, selectionEnd);
    ```

### Cursor position

- Get
    ```javascript
    var cursorPosition = inputText.cursorPosition;
    ```
    - Equal to `inputText.selectionStart`.
- Set
    ```javascript
    inputText.setCursorPosition(cursorPosition);
    inputText.cursorPosition = cursorPosition;
    ```
    - Equal to `inputText.setSelectionRange(cursorPosition, cursorPosition)`

### Events

- On text changed
    ```javascript
    inputText.on('textchange', function(inputText, e){ }, scope);
    ```
- On focus
    ```javascript
    inputText.on('focus', function(inputText, e){ }, scope);
    ```
- On blur
    ```javascript
    inputText.on('blur', function(inputText, e){ }, scope);
    ```
- On click, double click
    ```javascript
    inputText.on('click', function(inputText, e){ }, scope);
    ```
    ```javascript
    inputText.on('dblclick', function(inputText, e){ }, scope);
    ```
    - Touch/mouse events on input text object won't be propagated to game canvas.
- On keydown, keyup
    ```javascript
    inputText.on('keydown', function(inputText, e){ }, scope);
    ```
    ```javascript
    inputText.on('keyup', function(inputText, e){ }, scope);
    ```
    - Keyboard events on input text object won't be propagated to game canvas.
- On pointerdown, pointermove, pointerup
    ```javascript
    inputText.on('pointerdown', function(inputText, e){ }, scope);
    ```
    ```javascript
    inputText.on('pointermove', function(inputText, e){ }, scope);
    ```
    ```javascript
    inputText.on('pointerup', function(inputText, e){ }, scope);
    ```
    - Mouse/touch events on input text object won't be propagated to game canvas.
- On select
    ```javascript
    inputText.on('select', function(inputText, e){ 
        var selectedString = inputText.selectedText;
        var selectionStart = inputText.selectionStart;
        var selectionEnd = inputText.selectionEnd;
    }, scope);
    ```
- On composition inpit
    ```javascript
    inputText.on('compositionStart', function(inputText, e){ }, scope);
    ```
    ```javascript
    inputText.on('compositionEnd', function(inputText, e){ }, scope);
    ```
    ```javascript
    inputText.on('compositionUpdate', function(inputText, e){ }, scope);
    ```

### Bypass key input

Registered [keyboard events](keyboardevents.md#key-object) might capture key input. 

```javascript
var keyObj = scene.input.keyboard.addKey('W', enableCapture, emitOnRepeat);
```

Set `enableCapture` to `false` to bypass key input to this input-text game objecct.

### Other properties

See [dom game object](domelement.md), [game object](gameobject.md)

### Interactive with other game objects

See [dom-element's Interactive with other game objects](domelement.md#interactive-with-other-game-objects)

### Close editing

- Close editing (set blur) when pointerdown outside
    ```javascript
    scene.input.on('pointerdown', function () {
        inputText.setBlur();
    })
    ```
- Close editing (set blur) when ENTER key press
    ```javascript
    inputText.on('keydown', function (inputText, e) {
        if ((inputText.inputType !== 'textarea') && (e.key === 'Enter')) {
            inputText.setBlur();
        }
    })
    ```
    - `inputType` : `'text'`, `'textarea'`, ...
