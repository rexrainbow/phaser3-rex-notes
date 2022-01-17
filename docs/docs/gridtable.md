## Introduction

Viewer of grid table, to manipulate game object of each visible cell.

- Author: Rex
- Game object

## Live demos

- [Grid table](https://codepen.io/rexrainbow/pen/vjJeMR)
- [Grid table & slider](https://codepen.io/rexrainbow/pen/rrPyXL)
- [Grid table & scroller](https://codepen.io/rexrainbow/pen/GXjPrL)
- [Grid table & slider & scroller](https://codepen.io/rexrainbow/pen/xaLdyr)
- [Horizontal scrolling](https://codepen.io/rexrainbow/pen/QVjXRM)
- [Varying cell height](https://codepen.io/rexrainbow/pen/VGwPJz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gridtable)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
    ```
- Add table object
    ```javascript
    var table = scene.add.rexGridTable(x, y, width, height, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GridTablePlugin from 'phaser3-rex-plugins/plugins/gridtable-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGridTablePlugin',
                plugin: GridTablePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add table object
    ```javascript
    var table = scene.add.rexGridTable(x, y, width, height, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import GridTable from 'phaser3-rex-plugins/plugins/gridtable.js';
    ```
- Add table object
    ```javascript    
    var table = new GridTable(scene, x, y, width, height, config);
    scene.add.existing(table);
    ```

### Create instance

```javascript
var config = {
    cellsCount: 0,
    columns: 1,
    cellHeight: 30,
    cellWidth: 30,

    cellVisibleCallback: null,
    // cellVisibleCallback: function (cell, cellContainer, table) {},
    cellVisibleCallbackScope: undefined,
    reuseCellContainer: false,

    cellInvisibleCallback: null,
    // cellInvisibleCallback: function(cell) {},
    cellInvisibleCallbackScope: undefined,

    clamplTableOXY: true,
    scrollMode: 0,        // 0|'v'|'vertical'|1|'h'|'horizontal'
    mask: {
        padding: 0,
        // updateMode: 0,
        // layer: undefined,
    }
}
var table = scene.add.rexGridTable(x, y, width, height, config);
```

- `cellsCount` : Total cells count.
- `columns` : Columns count of each row.
- `cellHeight` : Default height of each cell.
    - Expand cell height to fit table height : set `cellHeight` to `undefined`, and `scrollMode` is `'horizontal'`.
- `cellWidth` : Width of each cell.
    - Expand cell width to fit table width : set `cellWidth` to `undefined`, and `scrollMode` is `'vertical'`.
- `cellVisibleCallback` , `cellVisibleCallbackScope` : [Callback when cell begins visible](gridtable.md#cell-begins-visible).
    ```javascript
    function (cell, cellContainer, table) {
        if (cellContainer === null) { // No reusable cell container, create a new one
            var scene = cell.scene;
            // cellContainer = scene.add.container();
        }
        // Set child properties of cell container ...
        cell.setContainer(cellContainer); // Assign cell container
    }
    ```
- `reuseCellContainer` : Set `true` to reuse cell container when cell is visible.
- `cellInvisibleCallback`, `cellInvisibleCallbackScope`: [Callback when cell begins invisible](gridtable.md#cell-begins-invisible)
    ```javascript
    function (cell) {
        // var container = cell.popContainer();
    }
    ```
- `clamplTableOXY` : Set `true` to clamp `tableOX`, `tableOY` when out-of-bound,
    - Set `false` when dragging by [scroller](scroller.md)
- `scrollMode` :
    - `0`, or `'v'`, or `'vertical'` : Scroll table vertically.
    - `1`, or `'h'`, or `'horizontal'` : Scroll table horizontally.
- `mask` : A rectangle mask of cells
    - `mask.padding` : Extra left/right/top/bottom padding spacing of this rectangle mask. Default value is `0`.
    - `mask.updateMode` : When to update cells mask
        - `0`, or `update` : Apply mask to cell container only when `table.updateTable()` is invoked. Default behavior.
        - `1`, or `everyTick` : Apply mask to cell container every tick. Use this mode if game objects of cell are moved after `table.updateTable()` and still been masked.
    - `mask.layer` :
        - `undefined`, `false`, `null` : Disable this feature, default behavior
        - [Layer game object](layer.md) : Draw children game object of panel on this layer game object, then apply mask on this layer game object.     
    - `false` : No mask.

Add grid table from JSON

```javascript
var table = scene.make.rexGridTable({
    x: 0,
    y: 0,
    width: 256,
    height: 256,

    // cellsCount: 0,   // total cells count
    // ...
    // origin: {x: 0.5, y: 0.5},
});
```

### Custom class

- Define class
    ```javascript
    class MyGridTable extends GridTable {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var table = new MyGridTable(scene, x, y, width, height, config);
    ```

### Cell begins visible

Add [container](container.md) of cell when it begins visible in event `cellvisible`. 

```javascript
table.on('cellvisible', function(cell, cellContainer, table){
    if (cellContainer === null) { // No reusable cell container, create a new one
        var scene = cell.scene;
        // cellContainer = scene.add.container();
    }
    // Set child properties of cell container ...
    cell.setContainer(cellContainer); // Assign cell container
})
```

It is equal to `cellVisibleCallback` in configuration.

```javascript
{
    // ...
    cellVisibleCallback: function(cell, cellContainer, table) {
        cell.setContainer(cellContainer); // Assign cell container
    },
    // ...
}
```

- `cell`
    - Scene object of grid table.
        ```javascript
        var scene = cell.scene;
        ```
    - Index of cell.
        ```javascript
        var index = cell.index;
        ```
    - Size of cell.
        ```javascript
        var cellWidth = cell.width;
        var cellHeight = cell.height;
        ```
        - Change size of cell : 
            - Change cell height in scoll-vertical mode.
                ```javascript
                cell.setHeight(newHeight);
                // cell.height = newHeight;
                ```
                or
                ```javascript
                cell.setDeltaHeight(deltaHeight);
                // cell.deltaHeight = deltaHeight;
                ```
            - Reset cell height in scoll-vertical mode.
                ```javascript
                cell.setDeltaHeight(0);
                // cell.deltaHeight = 0;
                ```
            - Change cell width in scroll-horizontal mode.
                ```javascript
                cell.setWidth(newWidth);
                // cell.width = newWidth;
                ```
                or
                ```javascript
                cell.setDeltaWidth(deltaWidth);
                // cell.deltaWidth = deltaWidth;
                ```
            - Reset cell height in scroll-horizontal mode.
                ```javascript
                cell.setDeltaWidth(0);
                // cell.deltaWidth = 0;
                ```
    - Assign cell container. Set origin point of this cell container to (0,0).
        ```javascript
        cell.setContainer(cellContainer);
        ```
- `cellContainer` : Cell container picked from object pool for reusing. Set `reuseCellContainer` to `true` to enable this feature.
    - `null` : No cell container available.
    - Game object : Reusable cell container.
- `table` : Grid table.

Each cell only has **one** container gameObject, old container will be destroyed when assigning a new container.

### Cell begins invisible

Container of an invisible cell will be destroyed automatically.

To resue container gameObject

- Set `reuseCellContainer` to `true` to put invisible cell container into object pool.
- Or, pop that container by `cell.popContainer()` in event `cellinvisible`.

```javascript
table.on('cellinvisible', function(cell){
    // var container = cell.popContainer();
})
```

It is equal to `cellInvisibleCallback` in configuration.

```javascript
{
    // ...
    cellInvisibleCallback: function(cell) {
        // var container = cell.popContainer();
    },
    // ...
}
```

### Scroll table content

- Set
    ```javascript
    table.setTableOY(oy).updateTable();
    table.addTableOY(dy).updateTable();
    ```
    ```javascript
    table.setTableOX(ox).updateTable();
    table.addTableOX(dx).updateTable();
    ```    
    ```javascript
    table.setTableOXY(ox, oy).updateTable();
    table.addTableOXY(dx, dy).updateTable();
    ```
    or
    ```javascript
    table.tableOY = oy;  // include table.updateTable()
    table.tableOX = ox;
    ```
    - These will trigger `cellvisible`, or `cellinvisible` events.
- Get
    ```javascript
    var tableOY = table.tableOY;
    var tableOX = table.tableOX;
    ```

!!! note "Use case"
    Scroll table by [scroller](scroller.md) behavior.

#### Scroll by percentage

- Set
    ```javascript
    table.setTableOYByPercentage(t).updateTable();  // t: 0~1
    ```
    or
    ```javascript
    table.t = t;  // include table.updateTable()
    ```
- Get
    ```javascript
    var t = table.getTableOYPercentage();
    //var t = table.t;
    ```

!!! note "Use case"
    Scroll table by [slider](slider.md) behavior.

### Refresh table content

- Refresh all visible cells.
    ```javascript
    table.updateTable(true);
    ```
- Update a visible cell
    ```javascript
    table.updateVisibleCell(cellIndex);
    ```

### Table size in cells

- Set table size
    ```javascript
    table.setGridSize(colCount, rowCount).updateTable();
    ```

#### Total cells count

- Get
    ```javascript
    var count = table.cellsCount;
    ```
- Set
    ```javascript
    table.setCellsCount(count).updateTable();
    ```

#### Columns count

- Get
    ```javascript
    var columnCount = table.columnCount;
    ```
- Set
    ```javascript
    table.setColumnCount(count).updateTable();
    ```

### Table size in pixels

- Table height in pixels
    ```javascript
    var tableHeight = table.tableHeight;
    ```
- Table width in pixels
    ```javascript
    var tableWidth = table.tableWidth;
    ```

### Bounds of tableOX, tableOY

- Top bound of tableOY
    ```javascript
    var topTableOY = table.topTableOY;  // 0
    ```
- Bottom bound of tableOY
    ```javascript
    var bottomTableOY = table.bottomTableOY; // A negative number
    ```
- Left bound of tableOX
    ```javascript
    var leftTableOX = table.leftTableOX;  // 0
    ```
- Right bound of tableOX
    ```javascript
    var rightTableOX = table.rightTableOX; // A negative number
    ```

!!! note "Use case"
    Set bounds of [scroller](scroller.md)

### Resize table

```javascript
table.resize(width, height);
```

### Cell

#### Get cell

```javascript
var cell = table.getCell(cellIndex);
```

#### Get cell from position

```javascript
var cellIndex = table.pointToCellIndex(x, y);
var cell = table.getCell(cellIndex);
```

#### Cell height

- Get
    ```javascript
    var height = cell.height;
    ```
- Set cell height, only worked in scoll-vertical mode.
    ```javascript
    cell.height = height;
    // cell.setHeight(height);
    ```
    or
    ```javascript
    table.setCellHeight(cellIndex, cellHeight);
    ```
    - Refresh table after the cell size is changed.
        ```javascript
        table.updateTable(true);
        ```
    - Emit `'cellheightchange'` event.
        ```javascript
        table.on('cellheightchange', function (cell, cellContainer, table) {
        });
        ```

#### Cell width

- Get
    ```javascript
    var width = cell.width;
    ```
- Set cell width, only worked in scoll-horizontal mode.
    ```javascript
    cell.width = width;
    // cell.setWidth(width);
    ```
    or
    ```javascript
    table.setCellWidth(cellIndex, cellWidth);
    ```
    - Refresh table after the cell size is changed.
        ```javascript
        table.updateTable(true);
        ```
    - Emit `'cellwidthchange'` event.
        ```javascript
        table.on('cellwidthchange', function (cell, cellContainer, table) {
        });
        ```

#### Fore each visible cell

- For when you absolutely know this Set won't be modified during the iteration
    ```javascript
    table.iterateVisibleCell(function(cell){
        // ...
    });
    ```
- For when you know this Set will be modified during the iteration.
    ```javascript
    table.eachVisibleCell(function(cell){
        // ...
    });
    ```

#### Container

- Get
    ```javascript
    var container = cell.getContainer();
    ```
- Pop (get and remove)
    ```javascript
    var container = cell.popContainer();
    ```
- Set
    ```javascript
    cell.setContainer(container);
    ```
- Remove
    ```javascript
    cell.destroyContainer();
    ```

#### Properties

```javascript
var cellIndex = cell.index;
```