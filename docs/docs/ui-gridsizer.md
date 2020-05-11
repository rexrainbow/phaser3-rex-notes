## Introduction

Layout children game objects in grids.

- Author: Rex
- Game object

## Live demos

- [Scrollable grids](https://codepen.io/rexrainbow/pen/YMyBom)
- [Full viewport](https://codepen.io/rexrainbow/pen/LYVKXJg)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-gridsizer)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add sizer object
    ```javascript
    var sizer = scene.rexUI.add.gridSizer(config);
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
    var sizer = scene.rexUI.add.gridSizer(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add sizer object
    ```javascript    
    var sizer = new GridSizer(scene, config);
    sscene.add.existing(sizer);
    ```

### Add grid sizer object

```javascript
var gridSizer = scene.rexUI.add.gridSizer({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    column: 0,
    row: 0,
    // columnProportions: undefined,
    // rowProportions: undefined,
    // space: {
    //     left: 0, right: 0, top: 0, bottom:0,
    //     column: 0, // [0, 0, 0]
    //     row: 0     // [0, 0, 0]
    // },

    // name: '',
    // draggable: false
});
```

or

```javascript
var gridSizer = scene.rexUI.add.gridSizer(x, y, {
    column: 0,
    row: 0,
    // columnProportions: undefined,
    // rowProportions: undefined,

    // space: {
    //     left: 0, right: 0, top: 0, bottom:0,
    //     column: 0, // [0, 0, 0]
    //     row: 0     // [0, 0, 0]
    // },

    // width: undefined,
    // height: undefined
});
```

or

```javascript
var gridSizer = scene.rexUI.add.gridSizer(x, y, width, height, {
    column: 0,
    row: 0,
    // columnProportions: undefined,
    // rowProportions: undefined,

    // space: {
    //     left: 0, right: 0, top: 0, bottom:0,
    //     column: 0, // [0, 0, 0]
    //     row: 0     // [0, 0, 0]
    // },    
});
```

or

```javascript
var gridSizer = scene.rexUI.add.gridSizer(x, y, width, height, column, row, {
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
- `width` : Minimum width. i.e. Width of this gridSizer will larger then this value.
- `height` : Minimum height. i.e. Hieght of this gridSizer will larger then this value.
- `column` : Amount of column grids.
- `row` : Amount of row grids.
- `columnProportions`, `rowProportions` : Proportion of each column/row.
    - Number : Apply this number proportion to each column/row
    - Number array : Apply proportion of column/row through elements of this number array.
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
    class MyGridSizer extends RexPlugins.UI.GridSizer {
        constructor(scene, x, y, minWidth, minHeight, column, row) {
            super(scene, x, y, minWidth, minHeight, column, row);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var gridSizer = new MyGridSizer(scene, x, y, minWidth, minHeight, column, row);
    ```

### Add background

```javascript
gridSizer.addBackground(child);
```

### Add child

Add a game obejct to grid sizer

```javascript
gridSizer.add(child, columnIndex, rowIndex);
```

or

```javascript
gridSizer.add(child, columnIndex, rowIndex, align, paddingConfig, expand, childKey);
```

- `child` : A game object
- `columnIndex`, `rowIndex` : Index of grid to add.
- `align` :
    - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
    - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
    - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `'top'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at top-center.
    - `'bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at bottom-center.
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
- `expand` : Set `true` to height and width.
- `childKey` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

### Proportion

Set proportion of each column or row via

```javascript
gridSizer.setColumnProportion(columnIndex, proportion);
gridSizer.setRowProportion(rowIndex, proportion);
```

### Layout children

Arrange position of all children.

```javascript
gridSizer.layout();
```

### Get child

```javascript
var child = gridSizer.getChildAt(columnIndex, rowIndex);
```

### Remove child

- Remove a child
    ```javascript
    gridSizer.remove(child);    
    ```
    or
    ```javascript
    gridSizer.removeAt(columnIndex, rowIndex);    
    ```
- Remove and destroy a child
    ```javascript
    gridSizer.remove(child, true);
    ```
    or
    ```javascript
    gridSizer.removeAt(columnIndex, rowIndex, true);    
    ```    
- Remove all children
    ```javascript
    gridSizer.clear();
    ```
- Remove and destroy all children
    ```javascript
    gridSizer.clear(true);
    ```

### Grid size

- Amount of column
    ```javascript
    var columnCount = gridSizer.columnCount;
    ```
- Amount of row
    ```javascript
    var rowCount = gridSizer.rowCount;
    ```

### Other properties

See [base sizer object](ui-basesizer.md).