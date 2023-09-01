## Introduction

An invisible Input DOM element to 
receive character input and display on [text](text.md), [bbocodetext](bbcodetext.md), or [tagtext](tagtext.md).

Inspirited from [CanvasInput](https://goldfirestudios.com/canvasinput-html5-canvas-text-input).

- Author: Rex
- Behavior of text object

## Live demos

- [With Text](https://codepen.io/rexrainbow/pen/WNXxEMV)
- [With BBCodeText](https://codepen.io/rexrainbow/pen/YzEWrzR)
- [With rexui-Label](https://codepen.io/rexrainbow/pen/MWOjJzZ)
- [With bitmaptext](https://codepen.io/rexrainbow/pen/ExdNxBz)
- [Number input](https://codepen.io/rexrainbow/pen/NWyvJmz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/hiddeninputtext)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexhiddeninputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhiddeninputtextplugin.min.js', true);
    ```
- Add text-edit behavior
    ```javascript
    var hiddenInputText = scene.plugins.get('rexhiddeninputtextplugin').add(textGameObject, config);
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
- Add text-edit behavior
    ```javascript
    var hiddenInputText = scene.plugins.get('rexHiddenInputTextPlugin').add(textGameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import HiddenInputText from 'phaser3-rex-plugins/plugins/hiddeninputtext.js';
    ```
- Add text-edit behavior
    ```javascript    
    var hiddenInputText = new HiddenInputText(textGameObject, config);
    ```

### Add input text object

```javascript
var hiddenInputText = scene.plugins.get('rexHiddenInputTextPlugin').add(textGameObject, {
    // inputType: 'text',    // 'text'|'password'|'textarea'|...
    // type: 'text',    // 'text'|'password'|'textarea'|...

    cursor: '|',
    cursorFlashDuration: 1000,

    // enterClose: true,

    // onOpen: function (textObject, hiddenInputText) {   // Or onFocus:
    // },
    // onClose: function (textObject, hiddenInputText) {  // Or onBlur:
    // },
    // onUpdate: function (text, textObject, hiddenInputText) {
    //     return text;
    // },
});
```

- `textGameObject` : 
- `inputType`, or `type` : Type of element
    - `'text'`, `'password'`, `'textarea'`, ...
- `cursor` : Cursor character used in default update text callback.
    - `null`, or `''` : Don't insert cursor character.
- `cursorFlashDuration` : Display cursor character or a space string to create a flash cursor.
- `enterClose` : 
    - `true` : Close input text when enter-key was pressed. Default value is `true` if `inputType` is not `'textarea'`.
    - `false` : If `inputType` is set to `'textarea'`, default value will be `false`.
- `onOpen`, or `onFocuse` : Callback invoked when focus on this hidden input text.
    ```javascript
    function (textObject, hiddenInputText) {
    }
    ```
- `onClose`, or `onBlur` : Callback invoked when blur.
    ```javascript
    function (textObject, hiddenInputText) {
    }
    ```
- `onUpdate` : 
    - A callback invoked in each tick of editing.
        ```javascript
        function (text, textObject, hiddenInputText) {
            // return text;
        }
        ```
        - Can return a new string for text game object displaying.
    - `'number'` : Only output number string.

!!! note

    This hiddenInputText will be destroyed when `textGameObject` is destroyed.

### Custom class

- Define class
    ```javascript
    class MyHiddenText extends HiddenInputText {
        constructor(textGameObject, config) {
            super(textGameObject, config) {
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
    var hiddenInputText = new MyHiddenText(textGameObject, config);
    ```

### Cursor

- Set
    ```javascript
    hiddenInputText.setCursor(s);
    ```
- Get
    ```javascript
    var cursor = hiddenInputText.cursor;
    ```

### Open editor

```javascript
hiddenInputText.open();
```

### Close editor

```javascript
hiddenInputText.close();
```

#### Is opened

```javascript
var isOpened = hiddenInputText.isOpened;
```

### Select text

This feature does not support.

### Bypass key input

Registered [keyboard events](keyboardevents.md#key-object) might capture key input. 

```javascript
var keyObj = scene.input.keyboard.addKey('W', enableCapture, emitOnRepeat);
```

Set `enableCapture` to `false` to bypass key input to this input-text game objecct.

### Event

- On text change
    ```javascript
    hiddenInputText.on('textchange', function(text, textGameObject){
    })
    ```
- Not a number input
    ```javascript
    hiddenInputText.on('nan', function(text){

    })
    ```
- Close editor by ENTER key down
    ```javascript
    hiddenInputText.on('keydown-ENTER', function(){
    })
    ```