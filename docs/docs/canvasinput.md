## Introduction

An invisible Input DOM element to 
receive character input and display on [DynamicText](dynamictext.md).

Inspirited from [CanvasInput](https://goldfirestudios.com/canvasinput-html5-canvas-text-input).

- Author: Rex
- Game object

## Live demos

- [Simple](https://codepen.io/rexrainbow/pen/vYjwjyW)
- [Text input](https://codepen.io/rexrainbow/pen/poVPGKe)
- [Number input](https://codepen.io/rexrainbow/pen/jOxarOO)
- [With rexui-Label](https://codepen.io/rexrainbow/pen/jOKOJoV)
- [Text area](https://codepen.io/rexrainbow/pen/wvQjxxr)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/canvasinput)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcanvasinputplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasinputplugin.min.js', true);
    ```
- Add canvas-input object
    ```javascript
    var txt = scene.add.rexCanvasInput(x, y, width, height, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CanvasInputPlugin from 'phaser3-rex-plugins/plugins/canvasinput-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCanvasInputPlugin',
                plugin: CanvasInputPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add canvas-input object
    ```javascript
    var txt = scene.add.rexCanvasInput(x, y, width, height, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CanvasInput from 'phaser3-rex-plugins/plugins/canvasinput.js';
    ```
- Add canvas-input object
    ```javascript    
    var txt = new CanvasInput(textGameObject, x, y, width, height, config);
    scene.add.existing(txt);
    ```

### Create instance

```javascript
var txt = scene.add.rexCanvasInput({
    // Parameters of DynamicText
    x: 0, 
    y: 0,
    width: undefined, 
    height: undefined,

    background: {
        color: null,
        color2: null,
        horizontalGradient: true,

        stroke: null,
        strokeThickness: 2,

        cornerRadius: 0,
        cornerIteration: null,
        
        // Style when focus
        // 'focus.color': ...
        // 'focus.color2': ...
        // 'focus.stroke': ...
    },
    focusStyle: undefined,

    innerBounds: {
        color: null,
        color2: null,
        horizontalGradient: true,

        stroke: null,
        strokeThickness: 2
    },

    style: {
        bold: false,
        italic: false,
        fontSize: '16px',
        fontFamily: 'Courier',
        color: '#fff',
        stroke: '#fff',
        strokeThickness: 0,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        backgroundColor: null,
        backgroundHeight: undefined,
        backgroundBY: undefined,
        offsetX: 0,
        offsetY: 0,

        // Style when cursor move on
        // 'cursor.color': ...
        // 'cursor.backgroundColor': ...
        // 'cursor.xxx': ...
    },
    cursorStyle: undefined,

    childrenInteractive: false,

    text: '',

    wrap: {
        lineHeight: undefined,
        useDefaultLineHeight: true,
        maxLines: 1,
        wrapWidth: undefined,
        letterSpacing: 0,
        hAlign: 0,
        vAlign: 'center',  // For single line text input
        charWrap: true,    // For single line text input
    },

    textArea: false,
    
    // Parameters of hidden-text-editor   
    // inputType: 'text',  // 'text'|'password'|'textarea'|...                
    
    // readOnly: false,
    // maxLength: undefined,
    // minLength: undefined,
    // selectAll: false,

    // enterClose: true,

    // Callbacks
    // onOpen: function (textObject, hiddenInputText) {
    // },

    // onClose: function (textObject, hiddenInputText) {
    // },

    // onUpdate: function (text, textObject, hiddenInputText) {
    //     return text;
    // },   

    // onAddChar: function(child, index, canvasInput) {
    //    child.modifyStyle({...})
    // },

    // onCursorOut: function(child, cursorIndex, canvasInput) {
    //     child.modifyStyle({
    //         
    //     });
    // },

    // onCursorIn: function(child, cursorIndex, canvasInput) {
    //     child.modifyStyle({
    //         
    //     });
    // },

    // parseTextCallback: function(text) {
    //     return text;
    // }.

});
```

- `textArea` : 
    - `false` : Single line text input. Default behavior.
    - `true` : Multiple lines text input.
- Parameters of [DynamicText](dynamictext.md#create-instance)...
    - `wrap` : Some default value in `wrap` are changed
        - `wrap.useDefaultLineHeight` : Default value is `true`
        - `wrap.maxLines` : Default value is `1`
        - `wrap.vAlign` : Default value is `'center'`
- Parameters of hidden-text-editor
    - `inputType` : Type of element
        - `'text'`, `'password'`, `'textarea'`, ...
    - `enterClose` : Set `true` to close input text when enter-key was pressed. Default value is `true`.
    - `readOnly` : 
        - `true` : un-editable.
        - `false` : Editable. Defaule behavior.
    - `maxLength`, `minLength` : Maximun or minimun of input characters
    - `selectAll` : Set to `true` to select all characters when focusing.
- Callbacks
    - `onOpen` : Callback invoked when focus on this hidden input text.
        ```javascript
        function (textObject) {
            // textObject.setInputText(txt);
        }
        ```
    - `onClose` : Callback invoked when blur.
        ```javascript
        function (textObject) {            
        }
        ```
    - `onUpdate` : 
        - A callback invoked in each tick of editing.
            ```javascript
            function (text, textObject) {
                // return text;
            }
            ```
            - Can return a new string for text game object displaying.
        - `'number'` : Only output number string.
    - `onAddChar` : Callback invoked when adding new [character child](dynamictext.md#character)
        ```javascript
        function(child, index, canvasInput) {
            child.modifyStyle({...})
        }
        ```
        - `child` : [character child](dynamictext.md#character)
    - `onCursorOut` : Callback invoked when cursor move out of a character child
        ```javascript
        function(child, index, canvasInput) {
            child.modifyStyle({...})
        }
        ```
        - `child` : [character child](dynamictext.md#character)
    - `onCursorIn` : Callback invoked when cursor move on a character child
        ```javascript
        function(child, index, canvasInput) {
            child.modifyStyle({...})
        }
        ```
        - `child` : [character child](dynamictext.md#character)
    - `parseTextCallback` : Callback of parsing text (`txt.text`) to value (`txt.value`)
        - `undefined` : Bypass text to value. Default behavior.
        - A function object
            ```javascript
            function(text) {
                return text;
            }
            ```
- `focusStyle` : Will apply this style to background when focusing.
    - `undefined` : Ignore this behavior.
    - A plain object
        ```javascript
        {
            color: null,
            color2: null,
            horizontalGradient: true,

            stroke: null,
            strokeThickness: 2,

            cornerRadius: 0,
            cornerIteration: null,
        }
        ```
    - Or add these style settings in `background` parameter, with prefix `'focus.'`.
- `cursorStyle` : Will apply this style when cursor move on a character child.
    - `undefined` : Ignore this behavior.
    - A plain object
        ```javascript
        {
            bold: false,
            italic: false,
            fontSize: '16px',
            fontFamily: 'Courier',
            color: '#fff',
            stroke: '#fff',
            strokeThickness: 0,
            shadowColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            backgroundColor: null,
            backgroundHeight: undefined,
            backgroundBY: undefined,
            offsetX: 0,
            offsetY: 0
        }
        ```
    - Or add these style settings in `style` parameter, with prefix `'cursor.'`.


#### Number input

```javascript
txt.setNumberInput();
```

### Custom class

- Define class
    ```javascript
    class MyCanvasInput extends CanvasInput {
        constructor(textGameObject, x, y, width, height, config)) {
            super(textGameObject, x, y, width, height, config)) {
            // ...            
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
    var txt = new MyCanvasInput(textGameObject, config);
    ```

### Open editor

```javascript
txt.open();
```

or

```javascript
txt.open(onCloseCallback);
```

- `onCloseCallback` : Callback invoked when closing text-editor

### Close editor

```javascript
txt.close();
```

#### Is opened

```javascript
var isOpened = txt.isOpened;
```

### Text

- Display text on [dynamic text game object](dynamictext.md)
    - Get
        ```javascript
        var text = txt.text;
        ```
        or
        ```javascript        
        var text = txt.displayText;
        ```
    - Set
        ```javascript
        txt.setText(text);
        ```
        or 
        ```javascript
        txt.setDisplayText(text);
        ```
- Input text on [hidden text edit behavior](hiddeninputtext.md)
    - Get
        ```javascript
        var text = txt.inputText;
        ```
    - Set
        ```javascript
        var text = txt.setInputText(text);
        ```

### Value

- Get. Parse text to value.
    ```javascript
    var value = txt.getValue();
    // var value = txt.value;
    ```
    - Set `parseTextCallback`
        ```javascript
        txt.setParseTextCallback(callback);
        ```
        - `callback` : 
            - `undefined` : Bypass text to value. Default behavior.
            - A function object
                ```javascript
                function(text) {
                    return text;
                }
                ```
- Set. Conver any type of `value` to string.
    ```javascript
    txt.setValue(value);
    // txt.value = value;
    ```

### Read only

- Enable read only
    ```javascript
    txt.setReadOnly();
    // txt.setReadOnly(true);
    ```
    or
    ```javascript
    txt.readOnly = true;
    ```
- Disable read only
    ```javascript
    txt.setReadOnly(false);
    ```
    or
    ```javascript
    txt.readOnly = false;
    ```
- Get read only
    ```javascript
    var readOnlyEanble = txt.readOnly;
    ```

### Size

- Resize canvas size
    ```javascript
    txt.setCanvasSize(width, height)
    ```
- Reisze text wrapping size and canvas size.
    ```javascript
    txt.setSize(width, height);
    ```
    or
    ```javascript
    txt.setFixedSize(width, height);
    ```
- Resize to minimun size to show all visible characters.
    ```javascript
    txt.setToMinSize();
    ```

### Events

- On text change
    ```javascript
    txt.on('textchange', function(text, txt){
    })
    ```
- On character child adding
    ```javascript
    txt.on('addchar', function(child, index, canvasInput) {
        child.modifyStyle({...})
    })
    ```
    - `child` : [character child](dynamictext.md#character)
- On cursor moving out of a character child
    ```javascript
    txt.on('cursorout', function(child, index, canvasInput) {
        child.modifyStyle({...})
    })
    ```
    - `child` : [character child](dynamictext.md#character)
- On cursor moving on a character child
    ```javascript
    txt.on('cursorin', function(child, index, canvasInput) {
        child.modifyStyle({...})
    })
    ```
    - `child` : [character child](dynamictext.md#character)
- On open text-editor
    ```javascript
    txt.on('open', function() {

    })
    ```
- On close text-editor
    ```javascript
    txt.on('close', function() {
        
    })
    ```
- Close editor by ENTER key down
    ```javascript
    txt.on('keydown-ENTER', function(){
    })
    ```
- Not a number input
    ```javascript
    txt.on('nan', function(text){

    })
    ```

### Select text

This feature does not support.

### Bypass key input

Registered [keyboard events](keyboardevents.md#key-object) might capture key input. 

```javascript
var keyObj = scene.input.keyboard.addKey('W', enableCapture, emitOnRepeat);
```

Set `enableCapture` to `false` to bypass key input to this input-text game objecct.

### Other properties

See [Dynamic text game object](dynamictext.md) [game object](gameobject.md)

### Create mask

```javascript
var mask = txt.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Support [preFX and postFX effects](shader-builtin.md)
