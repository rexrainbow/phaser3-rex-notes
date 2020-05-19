## Introduction

Layout children game objects into lines.

- Author: Rex
- Game object

## Live demos

- [Fix-width sizer](https://codepen.io/rexrainbow/pen/WPJPdK)
- [Scrollable, fix-width sizer](https://codepen.io/rexrainbow/pen/eYOdKBR)
- [Drag-drop item](https://codepen.io/rexrainbow/pen/rNOKJrK)

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
var sizer = scene.rexUI.add.fixWidthSizer(x, y, {
    // width: 2,
    // height: 2
    orientation: 0,
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
    orientation: 0,
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
- `width`, `height` : Minimum width, minimum height.
- `orientation` : Main orientation of the sizer.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space betwen each child of a line.
    - `space.line` : Space between each line.
- `rtl` : Order of children in each line.
    - `false` : Place children from left-to-right/top-to-bottom, default value.
    - `true` : Place children from right-to-left/bottom-to-top.
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

### Add child

Add a game obejct to sizer

```javascript
sizer.add(child);
```

or

```javascript
sizer.add(child, padding, key, index);
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

See also - [dirty](ui-basesizer.md#dirty)

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

### Set children interactive

```javascript
sizer.setChildrenInteractive({
    // click: {mode: 'release', clickInterval: 100},

    // over: undefined,
    
    // press: {time: 251, threshold: 9},

    // tap: {time: 250, tapInterval: 200, threshold: 9, tapOffset: 10, 
    //       taps: undefined, minTaps: undefined, maxTaps: undefined,},

    // swipe: {threshold: 10, velocityThreshold: 1000, dir: '8dir'},

    // inputEventPrefix: 'child.',
    // eventEmitter: undefined
})
```

- `click` : [Configuration](button.md#create-instance) of Button behavior.
    - `false` : Don't install Button behavior.
- `over` :
    - `false` : Don't fire over/out events
- `press` : [Configuration](gesture-press.md#create-instance) of Press behavior.
    - `false` : Don't install Press behavior.
- `tap` : [Configuration](gesture-tap.md#create-instance) of Tap behavior.
    - `false` : Don't install Tap behavior.
- `swipe` : [Configuration](gesture-swipe.md#create-instance) of Swipe behavior.
    - `false` : Don't install Swipe behavior.
- `inputEventPrefix` : Prefix string of each event, default is `'child.'`.
- `eventEmitter` : Fire event through specific game object.

!!! note
    Input behaviors are installed to this Sizer game object, not each child. And it assumes that all children are not overlapped.

#### Events

- Click
    ```javascript
    sizer.on('child.click', function(child, pointer) { 
        // ...
    }, scope);
    ```
    - `child` : Triggered child game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.    
- Pointer-over
    ```javascript
    sizer.on('child.over', function(child, pointer) { 
        // ...
    }, scope);
    ```
- Pointer-out
    ```javascript
    sizer.on('child.out', function(child, pointer) { 
        // ...
    }, scope);
    ```
- Press
    ```javascript
    sizer.on('child.pressstart', function(child, pointer) { 
        // ...
    }, scope);
    ```
    ```javascript
    sizer.on('child.pressend', function(child, pointer) { 
        // ...
    }, scope);
    ```
- Tap
    ```javascript
    sizer.on(tapEventName, function(child, pointer) { 
        // ...
    }, scope);
    ```
    - `tapEventName` :  `'child.1tap'`, `'child.2tap'`, `'child.3tap'`, etc ...
- Swipe
    ```javascript
    sizer.on(swipeEventName, function(child, pointer) { 
        // ...
    }, scope);
    ```
    - `swipeEventName` :  `'child.swipeleft'`, `'child.swiperight'`, `'child.swipeup'`, `'child.swipedown'`.

### Other properties

See [base-sizer object](ui-basesizer.md).