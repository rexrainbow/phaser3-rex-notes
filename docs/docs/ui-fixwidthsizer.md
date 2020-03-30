## Introduction

Layout children game objects into lines.

- Author: Rex
- Game object

## Live demos

- [Fix-width sizer](https://codepen.io/rexrainbow/pen/WPJPdK)
- [Scrollable, fix-width sizer](https://codepen.io/rexrainbow/pen/eYOdKBR)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-fixwidthsizer)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add sizer object
    ```javascript
    var sizer = scene.rexUI.add.fixWidthSizer(config);
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
- Add sizer object
    ```javascript
    var sizer = scene.rexUI.add.fixWidthSizer(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { FixWidthSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add sizer object
    ```javascript    
    var sizer = new FixWidthSizer(scene, config);
    sscene.add.existing(sizer);
    ```

### Add sizer object

```javascript
var sizer = scene.rexUI.add.fixWidthSizer({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,

    // space: {
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     bottom: 0,
    //     item: 0,
    //     line: 0
    // },

    // rtl: false,
    // align: 0,

    // name: '',
    // draggable: false
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, {
    width: 2,
    height: 2
    orientation: 0,
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        item: 0,
        line: 0
    }
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, width, height, {
    orientation: 0,
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        item: 0,
        line: 0
    }
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, width, height, orientation, space, config);
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `width`, `height` : Minimum width, minimum height.
- `orientation` : Main orientation of the sizer.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space betwen each child of a line.
    - `space.line` : Space between each line.
- `rtl` : Place children from right-to-left.
- `align` : Align children of a line.
    - `0`, `'left'`, `'top'` : Align children of a line to left/top side.
    - `1`, `'right'`, `'bottom'` : Align children of a line to right/bottom side.
    - `2`, `'center'` : Align children of a line to ceter.
    - `3`, `'justify'`, `'justify-left'`, `'justify-top'` : If remainder space is less or equal than 25%, then justify children. Else align children to left/top side.
    - `4`, `'justify-right'`, `'justify-bottom'` : If remainder space is less or equal than 25%, then justify children. Else align children to right/bottom side.
    - `5`, `'justify-cneter'` : If remainder space is less or equal than 25%, then justify children. Else align children to center.

### Custom class

- Define class
    ```javascript
    class MySizer extends RexPlugins.UI.FixWidthSizer {
        constructor(scene, x, y, minWidth, minHeight, orientation, space, config) {
            super(scene, x, y, minWidth, minHeight, orientation, space, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var sizer = new MySizer(scene, x, y, minWidth, minHeight, orientation, space, config);
    ```

### Add background

```javascript
sizer.addBackground(child);
```

### Add child

Add a game obejct to sizer

```javascript
sizer.add(child);
```

or

```javascript
sizer.add(child, paddingConfig, childKey);
```

- `child` : A game object
- `paddingConfig` : Add space between bounds. Default is 0.
    - A number for left/right/top/bottom bounds
    - Or a plain object
        ```javascript
        {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        ```
- `childKey` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.
    - `items` : Reserved key, for all children item.

### Add new line

```javascript
sizer.addNewLine();
```

or

```javascript
sizer.add('\n');
```

### Layout children

Arrange position of all children.

```javascript
sizer.layout();
```

### Remove child

- Remove a child
    ```javascript
    sizer.remove(child);
    ```
- Remove all children
    ```javascript
    sizer.clear(destroyChild);
    ```

### Get element

- Get element
    - All children items
        ```javascript
        var items = label.getElement('items');
        ```
- Get by name
    ```javascript
    var gameObject = label.getElement('#' + name);
    ```

### Other properties

See [base-sizer object](ui-basesizer.md).