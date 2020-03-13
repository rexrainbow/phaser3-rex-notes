## Introduction

A container with a [grid table](gridtable.md), slider, and scroller.

- Author: Rex
- Game object

## Live demos

- [Grid table](https://codepen.io/rexrainbow/pen/XyJbWX)
- [Varying cell size](https://codepen.io/rexrainbow/pen/vYBdNQy)
- [Sizer cell](https://codepen.io/rexrainbow/pen/pooZWme)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-gridtable)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add table object
    ```javascript
    var table = scene.rexUI.add.gridTable(config);
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
- Add table object
    ```javascript
    var table = scene.rexUI.add.gridTable(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { GridTable } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add table object
    ```javascript    
    var table = new GridTable(scene, config);
    sscene.add.existing(table);
    ```

### Add table object

```javascript
var table = scene.rexUI.add.gridTable({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

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
        },
        interactive: true,
        reuseCellContainer: false,
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

    header: headerGameObject,
    footer: footerGameObject,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        table: 0,
        // table: {
        //    top: 0,
        //    bottom: 0,
        //    left: 0,
        //    right: 0,
        //},
        header: 0,
        footer: 0,
    },

    expand: {
        header: true,
        footer: true,
    },

    align: {
        header: 'center',
        footer: 'center',
    },

    createCellContainerCallback: function(cell, cellContainer) {
        var scene = cell.scene,
            width = cell.width,
            height = cell.height,
            item = cell.item,
            index = cell.index;
        if (cellContainer === null) { // No reusable cell container, create a new one
            // cellContainer = scene.rexUI.add.label();
        }
        // Set child properties of cell container ...
        return cellContainer; // or null
    },

    items: [],

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
- `width`, `height` : Minimum width, minimum height.
    - Set `width` to `undefined`, and `table.width` is not `undefined`, will count width via table + slider.
    - Set `height` to `undefined`, and `table.height` is not `undefined`, will count height via table + slider.
- `scrollMode` : Scroll grid table vertically, or horizontally.
    - `0`, `'vertical'`, or `'v'` : Scroll grid table vertically. Default value.
    - `1`, `'horizontal'`, or `'h'` : Scroll grid table horizontally.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of grid table.
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
    - `table.interactive` : Set `true` to install touch events (tap/press/over/out/click).
    - `table.reuseCellContainer` : Set `true` to reuse cell container when creating new cell container.
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
- `createCellContainerCallback` : Callback to return a container object, or `null` of each visible cell.
    - Properties of `cell` parameter
        - `cell.scene` : Scene of this grid table object.
        - `cell.width` : Width of this cell, in pixels.
        - `cell.height` : Height of this cell, in pixels.
        - `cell.item` : Item of this cell to display.
        - `cell.index` : Index of this cell.
    - **Origin of returned cell container will be set to (0, 0)**
    - `cellContainer` : Cell container picked from object pool for reusing. Set `reuseCellContainer` to `true` to enable this feature.
        - `null` : No cell container available.
        - Game object : Reusable cell container.
- `header` : Game object of header, optional.
- `footer` : Game object of footer, optional.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.table` :
        - A number: Space between table object and slider object.
        - An object: Padding of table object.
            - If `scrollMode` is `0` (vertical) :
                - `space.table.top`, `space.table.bottom` : Top, bottom padding space of table object.
                - `space.table.right` : Space between table object and slider object.
            - If `scrollMode` is `1` (horizontal) :
                - `space.table.left`, `space.table.right` : Left, right padding space of table object.
                - `space.table.bottom` : Space between table object and slider object.
    - `space.header` : Space between header and table.
    - `space.footer` : Space between footer and table.
- `expand` : Expand width or height of element
    - `expand.header` : Set `true` to expand width or height of header game object.
    - `expand.footer`
- `align` : Align element
    - `align.header`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `align.footer`
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
    var table = new MyGridTable(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
table.layout();
```

### Items

- Set
    ```javascript
    table.setItems(items);
    ```
    - `items` : Array of item data for each cell.
    - This method will update each visible cell of grid table.
- Clear all items
    ```javascript
    table.setItems();
    ```
- Get
    ```javascript
    var items = table.items;
    ```
- [Add item](array-addremove.md#add-item)
    ```javascript
    Phaser.Utils.Array.Add(table.items, item);
    table.refresh();
    ```
- [Insert item](array-addremove.md#insert-item-at)
    ```javascript
    Phaser.Utils.Array.AddAt(table.items, item, index);
    table.refresh();
    ```
- [Remove item](array-addremove.md#remove-item)
    ```javascript
    Phaser.Utils.Array.Remove(table.items, item);
    table.refresh();
    ```
- [Remove item at index](array-addremove.md#remove-item-at)
    ```javascript
    Phaser.Utils.Array.RemoveAt(table.items, index);
    table.refresh();
    ```
- [Remove items between indexes](array-addremove.md#remove-items-between)
    ```javascript
    Phaser.Utils.Array.RemoveBetween(table.items, startIndex, endIndex);
    table.refresh();
    ```
- [Remove random item](array-addremove.md#remove-random-item)
    ```javascript
    Phaser.Utils.Array.RemoveRandomElement(table.items);
    table.refresh();
    ```

### Scroll content

- Set
    ```javascript
    table.setChildOY(oy);
    ```
    or
    ```javascript
    table.childOY = oy;
    ```
- Get
    ```javascript
    var childOY = table.childOY;
    ```
- Top OY
    ```javascript
    var topOY = table.topChildOY;
    ```
- Bottom OY
    ```javascript
    var bottomOY = table.bottomChildOY;
    ```

#### Scroll by percentage

- Set
    ```javascript
    table.setT(t);  // t: 0~1
    ```
    or
    ```javascript
    table.t = t;
    ```
- Get
    ```javascript
    var t = table.t;
    ```

### Scroll to top/bottom

- Scroll to top
    ```javascript
    table.scrollToTop();
    ```
    - Equal to `table.t = 0;`
- Scroll to bottom
    ```javascript
    table.scrollToBottom();
    ```
    - Equal to `table.t = 1;`

### Enable/disable scrolling

- Slider
    - Set enable state
        ```javascript
        table.setSliderEnable(enabled);
        ```
        or
        ```javascript
        table.sliderEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = table.sliderEnable;
        ```
- Scroller
    - Set enable state
        ```javascript
        table.setScrollerEnable(enabled);
        ```
        or
        ```javascript
        table.scrollerEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = table.scrollerEnable;
        ```

### Refresh table cells

```javascript
table.refresh();
```

Which is equal to `table.setItems(table.items)`.

### Other properties

See [base sizer object](ui-basesizer.md).

### Events

- [Tap](gesture-tap.md) cell
    ```javascript
    table.on(tapEventName, function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `tapEventName` : `'cell.1tap'`, `'cell.2tap'`, `'cell.3tap'`, etc ...
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- [Press](gesture-press.md) cell
    ```javascript
    table.on(`cell.pressstart`, function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    ```javascript
    table.on(`cell.pressend`, function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- [Swipe](gesture-swipe.md) cell
    ```javascript
    table.on(swipeEventName, function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `swipeEventName` : 
        - `'cell.swipeleft'`, `'cell.swiperight'`, for vertical scrolling mode.
        - `'cell.swipeup'`, `'cell.swipedown'`, for horizontal scrolling mode.
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- Pointer-over cell
    ```javascript
    table.on('cell.over', function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- Pointer-out cell
    ```javascript
    table.on('cell.out', function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- Click cell
    ```javascript
    table.on('cell.click', function(cellContainer, cellIndex) {
        // ...
    }, scope);
    ```
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.

### Get element

- Get element
    - Background game object
        ```javascript
        var background = table.getElement('background');
        ```
    - [Grid table](gridtable.md)
        ```javascript
        var table = table.getElement('table');
        ```
    - [Slider](ui-slider.md)
        - Track
            ```javascript
            var track = table.getElement('slider.track');
            ```
        - Thumb
            ```javascript
            var thumb = table.getElement('slider.thumb');
            ```
    - [Scroller](scroller.md)
        ```javascript
        var scroller = table.getElement('scroller');
        ```
- Get by name
    ```javascript
    var gameObject = table.getElement('#' + name);
    ```