## Introduction

A container with a [grid table](gridtable.md), slider, and scroller.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/gridtable/GridTable.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-gridtable)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

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

### Add grid table object

```javascript
var gridTable = scene.rexUI.add.gridTable({
    // Position
    x: 0,
    y: 0,

    // Elements
    background: backgroundGameObject,

    table: {
        width: 250,
        height: 400,

        cellWidth: 120,
        cellHeight: 60,
        columns: 2,
    },

    slider: {
        track: trackGameObject,
        thumb: thumbGameObject,
    },

    scroller: {
        slidingDeceleration: 5000,
        backDeceleration: 2000,
    },

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        table: 0,
    },

    createCellContainerCallback: function(cell) {
        var scene = cell.scene,
            width = cell.width,
            height = cell.height,
            item = cell.item,
            index = cell.index;
        // container = ...
        return container;
    },

    items: [],

    name: '',
});
```

- `x`, `y` : Position of this grid table object, it is valid when this gridTable is the top object.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of grid table.
- `table` : Configuration of grid table.
    - `table.width` : Width of table, in pixels.
    - `table.height` : Height of table, in pixels.
    - `table.cellHeight` : Default height of each cell, in pixels
    - `table.cellWidth` : Width of each cell, in pixels.
    - `table.columns` : Columns count of each row.
- `slider` : Componments of slider, optional.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of track.
    - `slider.thumb` : Game object of thumb.
    - `slider.input` :
        - `'drag'` : Control slider by dragging thumb game object. Default setting.
        - `'click'` : Control slider by touching track game object.
        - `'none'` : Disable sider controlling.
- `scroller` : Configuration of scroller behavior.
    - `scroller.slidingDeceleration` : Deceleration of slow down when dragging released.
        - Set `false` to disable it.
    - `scroller.backDeceleration` : Deceleration of pull back when out of bounds.
        - Set `false` to disable it.
- `createCellContainerCallback` : Callback to return container object of each visible cell.
    - Properties of `cell` parameter
        - `cell.scene` : Scene of this grid table object.
        - `cell.width` : Width of this cell, in pixels.
        - `cell.height` : Height of this cell, in pixels.
        - `cell.item` : Item of this cell to display.
        - `cell.index` : Index of this cell.
    - **Set origin of returned cell container to (0, 0)**
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.table` : Space between table object and slider object.
- `items` : Array of item data for each cell.
- `name` : Set name of this gridTable.

### Custom class

- Define class
    ```javascript
    class MyGridTable extends RexPlugins.UI.GridTable {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var gridTable = new MyTextBox(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
gridTable.layout();
```

### Items

- Set
    ```javascript
    gridTable.setItems(items);
    ```
    - `items` : Array of item data for each cell.
    - This method will update each visible cell of grid table.
- Clear all items
    ```javascript
    gridTable.setItems();
    ```
- Get
   ```javascript
   var items = gridTable.items;
   ```

### Other properties

See [sizer object](ui-sizer.md)

### Events

- Click cell
    ```javascript
    gridTable.on('cell.click', function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- Pointer-over cell
    ```javascript
    gridTable.on('cell.over', function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- Pointer-out cell
    ```javascript
    gridTable.on('cell.out', function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.

### Get element

- Get element
    - Background game object
        ```javascript
        var background = gridTable.getElement('background');
        ```
    - Grid table
        ```javascript
        var table = gridTable.getElement('table');
        ```        
    - Slider
        - Track
            ```javascript
            var track = gridTable.getElement('slider.track');
            ```
        - Thumb
            ```javascript
            var thumb = gridTable.getElement('slider.thumb');
            ```            
    - Scroller
        ```javascript
        var scroller = gridTable.getElement('scroller');
        ```       
- Get by name
    ```javascript
    var gameObject = gridTable.getElement('#' + name);
    ```

### Draw bounds

Draw all bounds of elements.

```javascript
gridTable.drawBounds(graphics, color);
```

- `graphics` : [Graphics game object](graphics.md)
- `color` : Default value is `0xffffff`
