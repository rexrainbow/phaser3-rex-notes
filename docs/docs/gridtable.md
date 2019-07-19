## Introduction

Viewer of grid table, to manipulate game object of each visible cell.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gridtable-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgridtableplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gridtable.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gridtable)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
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

### Create instance

```javascript
var config = {
    cellsCount: 0,
    columns: 1,
    cellHeight: 30,
    cellWidth: 30,

    cellVisibleCallback: null,
    cellVisibleCallbackScope: undefined,
    reuseCellContainer: false,

    cellInvisibleCallback: null,
    cellInvisibleCallbackScope: undefined,

    clamplTableOXY: true,
    scrollMode: 0,        // 0|'v'|'vertical'|1|'h'|'horizontal'
    mask: {
        padding: 0
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
- `cellVisibleCallback` , `cellVisibleCallbackScope` : Callback when cell begins visible.
- `reuseCellContainer` : Set `true` to reuse cell container when cell is visible.
- `cellInvisibleCallback`, `cellInvisibleCallbackScope`: Callback when cell begins invisible.
- `clamplTableOXY` : Set `true` to clamp `tableOX`, `tableOY` when out-of-bound,
    - Set `false` when dragging by [scroller](scroller.md)
- `scrollMode` :
    - `0`, or `'v'`, or `'vertical'` : Scroll table vertically.
    - `1`, or `'h'`, or `'horizontal'` : Scroll table horizontally.
- `mask` : A rectangle mask of cells
    - `mask.padding` : Extra left/right/top/bottom padding spacing of this rectangle mask. Default value is `0`.
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
table.on('cellvisible', function(cell, cellContainer){
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
    cellVisibleCallback: function(cell, cellContainer) {
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
                cell.height = newHeight;
                ```
            - Change cell width in scroll-horizontal mode.
                ```javascript
                cell.width = newWidth;
                ```
    - Assign cell container. Set origin point of this cell container to (0,0).
        ```javascript
        cell.setContainer(cellContainer);
        ```
- `cellContainer` : Cell container picked from object pool for reusing. Set `reuseCellContainer` to `true` to enable this feature.
    - `null` : No cell container available.
    - Game object : Reusable cell container.

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

Refresh all visible cells.

```javascript
table.updateTable(true);
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