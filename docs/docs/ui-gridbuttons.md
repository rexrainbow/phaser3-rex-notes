## Introduction

A container with a group of buttons in grids.

- Author: Rex
- Game object

## Live demos

- [Number pad](https://codepen.io/rexrainbow/pen/MWaExGE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-gridbuttons)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add buttons object
    ```javascript
    var buttons = scene.rexUI.add.gridButtons(config);
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
- Add buttons object
    ```javascript
    var buttons = scene.rexUI.add.gridButtons(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { GridButtons } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add buttons object
    ```javascript    
    var buttons = new GridButtons(scene, config);
    sscene.add.existing(sizer);
    ```

### Add grid sizer object

```javascript
var buttons = scene.rexUI.add.gridButtons({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // Elements
    // background: backgroundGameObject,
    buttons: [
        [buttonGameObject, buttonGameObject, buttonGameObject, ...],
        [buttonGameObject, buttonGameObject, buttonGameObject, ...],
        [buttonGameObject, buttonGameObject, buttonGameObject, ...],
        ...
    ],
    expand: true,
    click: {
        mode: 'pointerup',
        clickInterval: 100
    },

    // space: {
    //     left: 0, right: 0, top: 0, bottom:0,
    //     column: 0, // [0, 0, 0]
    //     row: 0     // [0, 0, 0]
    // },

    // name: '',
    // draggable: false
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `width` : Minimum width. i.e. Width of this gridButtons will larger then this value.
- `height` : Minimum height. i.e. Hieght of this gridButtons will larger then this value.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of grid table.
- `buttons` : 2d array of button game objects.
- `expand` : Set `true` to expand width and height of buton game objects.
- `space` : Space around this sizer, and space between columns/rows
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space around this sizer.
    - `space.column` : Space between 2 columns
        - A number
        - A number array
    - `space.row` : Space between 2 rows
        - A number
        - A number array

### Custom class

- Define class
    ```javascript
    class MyGridButtons extends RexPlugins.UI.GridButtons {
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
    var buttons = new MyGridButtons(scene, config);
    ```

### Layout children

Arrange position of all children.

```javascript
buttons.layout();
```

### Other properties

See [grid sizer object](ui-gridsizer.md).

### Events

The same as [events of buttons](ui-buttons.md#events).

### Get element

- Get element
    - Background game object
        ```javascript
        var background = buttons.getElement('background');
        ```
    - Button game objects
        ```javascript
        var buttonObjects = buttons.getElement('buttons');
        ```
        or
        ```javascript
        var buttonObject = buttons.getButton(index);
        ```
        or
        ```javascript
        var buttonObjects = buttons.getElement('buttons[0]'); // First button
        ```
- Get by name
    ```javascript
    var gameObject = buttons.getElement('#' + name);
    ```

### For each button

The same as [for each button of buttons](ui-buttons.md#for-each-button).

### Checkboxes/radio

The same as [checkboxes/radio of buttons](ui-buttons.md#checkboxesradio).