## Introduction

A container with buttons and sub-menu.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/menu/Menu.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-menu)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

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

### Add menu object

```javascript
var menu = scene.rexUI.add.menu({
    // x: 0,
    // y: 0,
    // anchor: undefined,

    // orientation: 1,
    items: [],

    createBackgroundCallback: function(items) {
        var scene = items.scene;
        // container = ...
        return container;
    },

    createBackgroundCallbackScope: undefined,
    createButtonCallback: function(item, index, items) {
        var scene = item.scene;
        // var isFirstButton = (index === 0);
        // var isLastButton = (index === (items.length - 1));
        // container = ...
        return container;
    },
    createButtonCallbackScope: undefined,

    easeIn: 0,
    // easeIn: {
    //     duration: 500,
    //     ease: 'Cubic'
    // },

    easeOut: 0,
    // easeOut: {
    //     duration: 100,
    //     ease: 'Linear'
    // },
    // expandEvent: 'button.click'

    name: ''
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `orientation` : Main orientation of the menu, default is `1` (top to bottom)
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange buttons from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange buttons from top to bottom.
- `items` : Array of item data for each button. Each item has
    - `children` : An array of items for sub-menu, optional.
    - Other custom properties
- `createBackgroundCallback` : Callback to return container object of menu's bckground.
    - Properties of `items` parameter
        - `items.scene` : Scene of this menu object.
- `createButtonCallback` : Callback to return container object of each item.
    - Properties of `item` parameter
        - `item.scene` : Scene of this menu object.
        - Other custom properties
- `easeIn` : Scale up size when extend menu.
    - A number : Duration of ease, in milliseconds.
    - An object :
        - `easeIn.duration` : Duration of ease, in milliseconds.
        - `easeIn.ease` : Ease function, default is `'Cubic'`
- `easeOut` : Scale down size when extend menu.
    - A number : Duration of ease, in milliseconds.
    - An object :
        - `easeOut.duration` : Duration of ease, in milliseconds.
        - `easeOut.ease` : Ease function, default is `'Linear'`
- `expandEvent` : Event name of expanding sub-menu.
    - `'button.click'` : Default value
    - `'button.over'`
- `name` : Set name of this menu.

### Custom class

- Define class
    ```javascript
    class MyMenu extends RexPlugins.UI.Menu {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var menu = new MyMenu(scene, config);
    ```

### Collapse

- Collapse menu
    ```javascript
    menu.collapse();
    ```
- Collapse sub-menu
    ```javascript
    menu.collapseSubMenu();
    ```

### Layout children

Arrange position of all children. 
*This will be called when menu object created, user does not need call it again generally.*

```javascript
menu.layout();
```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Events

- Click button
    ```javascript
    menu.on('button.click', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button.
    - `index` : Index of triggered button.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-over button
    ```javascript
    menu.on('button.over', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button.
    - `index` : Index of triggered button.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-out button
    ```javascript
    menu.on('button.out', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button.
    - `index` : Index of triggered button.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
