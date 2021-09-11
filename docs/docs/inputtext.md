## Introduction

[Input DOM element](https://www.w3schools.com/tags/tag_input.asp).

- Author: Rex
- [DOM Game object](domelement.md)

## Live demos

- [Input text](https://codepen.io/rexrainbow/pen/WBxveQ)
- [Number input](https://codepen.io/rexrainbow/pen/mddNbPj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/inputtext)

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
        dom: {
            createContainer: true
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
- Element style properties
    - `align` : `text-align` style property.
    - `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` : `padding-left`, `padding-right`, `padding-top`, `padding-bottom` style property.
    - `fontFamily` : `font-family` style property.
    - `fontSize` : `font-size` style property.
    - `color` : `color` style property.
    - `backgroundColor` : `backgroundColor` style property.
    - `border`, `borderColor` : `border`, `borderColor` style property.
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

### Resize

```javascript
inputText.resize(width, height);
```

### Select text

- Select all text
    ```javascript
    inputText.selectAll();
    ```

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
    Touch/mouse events on input text object won't be propagated to game canvas.