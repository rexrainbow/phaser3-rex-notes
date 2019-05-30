## Introduction

[Input DOM element](https://www.w3schools.com/tags/tag_input.asp).

- Author: Rex
- [DOM Game object](domelement.md)

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/inputtext-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexinputtextplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/inputtext.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/inputtext)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    parent: divId,
    dom: {
        createContainer: true
    },
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

- Set `parent` to divId
- Set `dom.createContainer` to `true`.

### Add text object

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

    type: 'text',    // 'text'|'password'|'textarea'

    // Element properties
    id: undefined,
    text: undefined,
    placeholder: undefined,
    tooltip: undefined,
    readOnly: false,
    spellCheck: false,
    autoComplete: 'off',

    // Style properties
    align: undefined,
    fontFamily: undefined,
    fontSize: undefined,
    color: '#ffffff',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    outline: 'none',
}
```

- `x`, `y` : Position
- `width`, `height` : Size of element
- `type` : Type of element
    - `'text'`, `'password'`, or `'textarea'`
- Element properties
    - `id` : `id` element property.
    - `text` : `value` element property.
    - `placeholder` : `placeholder` element property.
    - `tooltip` : `title` element property.
    - `readOnly` : `readonly` element property.
    - `spellCheck` : `spellcheck` element property.
    - `autoComplete` : `autocomplete` element property.
- Element style properties
    - `align` : `text-align` style property.
    - `fontFamily` : `font-family` style property.
    - `fontSize` : `font-size` style property.
    - `color` : `color` style property.
    - `backgroundColor` : `backgroundColor` style property.
    - `borderColor` : `borderColor` style property.
    - `outline` : `outline` style property.

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
- Select all text
    ```javascript
    inputText.selectText();
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

### Resize

```javascript
inputText.resize(width, height);
```

### Events

- On text changed
    ```javascript
    inputText.on('textchange', function(inputText){ }, scope);
    ```
- On focus
    ```javascript
    inputText.on('focus', function(inputText){ }, scope);
    ```
- On blur
    ```javascript
    inputText.on('blur', function(inputText){ }, scope);
    ```
- On click, double click
    ```javascript
    inputText.on('click', function(inputText){ }, scope);
    ```
    ```javascript
    inputText.on('dblclick', function(inputText){ }, scope);
    ```
    Touch/mouse events on input text object won't be propagated to game canvas.