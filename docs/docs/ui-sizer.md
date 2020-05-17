## Introduction

Layout children game objects.

It is inspired from [wxSizer](https://docs.wxwidgets.org/3.0/overview_sizer.html).

- Author: Rex
- Game object

## Live demos

- [Nested sizer](https://codepen.io/rexrainbow/pen/NOzorp)
- [Proportion](https://codepen.io/rexrainbow/pen/GRJNKPo)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-sizer)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add sizer object
    ```javascript
    var sizer = scene.rexUI.add.sizer(config);
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
    var sizer = scene.rexUI.add.sizer(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add sizer object
    ```javascript
    var sizer = new Sizer(scene, config);
    sscene.add.existing(sizer);
    ```

### Add sizer object

```javascript
var sizer = scene.rexUI.add.sizer({
    orientation: 0,

    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // space: { left: 0, right:0, top:0, bottom:0, item:0 }
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, {
    orientation: 0,

    // width: undefined,
    // height: undefined,
    // anchor: undefined,
    // space: { left: 0, right:0, top:0, bottom:0, item:0 }
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, width, height, {
    orientation: 0,
    // anchor: undefined,
    // space: { left: 0, right:0, top:0, bottom:0, item:0 }
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, width, height, orientation, {
    // anchor: undefined,
    // space: { left: 0, right:0, top:0, bottom:0, item:0 }
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
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space between 2 children game objects.

### Custom class

- Define class
    ```javascript
    class MySizer extends RexPlugins.UI.Sizer {
        constructor(scene, x, y, minWidth, minHeight, orientation) {
            super(scene, x, y, minWidth, minHeight, orientation);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var sizer = new MySizer(scene, x, y, minWidth, minHeight, orientation);
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
sizer.add(child, proportion, align, padding, expand, key, index);
```

or

```javascript
sizer.add(child, 
    {
        proportion: 0, 
        align: 'center', 
        padding: {left: 0, right: 0, top: 0, bottom: 0}, 
        expand: false, 
        key: undefined, 
        index: undefined
    }
);
```

- `child` : A game object.
- `proportion` :
    - `0`, or `'min'` : Place next game object closely. Default value.
    - `> 0` : Stretch game object via proportion value.
    - `null` : Don't arrange this child.
- `align` :
    - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
    - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
    - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `'top'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at top-center.
    - `'bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at bottom-center.
- `padding` : Extra padded space. Default is 0.
    - A number for left/right/top/bottom bounds,
    - Or a plain object.
        ```javascript
        {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        ```
- `expand` : Set `true` to
    - Expand height when `orientation` is `0` (`left-to-right`), or
    - Expand width when `orientation` is `1` (`top-to-bottom`)
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.
- `index` : Insert child to.
    - `undefined` : Insert child at last.

or

```javascript
sizer.add(child, config);
```

- `config` : A plain object.
    ```javascript
    {
        proportion: 0,
        align: 'center',
        padding: 0,
        expand: false,
        key: undefined,
        index: undefined
    }
    ```

### Add space

Add a stretchable space.

```javascript
sizer.addSpace();
// sizer.addSpace(proportion);
```

### Layout children

Arrange position of all children.

```javascript
sizer.layout();
```

#### Dirty

Don't layout this sizer if `sizer.dirty` is `false`. i.e. Size of this sizer won't be changed, but won't layout children neither.

Default value is `true`.

- Get
    ```javascript
    var dirty = sizer.dirty;
    ```
- Set
    ```javascript
    sizer.setDirty();
    // izer.setDirty(true);
    ```
    or
    ```javascript
    sizer.dirty = true;
    ```
- Clear
    ```javascript
    sizer.setDirty(false);
    ```
    or
    ```javascript
    sizer.dirty = false;
    ```

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
    sizer.clear();
    ```
- Remove and destroy all children
    ```javascript
    sizer.clear(true);
    ```

### Set children interactive

```javascript
sizer.setChildrenInteractive({
    // click: {mode: 'release', clickInterval: 100},

    // over: undefined,
    
    // press: {time: 251, threshold: 9},

    // tap: {time: 250, tapInterval: 200, threshold: 9, tapOffset: 10, 
    //       taps: undefined, minTaps: undefined, maxTaps: undefined,},

    // swipe: {threshold: 10, velocityThreshold: 1000, dir: '8dir'},

    // groupName: undefined,

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
    Input behaviors are installed to this Sizer game object, not each child.  
    Use [Button](ui-buttons.md) if user needs to enable/disable input behaviors of each child individually.

#### Events

- Click
    ```javascript
    sizer.on('child.click', function(child, index, pointer) { 
        // ...
    }, scope);
    ```
    or
    ```javascript
    sizer.on('child.click', function(child, groupName, index, pointer) { 
        // ...
    }, scope);
    ```
    - `groupName` : Optional group name.
    - `child` : Triggered child game object.
    - `index` : Index of triggered child game object in sizer.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.    
- Pointer-over
    ```javascript
    sizer.on('child.over', function(child, index, pointer) { 
        // ...
    }, scope);
    ```
    or
    ```javascript
    sizer.on('child.over', function(child, groupName, index, pointer) { 
        // ...
    }, scope);
    ```
- Pointer-out
    ```javascript
    sizer.on('child.out', function(child, index, pointer) { 
        // ...
    }, scope);
    ```
    or
    ```javascript
    sizer.on('child.out', function(child, groupName, index, pointer) { 
        // ...
    }, scope);
    ```  
- Press
    ```javascript
    sizer.on('child.pressstart', function(child, index, pointer) { 
        // ...
    }, scope);
    ```
    ```javascript
    sizer.on('child.pressend', function(child, index, pointer) { 
        // ...
    }, scope);
    ```
    or
    ```javascript
    sizer.on('child.pressstart', function(child, groupName, index, pointer) { 
        // ...
    }, scope);
    ```
    ```javascript
    sizer.on('child.pressend', function(child, groupName, index, pointer) { 
        // ...
    }, scope);
    ```
- Tap
    ```javascript
    sizer.on(tapEventName, function(child, index, pointer) { 
        // ...
    }, scope);
    ```
    or
    ```javascript
    sizer.on(tapEventName, function(child, groupName, index, pointer) { 
        // ...
    }, scope);
    ``` 
    - `tapEventName` :  `'child.1tap'`, `'child.2tap'`, `'child.3tap'`, etc ...
- Swipe
    ```javascript
    sizer.on(swipeEventName, function(child, index, pointer) { 
        // ...
    }, scope);
    ```
    or
    ```javascript
    sizer.on(swipeEventName, function(child, groupName, index, pointer) { 
        // ...
    }, scope);
    ``` 
    - `swipeEventName` :  `'child.swipeleft'`, `'child.swiperight'`, `'child.swipeup'`, `'child.swipedown'`.

### Other properties

See [base sizer object](ui-basesizer.md).