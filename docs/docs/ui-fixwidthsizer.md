## Introduction

Layout children game objects into lines.

- Author: Rex
- Game object

## Live demos

- [Fix-width sizer](https://codepen.io/rexrainbow/pen/WPJPdK)
- [Scrollable, fix-width sizer](https://codepen.io/rexrainbow/pen/eYOdKBR)
- [Drag-drop item](https://codepen.io/rexrainbow/pen/rNOKJrK)
- [Set children interactive](https://codepen.io/rexrainbow/pen/gOXvYgE)

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
    scene.add.existing(sizer);
    ```

### Add sizer object

```javascript
var sizer = scene.rexUI.add.fixWidthSizer({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // space: {
    //     left: 0, right: 0, top: 0, bottom: 0,
    //     item: 0, line: 0
    // },

    // rtl: false,
    // align: 0,

    // name: '',
    // draggable: false,
    // sizerEvents: false,
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, {
    // width: 2,
    // height: 2
    // space: {
    //     left: 0, right: 0, top: 0, bottom: 0,
    //     item: 0, line: 0
    // },

    // rtl: false,
    // align: 0,

    // name: '',
    // draggable: false
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, width, height, {
    // space: {
    //     left: 0, right: 0, top: 0, bottom: 0,
    //     item: 0, line: 0
    // },

    // rtl: false,
    // align: 0,

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
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly. 
- `width`, `height` : Minimum width, minimum height.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space betwen each child of a line.
    - `space.line` : Space between each line.
- `rtl` : Order of children in each line.
    - `false` : Place children from left-to-right/top-to-bottom, default value.
    - `true` : Place children from right-to-left/bottom-to-top.
- `align` : Align children of a line.
    - `0`, `'left'` : Align children of a line to left/top side.
    - `1`, `'right'` : Align children of a line to right/bottom side.
    - `2`, `'center'` : Align children of a line to ceter.
    - `3`, `'justify'`, `'justify-left'` : If remainder space is less or equal than 25%, then justify children. Else align children to left/top side.
    - `4`, `'justify-right'` : If remainder space is less or equal than 25%, then justify children. Else align children to right/bottom side.
    - `5`, `'justify-cneter'` : If remainder space is less or equal than 25%, then justify children. Else align children to center.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MySizer extends RexPlugins.UI.FixWidthSizer {
        constructor(scene, x, y, minWidth, minHeight, orientation, space, config) {
            super(scene, x, y, minWidth, minHeight, orientation, space, config);
            // ...
            scene.add.existing(this);
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

or

```javascript
sizer.addBackground(child, {left: 0, right: 0, top: 0, bottom: 0}, key);
```

- `left`, `right`, `top`, `bottom` : Extra padded space. Default is 0.
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

### Add child

Add a game obejct to sizer

```javascript
sizer.add(child);
```

or

```javascript
sizer.add(child,
    {
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        key: undefined,
        index: undefined
    }
);
```

or

```javascript
sizer.add(child, padding, key, index);
```

- `child` : A game object
- `padding` : Add space between bounds. Default is 0.
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
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.
    - `items` : Reserved key, for all children item.
- `index` : Insert child to.
    - `undefined` : Insert child at last.

### Insert child

```javascript
sizer.insert(index, child, 
    {
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        key: undefined,
    }
);
```

or 

```javascript
sizer.insert(index, child, padding, key);
```

#### Insert at position

```javascript
sizer.insertAtPosition(x, y, 
    child, 
    {
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        key: undefined,
    }
);
```

or 

```javascript
sizer.insertAtPosition(x, y, index, child, padding, key);
```

### Add new line

```javascript
sizer.addNewLine();
```

### Layout children

Arrange position of all children.

```javascript
sizer.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Remove child

- Remove a child
    ```javascript
    sizer.remove(child);
    ```
- Remove and destroy a child
    ```javascript
    sizer.remove(child, true);
    ```    
- Remove all children
    ```javascript
    sizer.removeAll();
    ```
- Remove and destroy all children
    ```javascript
    sizer.removeAll(true);
    ```   
- Remove all children and backgrounds
    ```javascript
    sizer.clear();
    ```
- Remove and destroy all children and backgrounds
    ```javascript
    sizer.clear(true);
    ```
- Remove from parent sizer
    ```javascript
    sizer.removeFromParentSizer();
    ```

### Get element

- Get element
    - All children items
        ```javascript
        var items = sizer.getElement('items');
        ```
- Get by name
    ```javascript
    var gameObject = sizer.getElement('#' + name);
    // var gameObject = sizer.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = sizer.getByName('#' + name);
    // var gameObject = sizer.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [base-sizer object](ui-basesizer.md).