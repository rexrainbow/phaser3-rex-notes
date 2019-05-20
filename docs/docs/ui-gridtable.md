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
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

    scrollMode: 0,

    // Elements
    background: backgroundGameObject,

    table: {
        width: undefined,
        height: undefined,

        cellWidth: undefined,
        cellHeight: undefined,
        columns: 2,
        mask: {
            padding: 0
        }
    },

    slider: {
        track: trackGameObject,
        thumb: thumbGameObject,
    },

    scroller: {
        threshold: 10,
        slidingDeceleration: 5000,
        backDeceleration: 2000,
    },

    clamplChildOY: false,

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

- `x`, `y` : Position of this object, it is valid when this object is the top object.
    - Number : World position in pixels.
    - String (`'p%+n'`) : Position based on visible window. See [anchor](anchor.md#create-instance).
- `width`, `height` : Minimum width, minimum height.
    - Set `width` to `undefined`, and `table.width` is not `undefined`, will count width via table + slider.
    - Set `height` to `undefined`, and `table.height` is not `undefined`, will count height via table + slider.
- `scrollMode` : Scroll grid table vertically, or horizontally.
    - `0`, `'vertical'`, or `'v'` : Scroll grid table vertically. Default value.
    - `1`, `'horizontal'`, or `'h'` : Scroll grid table horizontally.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of grid table.
- `table` : Configuration of grid table core.
    - `table.width` : Width of table, in pixels.
        - Set to `undefined` to expand table width to fit this grid table object.
    - `table.height` : Height of table, in pixels.
        - Set to `undefined` to expand table height to fit this grid table object.
    - `table.cellHeight` : Default height of each cell.
        - Expand cell height to fit table height : set `cellHeight` to `undefined`, and `scrollMode` is `'horizontal'`.
    - `table.cellWidth` : Width of each cell.
        - Expand cell width to fit table width : set `cellWidth` to `undefined`, and `scrollMode` is `'vertical'`.
    - `table.columns` : Columns count of each row.
    - `table.mask` : A rectangle mask of cells
        - `table.mask.padding` : Extra left/right/top/bottom padding spacing of this rectangle mask. Default value is `0`.
        - `false` : No mask.
- `slider` : Componments of slider, optional.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of track.
    - `slider.thumb` : Game object of thumb.
    - `slider.input` :
        - `'drag'` : Control slider by dragging thumb game object. Default setting.
        - `'click'` : Control slider by touching track game object.
        - `'none'` : Disable sider controlling.
    - Set to `false` to skip creating slider.
- `scroller` : Configuration of scroller behavior.
    - `scroller.threshold` : Minimal movement to scroll. Set `0` to scroll immediately.
    - `scroller.slidingDeceleration` : Deceleration of slow down when dragging released.
        - Set `false` to disable it.
    - `scroller.backDeceleration` : Deceleration of pull back when out of bounds.
        - Set `false` to disable it.
    - Set to `false` to skip creating scroller.
- `clamplChildOY` : Set `true` to clamp scrolling.
- `createCellContainerCallback` : Callback to return a container object of each visible cell.
    - Properties of `cell` parameter
        - `cell.scene` : Scene of this grid table object.
        - `cell.width` : Width of this cell, in pixels.
        - `cell.height` : Height of this cell, in pixels.
        - `cell.item` : Item of this cell to display.
        - `cell.index` : Index of this cell.
    - **Origin of returned cell container will be set to (0, 0)**
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
    var gridTable = new MyGridTable(scene, config);
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

### Scroll content

- Set
    ```javascript
    gridTable.setChildOY(oy);
    ```
    or
    ```javascript
    gridTable.childOY = oy;
    ```
- Get
    ```javascript
    var childOY = gridTable.childOY;
    ```
- Top OY
    ```javascript
    var topOY = gridTable.topChildOY;
    ```
- Bottom OY
    ```javascript
    var bottomOY = gridTable.bottomChildOY;
    ```

#### Scroll by percentage

- Set
    ```javascript
    gridTable.setT(t);  // t: 0~1
    ```
    or
    ```javascript
    gridTable.t = t;
    ```
- Get
    ```javascript
    var t = gridTable.t;
    ```

### Scroll to top/bottom

- Scroll to top
    ```javascript
    gridTable.scrollToTop();
    ```
    - Equal to `gridTable.t = 0;`
- Scroll to bottom
    ```javascript
    gridTable.scrollToBottom();
    ```
    - Equal to `gridTable.t = 1;`

### Enable/disable scrolling

- Slider
    - Set enable state
        ```javascript
        gridTable.setSliderEnable(enabled);
        ```
        or
        ```javascript
        gridTable.sliderEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = gridTable.sliderEnable;
        ```
- Scroller
    - Set enable state
        ```javascript
        gridTable.setScrollerEnable(enabled);
        ```
        or
        ```javascript
        gridTable.scrollerEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = gridTable.scrollerEnable;
        ```

### Refresh table cells

```javascript
table.refresh();
```

### Other properties

See [base sizer object](ui-basesizer.md).

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