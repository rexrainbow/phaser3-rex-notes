## Introduction

Viewer of grid table, to manipulate game object of each visible cell.

- Author: Rex
- A kind of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gridtable-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgridtableplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gridtable.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gridtable)

### Create instance

```javascript
var table = scene.add.rexGridTable(x, y, width, height, config);
```

Configuration

```javascript
{
    cellsCount: 0,    // total cells count
    columns: 1,       // columns count of each row
    cellHeight: 30,   // default height of each cell
    cellWidth: 30,    // width of each cell

    cellVisibleCallback: null, // callback when cell begins visible
    cellVisibleCallbackScope: undefined,

    cellInvisibleCallback: null, // callback when cell begins invisible
    cellInvisibleCallbackScope: undefined,

    clamplTableOXY: true, // clamp tableOX, tableOY when out-of-bound
    scrollMode: 0,        // 0|'v'|'vertical'|1|'h'|'horizontal'
}
```

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

These will trigger `cellvisible`, or `cellinvisible` events.

### Refresh table content

Refresh all visible cells.

```javascript
table.updateTable(true);
```

### Total cells count

- Get
    ```javascript
    var count = table.cellsCount;
    ```
- Set
    ```javascript
    table.setCellsCunt(count).updateTable();
    ```

### Set table size

```javascript
table.setGridSize(colCount, rowCount).updateTable();
```

#### Set columns count

```javascript
table.setColumnCount(count).updateTable();
```

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