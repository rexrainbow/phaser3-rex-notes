## Introduction

Layout children game objects.

It is inspired from [wxSizer](https://docs.wxwidgets.org/3.0/overview_sizer.html).

- Author: Rex
- Game object

## Live demos

- [Nested sizer](https://codepen.io/rexrainbow/pen/NOzorp)
    - [Demo 1](https://codepen.io/rexrainbow/pen/XWoNNRW)
    - [Demo 2](https://codepen.io/rexrainbow/pen/NOzorp)
    - [Demo 3](https://codepen.io/rexrainbow/pen/jOwWmMm)
- [Proportion](https://codepen.io/rexrainbow/pen/GRJNKPo)
- [DOM child](https://codepen.io/rexrainbow/pen/xxELGJb)
- Set children interactive :
    - [Parent mode](https://codepen.io/rexrainbow/pen/vYWdBZQ)
    - [Direct mode](https://codepen.io/rexrainbow/pen/eYqpbOd)
- [Drag drop child](https://codepen.io/rexrainbow/pen/YzEaRwd)
- [Bring child to top](https://codepen.io/rexrainbow/pen/gOqNbRr)
- [Fit-ratio](https://codepen.io/rexrainbow/pen/ZEPwrom)
- [Sort](https://codepen.io/rexrainbow/pen/poBmWMY)
- [Add multiple](https://codepen.io/rexrainbow/pen/MWNjbJj)

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
    scene.add.existing(sizer);
    ```

### Add sizer object

```javascript
var sizer = scene.rexUI.add.sizer({
    orientation: 0,
    // rtl: false,
    // startChildIndex: 0,

    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:
    // space: { left: 0, right:0, top:0, bottom:0, item:0 },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, {
    orientation: 0,
    // rtl: false,
    // startChildIndex: 0,

    // width: undefined,
    // height: undefined,
    // anchor: undefined,
    // origin: 0.5
    // originX:
    // originY:
    // space: { left: 0, right:0, top:0, bottom:0, item:0 },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, width, height, {
    orientation: 0,
    // rtl: false,
    // startChildIndex: 0,
    // anchor: undefined,
    // origin: 0.5
    // originX:
    // originY:
    // space: { left: 0, right:0, top:0, bottom:0, item:0 },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

or

```javascript
var sizer = scene.rexUI.add.sizer(x, y, width, height, orientation, {
    // rtl: false,
    // startChildIndex: 0,
    // anchor: undefined,
    // origin: 0.5
    // originX:
    // originY:
    // space: { left: 0, right:0, top:0, bottom:0, item:0 }
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
- `orientation` : Orientation of the sizer.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right. Default value is `0`.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom.
- `rtl` :     
    - `false` : Layout children from left to right. Default behavior.
    - `true` : Layout children from right to left.
- `startChildIndex` : A number, start index of first layout child. Default value is `0`.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space between 2 children game objects.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).

### Custom class

- Define class
    ```javascript
    class MySizer extends RexPlugins.UI.Sizer {
        constructor(scene, x, y, minWidth, minHeight, orientation, config) {
            super(scene, x, y, minWidth, minHeight, orientation, config);
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
        proportion: 0,
        align: 'center',
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        expand: false,
        key: undefined,
        index: undefined,
        minWidth: undefined,
        minHeight: undefined,
        fitRatio: 0,  // true
        offsetX: 0,
        offsetY: 0,
        offsetOriginX: 0,
        offsetOriginY: 0,
    }
);
```

or

```javascript
sizer.add(child, proportion, align, padding, expand, key, index);
// sizer.add(child, proportion, align, padding, expand, key, index);
```

- `child` : A game object.
- `proportion` :
    - `0`, or `'min'` : Place next game object closely. Default value.
    - `> 0` : Stretch game object via proportion value.
    - `null` : Don't arrange this child.
- `align` :
    - For horizontal orientation sizer : 
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at vertical-center. Default value.
        - `'top'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at top-center.
        - `'bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at bottom-center.        
        - Use [`addSpace()`](ui-sizer.md#add-space) to align child at horizontal-center.
    - For vertical orientation sizer : 
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at horizontal-center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.   
        - Use [`addSpace()`](ui-sizer.md#add-space) to align child at vertical-center.
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
- `minWidth` : Minimum width of normal (non-sizer) game object, used when 
    `orientation` is `x`, and `proportion` is not `0`, or 
    `orientation` is `y`, and `expand` is `true`
    - Default value is current display width.
- `minHeight` : Minimum height of normal (non-sizer) game object, used when 
    `orientation` is `y`, and `proportion` is not `0`, or
    `orientation` is `x`, and `expand` is `true`
    - Default value is current display height.
- `fitRatio` : Resize child to fit sizer height/width before layout children, when `proportion` is set to `0`.
    - `0`, or `false` : Ignore this feature. Default behavior.
    - `true` : Fit ratio (width/height) from game object's display size.
    - `> 0` : Fit ratio (width/height). `1` is square.
- `offsetX`, `offsetOriginX` : Apply offset `offsetX + offsetOriginY * width` to x coordinate after alignment.
- `offsetY`, `offsetOriginY` : Apply offset `offsetY + offsetOriginY * height` to y coordinate after alignment.


### Add multiple

```javascript
sizer.add(gameObjects, config);
```

- `gameObjects` : Array of child game objects
- `config` : See [config of add-child](#add-child)

### Insert child

```javascript
sizer.insert(index, child, 
    {
        proportion: 0,
        align: 'center',
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        expand: false,
        key: undefined,
        minWidth: undefined,
        minHeight: undefined,
        fitRatio: 0,
    }
);
```

or 

```javascript
sizer.insert(index, child, proportion, align, padding, expand, key);
```

#### Insert at position

```javascript
sizer.insertAtPosition(x, y, 
    child, 
    {
        proportion: 0,
        align: 'center',
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        expand: false,
        key: undefined,
        minWidth: undefined,
        minHeight: undefined,
        fitRatio: 0,
    }
);
```

or 

```javascript
sizer.insertAtPosition(x, y, index, child, proportion, align, padding, expand, key);
```

### Add space

-  Add a stretchable space.
    ```javascript
    sizer.addSpace();
    // sizer.addSpace(proportion);
    ```
- Insert a stretchable space.
    ```javascript
    sizer.insertSpace(index);
    // sizer.insertSpace(index, proportion);
    ```

Use cases :

- Align child at center
    ```javascript
    sizer
        .addSpace()
        .add(child)
        .addSpace()
    ```
- Align 2 children at left and right side
    ```javascript
    sizer
        .add(childLeft)
        .addSpace()
        .add(childRight)
    ```

### Change children's align mode

```javascript
sizer
    .setChildrenAlignMode(mode)
    .layout();
```

- `mode` : Alignment of icon, text, action game objects.
    - `undefined`, or `'left'`, or `'top'` : Align game objects at left, or top.
        - Remove first and last space children.
    - `'center'` : Align game objects at center.
        - Add two spaces as first and last children.
    - `'right'`, or `'bottom'` : Align game objects at right, or bottom.
        - Add space as first child.

### Layout children

Arrange position of all children.

```javascript
sizer.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Hide

- Set invisible, won't layout it
    ```javascript
    sizer.hide();
    ```
    or
    ```javascript
    sizer.hide(gameObject);
    ```
- Set visible, will layout it
    ```javascript
    sizer.show();
    ```
    or
    ```javascript
    sizer.show(gameObject);
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

### Sort children

- Sort by [data](gameobject.md#data)
    ```javascript
    sizer.sortChildrenByData(key, descending).layout();
    ```
    - `key` : Data key
    - `descending` : 
        - `true` : Descending order
        - `false` : Ascending order, default behavior.
- Sort by property of child
    ```javascript
    sizer.sortChildrenByProperty(key, descending).layout();
    ```
    - `key` : Property key
    - `descending` : 
        - `true` : Descending order
        - `false` : Ascending order, default behavior.
- Sort by callback
    ```javascript
    sizer.sortChildren(function(childA, childB){
        // var valueA = childA.getData(key);
        // var valueB = childB.getData(key);
        // return valueB - valueA
    }).layout();
    ```
    - `childA`, `childB` : 2 children of this size

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
    var gameObject = sizer.getByName(name);
    // var gameObject = sizer.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Get child index

```javascript
var index = sizer.getChildIndex(child);
```

- `index` : A number, or `null`.


### RTL

- Set rtl in [config of constructor](ui-sizer.md#add-sizer-object)
- Set rtl : `sizer.setRTL(enable)`
- Get rtl : `var rtl = sizer.rtl`

### Alignment of child

- Set alignment of child in [config of adding child](ui-sizer.md#add-child)
- Set alignment of child : `sizer.setChildAlign(child, align)`
    - `align` :
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
        - `'top'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at top-center.
        - `'bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at bottom-center.
- Get alignment of child : `var align = sizer.getChildAlign(child)`

### Proportion of child

- Set proportion of child in [config of adding child](ui-sizer.md#add-child)
- Set proportion of child : `sizer.setChildProportion(child, proportion)`
- Get proportion of child : `var align = sizer.getChildProportion(child)`

### Expand of child

- Set expand of child in [config of adding child](ui-sizer.md#add-child)
- Set expand of child : `sizer.setChildExpand(child, expand)`
- Get expand of child : `var expand = sizer.getChildExpand(child)`

### Other properties

See [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).