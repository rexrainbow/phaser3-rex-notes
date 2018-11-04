## Introduction

Viewer of grid table, to manipulate game object of each visible cell.

- Author: Rex
- A kind of game object

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

    cellInvisibleCallback: null,
    cellInvisibleCallbackScope: undefined,

    clamplTableOXY: true,
    scrollMode: 0,        // 0|'v'|'vertical'|1|'h'|'horizontal'
    mask: true
}
var table = scene.add.rexGridTable(x, y, width, height, config);
```

- `cellsCount` : Total cells count
- `columns` : Columns count of each row
- `cellHeight` : Default height of each cell
- `cellWidth` : Width of each cell
- `cellVisibleCallback` , `cellVisibleCallbackScope` : Callback when cell begins visible
- `cellInvisibleCallback`, `cellInvisibleCallbackScope`: Callback when cell begins invisible
- `clamplTableOXY` : Set `true` to clamp `tableOX`, `tableOY` when out-of-bound
    - Set `false` when dragging by [scroller](scroller.md)
- `scrollMode` :
    - `0`, or `'v'`, or `'vertical'`
    - `1`, or `'h'`, or `'horizontal'`
- `mask` : [Mask](mask.md) cells
    - `true` : Default rectangle mask
    - `false` : No mask
    - A [mask object](mask.md) : Custom mask object

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
    }
    ```
- Create instance
    ```javascript
    var table = new MyGridTable(scene, x, y, width, height, config);
    ```

### Cell begins visible

Add [container](container.md) of cell when it begins visible in event `cellvisible`. 

```javascript
table.on('cellvisible', function(cell){
    cell.setContainer(customContainer);
})
```

It is equal to `cellVisibleCallback` in configuration.

```javascript
{
    // ...
    cellVisibleCallback: function(cell) { cell.setContainer(customContainer); },
    // ...
}
```

Each cell only has **one** container gameObject, old container will be destroyed when assigning a new container.

#### Properties of cell object

- Scene object, for creating Game Object.
    ```javascript
    var scene = cell.scene;
    ```
- Index of table grid
    ```javascript
    var index = cell.index;
    ```

### Cell begins invisible

Container of an invisible cell will be destroyed automatically.

To resue container gameObject, user could pop that container by `cell.popContainer()` in event `cellinvisible`.

```javascript
table.on('cellinvisible', function(cell){
    var container = cell.popContainer();
    // put this container into an object pool
})
```

It is equal to `cellInvisibleCallback` in configuration.

```javascript
{
    // ...
    cellInvisibleCallback: function(cell) { var container = cell.popContainer(); /*... */ },
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
    - These will trigger `cellvisible`, or `cellinvisible` events.
- Get
    ```javascript
    var tableOY = table.tableOY;
    var tableOX = table.tableOX;
    ```

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
    var bottomTableOY = table.bottomTableOY;
    ```
- Left bound of tableOX
    ```javascript
    var leftTableOX = table.leftTableOX;  // 0
    ```
- Right bound of tableOX
    ```javascript
    var rightTableOX = table.rightTableOX;
    ```

!!! note "Use case"
    Set bounds of [scroller](scroller.md)

### Cell

#### Get cell

```javascript
var cell = table.getCell(cellIndxe);
```

#### Cell height

- Get
    ```javascript
    var height = cell.height;
    ```
- Set
    ```javascript
    cell.height = height;
    ```
    or
    ```javascript
    cell.setHeight(height);
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