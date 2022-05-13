## Introduction

Layout children game objects in grids.

- Author: Rex
- Game object

## Live demos

- [Create cell-containers](https://codepen.io/rexrainbow/pen/vYZQBPY)
- [Scrollable grids](https://codepen.io/rexrainbow/pen/YMyBom)
- [Full viewport](https://codepen.io/rexrainbow/pen/LYVKXJg)
- [Set children interactive](https://codepen.io/rexrainbow/pen/GROQKme)

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
    scene.add.existing(sizer);
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

    // createCellContainerCallback: function(scene, x, y, config) {
    //     config.expand = true;
    //     return cellContainer;
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

    // createCellContainerCallback: function(scene, x, y, config) {
    //     config.expand = true;
    //     return cellContainer;
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

    // createCellContainerCallback: function(scene, x, y, config) {
    //     config.expand = true;
    //     return cellContainer;
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

    // createCellContainerCallback: function(scene, x, y, config, gridSizer) {
    //     config.expand = true;
    //     return cellContainer;
    // },

    // name: '',
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
- `width` : Minimum width. i.e. Width of this gridSizer will larger then this value.
- `height` : Minimum height. i.e. Hieght of this gridSizer will larger then this value.
- `column` : Amount of column grids.
- `row` : Amount of row grids.
- `columnProportions`, `rowProportions` : Proportion of each column/row.
    - Number : Apply this number proportion to each column/row
    - Number array : Apply proportion of column/row through elements of this number array.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.column` : Space between 2 columns
        - A number
        - A number array
    - `space.row` : Space between 2 rows
        - A number
        - A number array
- `createCellContainerCallback` : Callback to create container(sizer) of each cell.
    ```javascript
    function(scene, x, y, config) {
        return cellContainer;
    }
    ```
    - `x`, `y` : Column, row index of this cell.
    - `config` : Config of [adding child](ui-gridsizer.md#add-child)
        ```javascript
        config.align = 'center';
        config.padding = {left: 0, right: 0, top: 0, bottom: 0};
        config.expand = false;
        config.key = undefined;
        ```
    - `cellContainer` : Return a game object for this cell.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

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

or

```javascript
gridSizer.addBackground(child, {left: 0, right: 0, top: 0, bottom: 0}, key);
```

- `left`, `right`, `top`, `bottom` : Extra padded space. Default is 0.
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

### Add child

Add a game obejct to grid sizer

```javascript
gridSizer.add(child, column, row);
```

or

```javascript
gridSizer.add(child,
    {
        column: 0,
        row: 0,
        align: 'center',
        padding: {left: 0, right: 0, top: 0, bottom: 0},
        expand: false,
        key: undefined
    }
);
```

or

```javascript
gridSizer.add(child, column, row, align, padding, expand, key);
```

- `child` : A game object
- `column`, `row` : Index of grid to add.
    - `column` and `row` are numbers : Insert game object to cell (`column`, `row`). Do nothing if that cell has item already.
    - `column` and `row` are `undefined` : Search each column, each row to find an empty cell for inserting. Do nothing if it can't find any empty cell.
    - `column` is `undefined`, and `row` is `true` : Search each row, each column to find an empty cell for inserting. Do nothing if it can't find any empty cell.
    - `column` is a number, and `row` is `undefined` : Search each row of column `column` to find an empty cell for inserting. Do nothing if it can't find any empty cell.
    - `column` is `undefined` and `row` is a number : Search each column of row `row` to find an empty cell for inserting. Do nothing if it can't find any empty cell.
- `align` :
    - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
    - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
    - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `'top'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at top-center.
    - `'bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game object at bottom-center.
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
- `expand` : Set `true` to height and width.
- `key` : Add this child into childMap, which could be read back by `sizer.getElement(key)`.
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

See also - [dirty](ui-basesizer.md#dirty)

### Grid index <-> child

- Grid index -> child
    ```javascript
    var child = gridSizer.getChildAt(columnIndex, rowIndex);
    ```
- Child -> grid index
    ```javascript
    var gridIndex = gridSizer.childToGridIndex(child);
    // var gridIndex = gridSizer.childToGridIndex(child, out);
    ```
    - `gridIndex` : `{x, y}`, or `null` if child is not belong this sizer.

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
    gridSizer.removeAll();
    ```
- Remove and destroy all children
    ```javascript
    gridSizer.removeAll(true);
    ```   
- Remove all children and backgrounds
    ```javascript
    gridSizer.clear();
    ```
- Remove and destroy all children and backgrounds
    ```javascript
    gridSizer.clear(true);
    ```
- Remove from parent sizer
    ```javascript
    sizer.removeFromParentSizer();
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
- Amount of grid = columnCount * rowCount
    ```javascript
    var gridCount = gridSizer.gridCount;
    ```

### Get element

- Get element
    - All children items
        ```javascript
        var items = gridSizer.getElement('items');
        ```
- Get by name
    ```javascript
    var gameObject = gridSizer.getElement('#' + name);
    // var gameObject = gridSizer.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = gridSizer.getByName('#' + name);
    // var gameObject = gridSizer.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Reset grid

```javascript
sizer.resetGrid(column, row, columnProportions, rowProportions, space);
```

- `column` : Amount of column grids.
- `row` : Amount of row grids.
- `columnProportions`, `rowProportions` : Proportion of each column/row.
    - Number : Apply this number proportion to each column/row
    - Number array : Apply proportion of column/row through elements of this number array.
- `space` :
    - `space.column` : Space between 2 columns
        - A number
        - A number array
    - `space.row` : Space between 2 rows
        - A number
        - A number array

!!! note
    Children game objects will be removed without destroyed.

### Other properties

See [base sizer object](ui-basesizer.md).