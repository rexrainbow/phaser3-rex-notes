## Introduction

Pick color value from H and SV palettes.

- Author: Rex
- Game object

## Live demos

- [Color picker](https://codepen.io/rexrainbow/pen/JjZbQdM)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-colorPicker)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add color-picker object
    ```javascript
    var colorPicker = scene.rexUI.add.colorPicker(config);
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
- Add color-picker object
    ```javascript
    var colorPicker = scene.rexUI.add.colorPicker(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ColorPicker } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add color-picker object
    ```javascript    
    var colorPicker = new ColorPicker(scene, config);
    scene.add.existing(colorPicker);
    ```

### Add colorPicker object

```javascript
var colorPicker = scene.rexUI.add.colorPicker({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    background: backgroundGameObject,

    hPalette: {
        position: 'bottom',
        size: 10,
        width: undefined,
        height: undefined,       
    },

    svPalette: {
        width: undefined,
        height: undefined,
    },

    valuechangeCallback: function(newValue, oldValue, knob) {
    },
    valuechangeCallbackScope: undefined,

    value: 0xffffff,

    // space: { left: 0, right:0, top:0, bottom:0, item:0 },

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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of colorPicker.
- `hPalette` : Configuration of h-palette. H-palette is rendered on a [canvas game object](canvas.md).
    - `hPalette.position` : Position of h-palette.
        - `'bottom'` or `0` : Place h-palette at bottom side of sv-palette.
        - `'left'` or `1` : Place h-palette at left side of sv-palette.
        - `'top'` or `2` : Place h-palette at top side of sv-palette.
        - `'right'` or `3` : Place h-palette at right side of sv-palette.
    - `hPalette.size` : Width (if position of h-palette is at left or right side) or height (if position of h-palette is at top or bottom side) of h-palette.
    - `hPalette.width` : Width (if position of h-palette is at left or right side) of h-palette.
    - `hPalette.height` : Height (if position of h-palette is at top or bottom side) of h-palette.
- `svPalette` : Configuration of sv-palette. SV-palette is rendered on a [canvas game object](canvas.md).
    - `svPalette.width` : Width of sv-palette.
    - `svPalette.height` : Height of sv-palette.
- `valuechangeCallback` : callback function when value changed.
- `value` : Initial color value (0 ~ 0xffffff).
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space between sv-palette and h-palette.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).

### Custom class

- Define class
    ```javascript
    class MyColorPicker extends RexPlugins.UI.ColorPicker {
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
    var colorPicker = new MyColorPicker(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
colorPicker.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = colorPicker.getElement('background');
        ```
    - H-palette game object
        ```javascript
        var icon = colorPicker.getElement('hPalette');
        ```
    - SV-palette game object
        ```javascript
        var textObject = colorPicker.getElement('svPalette');
        ```
- Get by name
    ```javascript
    var gameObject = colorPicker.getElement('#' + name);
    // var gameObject = colorPicker.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = colorPicker.getByName(name);
    // var gameObject = colorPicker.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Value

Change value will also change the position of marker on H-palette and SV-palette

- Get color value
    ```javascript
    var value = colorPicker.value;
    // var value = colorPicker.color;
    ```
- Set color value
    ```javascript
    colorPicker.setValue(value);
    // colorPicker.setColor(value);
    ```
    or
    ```javascript
    colorPicker.value = value;
    colorPicker.color = value;
    ```

### Events

- On value changed
    ```javascript
    colorPicker.on('valuechange', function(newValue, oldValue, colorPicker){
        //
    }, scope);
    ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).