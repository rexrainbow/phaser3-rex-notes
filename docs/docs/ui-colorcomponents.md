## Introduction

Edit color value by RGB, or HSV input fields. Clicking fist label can switch color format between *RGB* and *HSV*

- Author: Rex
- Game object

## Live demos

- [Color components](https://codepen.io/rexrainbow/pen/ZERJLXN)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-colorcomponents)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add color-components object
    ```javascript
    var colorComponents = scene.rexUI.add.colorComponents(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add color-components object
    ```javascript
    var colorComponents = scene.rexUI.add.colorComponents(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ColorComponents } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add color-components object
    ```javascript    
    var colorComponents = new ColorComponents(scene, config);
    scene.add.existing(colorComponents);
    ```

### Add colorComponents object

```javascript
var colorComponents = scene.rexUI.add.colorComponents({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    background: backgroundGameObject,

    formatLabel: {
        background: {
            radius: 0,
            color: undefined, alpha: undefined,
            strokeColor: undefined, strokeAlpha: undefined, strokeWidth: 2
        },

        text: {
            fontFamily: 'Courier',
            fontSize: '16px',
            fontStyle: '',
            backgroundColor: null,
            color: '#fff',
            stroke: '#fff',
            strokeThickness: 0,
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#000',
                blur: 0,
                stroke: false,
                fill: false
            },
            align: 'left',  // 'left'|'center'|'right'|'justify'
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        },

        space: {left: 0, right: 0, top: 0, bottom: 0}
    },

    // formatLabel: labelGameObject,

    inputText: {
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
            vAlign: 'center',  // For single line text input
            charWrap: true,    // For single line text input
        },

        // enterClose: true,
        // readOnly: false,
    
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
    },

    // inputText0: canvasInputGameObject,
    // inputText1: canvasInputGameObject,
    // inputText2: canvasInputGameObject,

    // proportion: { formatLabel: 0 },

    valuechangeCallback: function(newValue, oldValue, knob) {
    },
    valuechangeCallbackScope: undefined,

    value: 0xffffff,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        item: 0
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,    
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y`, `aspectRatio` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `aspectRatio` :
        - `undefined`, or `false` : Does not keep aspect ratio. Default behavior.
        - `true` : Use the current width and height as the aspect ratio.
        - A number : Use given number as the aspect ratio.    
    - `onResizeCallback` : A default resize callback will be assigned interanlly.
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of colorComponents.
- `formatLabel` : Clicking this label can switch color format between *RGB* and *HSV*
    - A [label](ui-label.md) game object, or a [text](text.md) game object.
    - A plain object
        ```javascript
        {
            background: {
                radius: 0,
                color: undefined, alpha: undefined,
                strokeColor: undefined, strokeAlpha: undefined, strokeWidth: 2
            },
        
            text: textStyle,
        
            space: {left: 0, right: 0, top: 0, bottom: 0}
        }
        ```
        - `formatLable.background` : Parameters to create [round rectangle](shape-roundrectangle.md) game object.
        - `formatLable.text` : Text style to create [text.md] game object.
        - `formatLabel.space` : Padding space around format label.    
- `inputText` : Configuration of [canvasInput](canvasinput.md#create-instance)
- `inputText0`, `inputText1`, `inputText2` : 3 canvas input game objects if parameter `inputText` is not given.
- `proportion` :
    - `proportion.formatLabel` : Default value is `0`.
- `valuechangeCallback` : callback function when value changed.
- `value` : Initial color value (0 ~ 0xffffff).
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space between swatch and inputText.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).

### Custom class

- Define class
    ```javascript
    class MyColorComponents extends RexPlugins.UI.ColorComponents {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var colorComponents = new MyColorComponents(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
colorComponents.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = colorComponents.getElement('background');
        ```
    - Format-label game object
        ```javascript
        var icon = colorComponents.getElement('formatLabel');
        ```
    - Color component input text game objects
        ```javascript
        var textObjects = colorComponents.getElement('components');
        ```
        - `textObjects` : An arrray with 3 [canvas input](canvasinput.md) game objects.
- Get by name
    ```javascript
    var gameObject = colorComponents.getElement('#' + name);
    // var gameObject = colorComponents.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = colorComponents.getByName(name);
    // var gameObject = colorComponents.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Value

Change value will also change the position of marker on H-palette and SV-palette

- Get color value
    ```javascript
    var value = colorComponents.value;
    // var value = colorComponents.color;
    ```
- Set color value
    ```javascript
    colorComponents.setValue(value);
    // colorComponents.setColor(value);
    ```
    or
    ```javascript
    colorComponents.value = value;
    colorComponents.color = value;
    ```

### Events

- On value changed
    ```javascript
    colorComponents.on('valuechange', function(newValue, oldValue, colorComponents){
        //
    }, scope);
    ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).