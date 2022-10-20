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

    padding: 0,  // {left: 0, right: 0, top: 0, bottom: 0}

    background: {
        color: null,
        color2: null,
        horizontalGradient: true,

        stroke: null,
        strokeThickness: 2,

        cornerRadius: 0,
        cornerIteration: null
    },

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
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        lineHeight: undefined,
        maxLines: undefined,
        wrapWidth: undefined,
        letterSpacing: 0,
        hAlign: 0,
        vAlign: 0,
        charWrap: false
    },
    
    // Parameters of hidden-text-editor   
    // inputType: 'text',  // 'text'|'password'|'textarea'|...                

    // enterClose: true,

    // Callbacks
    // onOpen: function (textObject, hiddenInputText) {
    // },

    // onClose: function (textObject, hiddenInputText) {
    // },

    // onUpdate: function (text, textObject, hiddenInputText) {
    //     return text;
    // },
    // onUpdate: 'number',    // Only output number string

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

});
```

- Parameters of [DynamicText](dynamictext.md#create-instance)...
- Parameters of hidden-text-editor
    - `inputType` : Type of element
        - `'text'`, `'password'`, `'textarea'`, ...
    - `enterClose` : Set `true` to close input text when enter-key was pressed. Default value is true.
- Callbacks
    - `onOpen` : Callback invoked when focus on this hidden input text.
        ```javascript
        function (textObject, txt) {
        }
        ```
    - `onClose` : Callback invoked when blur.
        ```javascript
        function (textObject, txt) {
        }
        ```
    - `onUpdate` : 
        - A callback invoked in each tick of editing.
            ```javascript
            function (text, textObject, txt) {
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

### Events

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

### Select text

This feature does not support.

### Bypass key input

Registered [keyboard events](keyboardevents.md#key-object) might capture key input. 

```javascript
var keyObj = scene.input.keyboard.addKey('W', enableCapture, emitOnRepeat);
```

Set `enableCapture` to `false` to bypass key input to this input-text game objecct.

### Other properties

See [DynamicText](dynamictext.md).