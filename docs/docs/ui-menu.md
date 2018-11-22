## Introduction

A container with buttons and sub-menu.

- Author: Rex
- A kind of game object

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

### Add grid table object

```javascript
var menu = scene.rexUI.add.menu({
    // Position
    x: 0,
    y: 0,

    // orientation: 1,
    items: [],
    createButtonCallback: function(item, index) {
        var scene = item.scene;
        // container = ...
        return container;
    },
    createButtonCallbackScope: undefined,

    easeIn: {
        duration: 500,
        orientation: 'y',
        // ease: 'Cubic'
    }
    easeOut: {
        duration: 100,
        orientation: 'y',
        // ease: 'Linear'
    },
    // expandEvent: 'button.click'
    name: '',
});
```

- `x`, `y` : Position of this menu object, it is valid when this menu is the top object.
- `orientation` : Main orientation of the menu, default is `1` (top to bottom)
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange buttons from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange buttons from top to bottom.
- `items` : Array of item data for each button. Each item has
    - `children` : An array of items for sub-menu, optional.
    - Other custom properties
- `createCellContainerCallback` : Callback to return container object of each item.
    - Properties of `item` parameter
        - `item.scene` : Scene of this menu object.
        - Other custom properties
- `easeIn` : Scale up size when extend menu.
    - `easeIn.duration` : Duration of ease, in milliseconds.
    - `easeIn.orientation` :
        - `'y'` : Scale up height.
        - `'x'` : Scale up width.
        - Others: Scale up width and height.
    - `easeIn.ease` : Ease function, default is `'Cubic'`
- `easeOut` : Scale down size when extend menu.
    - `easeOut.duration` : Duration of ease, in milliseconds.
    - `easeOut.orientation` :
        - `'y'` : Scale up height.
        - `'x'` : Scale up width.
        - Others: Scale up width and height.
    - `easeOut.ease` : Ease function, default is `'Linear'`
- `expandEvent` : Event name of expanding sub-menu.
    - `'button.click'` : Default value
    - `'button.over'`
- `name` : Set name of this menu.

### Layout children

Arrange position of all children. 
*This will be called when menu object created, user does not need call it again generally.*

```javascript
gridSizer.layout();
```

### Other properties

See [sizer object](ui-sizer.md)

### Events

- Click button
    ```javascript
    menu.on('button.click', function(button, index) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button.
    - `index` : Index of triggered button.
- Pointer-over button
    ```javascript
    menu.on('button.over', function(button, index) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button.
    - `index` : Index of triggered button.
- Pointer-out button
    ```javascript
    menu.on('button.out', function(button, index) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button.
    - `index` : Index of triggered button.
