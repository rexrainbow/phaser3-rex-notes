## Introduction

A container with buttons and sub-menu.

- Author: Rex
- Game object

## Live demos

- [Pop-up menu](https://codepen.io/rexrainbow/pen/PxOEBr)
- [Drop down list](https://codepen.io/rexrainbow/pen/JjEORZb)
- [Expand, collapse](https://codepen.io/rexrainbow/pen/wvebLGY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-menu)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add menu object
    ```javascript
    var menu = scene.rexUI.add.menu(config);
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
- Add menu object
    ```javascript
    var menu = scene.rexUI.add.menu(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Menu } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add menu object
    ```javascript
    var menu = new Menu(scene, config);
    scene.add.existing(menu);
    ```

### Add menu object

```javascript
var menu = scene.rexUI.add.menu({
    // x: 0,
    // y: 0,
    // anchor: undefined,

    // orientation: 1,
    // subMenuSide: undefined,
    items: [],

    createBackgroundCallback: function(items) {
        var scene = items.scene;
        // background = ...
        return background;
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
    //     orientation: undefined,
    //     ease: 'Cubic'
    // },

    easeOut: 0,
    // easeOut: {
    //     duration: 100,
    //     orientation: undefined,
    //     ease: 'Linear'
    // },
    // expandEvent: 'button.click',

    name: '',
    // draggable: false,
    // sizerEvents: false,
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly. 
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
        - `easeIn.orientation` : Orientation of ease.
            - `undefined` : The same orientation with menu's orientation.
            -  `'h'`, `'x'`, or `0` : Pop-up menu horizontally.
            -  `'v'`, `'y'`, or `1` : Pop-up menu vertically.
- `easeOut` : Scale down size when extend menu.
    - A number : Duration of ease, in milliseconds.
    - An object :
        - `easeOut.duration` : Duration of ease, in milliseconds.
        - `easeOut.ease` : Ease function, default is `'Linear'`
        - `easeOut.orientation` : Orientation of ease.
            - `undefined` : The same orientation with menu's orientation.
            -  `'h'`, `'x'`, or `0` : Scale-down menu horizontally.
            -  `'v'`, `'y'`, or `1` : Scale-down menu vertically.
- `expandEvent` : Event name of expanding sub-menu.
    - `'button.click'` : Default value
    - `'button.over'`
- `subMenuSide` : Side of sub-menu
    - `undefined` : Determine side of sub-menu automatically.
    - `'right'`, or `0` : Put sub-menu at right side. Used with `orientation` is set to `y`.
    - `'left'`, or `2` : Put sub-menu at left side. Used with `orientation` is set to `y`.
    - `'up'`, or `3` : Put sub-menu at up side. Used with `orientation` is set to `x`.
    - `'down'`, or `1` : Put sub-menu at down side. Used with `orientation` is set to `x`.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyMenu extends RexPlugins.UI.Menu {
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
- Expand(Pop-up start) sub-menu
    ```javascript
    menu.on('expand', function(subMenu, parentButton) {
        // ....
    }, scope)
    ```
    - `subMenu` : Sub-menu.
    - `parentButton` : Game object of triggered button.
    - `rootMenu` : Root-menu
- Pop-up root-menu, or sub-menu completely
    ```javascript
    menu.on('popup.complete', function(menu) {
        // ....
    }, scope)
    ```
    - `menu` : Root-menu, or sub-menu
- Collapse(Scale-down starting) root-menu, or sub-menu
    ```javascript
    menu.on('collapse', function(subMenu, parentButton, rootMenu) {
        // ....
    }, scope)
    ```
    - `subMenu` : Sub-menu.
    - `parentButton` : Game object of triggered button.
    - `rootMenu` : Root-menu
- Scale-down root-menu completely
    ```javascript
    menu.on('scaledown.complete', function(rootMenu) {
        // ....
    }, scope)
    ```
    - `rootMenu` : Root-menu