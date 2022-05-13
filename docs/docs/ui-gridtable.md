## Introduction

A container with a [grid table](gridtable.md), slider, and scroller.

- Author: Rex
- Game object

## Live demos

- [Grid table](https://codepen.io/rexrainbow/pen/XyJbWX)
- [Varying cell size](https://codepen.io/rexrainbow/pen/vYBdNQy)
- [Message list](https://codepen.io/rexrainbow/pen/bGgKbmv)
- Sizer cell: 
    - [Demo 1](https://codepen.io/rexrainbow/pen/pooZWme)
    - [Demo 2](https://codepen.io/rexrainbow/pen/abOgyPo)
- [Fade-out-destroy cell](https://codepen.io/rexrainbow/pen/YzXYemw)

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
    scene.add.existing(table);
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
            padding: 0,
            // updateMode: 0,
            // layer: undefined,
        },
        interactive: true,
        reuseCellContainer: false,

        // click: undefined,
        // tap: undefined,
        // press: undefined,
        // swipe: undefined,
    },

    slider: {
        // background: sliderBackgroundGameObject,
        track: trackGameObject,
        thumb: thumbGameObject,
        // input: 'drag',
        // position: 'right',
        // adaptThumbSize: false,
        // minThumbSize: undefined,
        
        // buttons: {
        //     top: topButtonGameObject, bottom: bottomButtonGameObject,
        //     left: leftButtonGameObject, right: rightButtonGameObject,
        //     step: 0.01,
        // }
    },

    scroller: {
        threshold: 10,
        slidingDeceleration: 5000,
        backDeceleration: 2000,
        pointerOutRelease: true,
    },

    mouseWheelScroller: false,
    // mouseWheelScroller: {
    //     focus: false,
    //     speed: 0.1
    // }.

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
        - Necessary field in *vertical* scrollMode.
        - `undefined` :  Expand cell height to fit table height, in *horizontal* scrollMode.
    - `table.cellWidth` : Width of each cell.
        - Necessary field in *horizontal* scrollMode.
        - `undefined` : Expand cell width to fit table width, in *vertical* scrollMode.
    - `table.columns` : Columns count of each row.
    - `table.mask` : A rectangle mask of cells
        - `table.mask.padding` : Extra left/right/top/bottom padding spacing of this rectangle mask. Default value is `0`.
        - `table.mask.updateMode` : When to update cells mask
            - `0`, or `update` : Apply mask to cell container only when `table.updateTable()` is invoked. Default behavior.
            - `1`, or `everyTick` : Apply mask to cell container every tick. Use this mode if game objects of cell are moved after `table.updateTable()` and still been masked.
        - `table.mask.layer` :
            - `undefined`, `false`, `null` : Disable this feature, default behavior
            - [Layer game object](layer.md) : Draw children game object of panel on this layer game object, then apply mask on this layer game object.          
        - `false` : No mask.
    - `table.reuseCellContainer` : 
        - `true` : Reuse cell container when creating new cell container. 
        - `false` : Destory cell container when cell is invisible, create new cell container when cell is visible. Default behavior.
    - `table.interactive` : Set `true` to install touch events (tap/press/over/out/click). Default value is `true`.
    - `table.click` : [Configuration of cell-click behavior](button.md#create-instance), if `table.interactive` is `true`.
        - `undefined` : Use default click behavior.
    - `table.tap` : [Configuration of cell-tap behavior](gesture-tap.md#create-instance), if `table.interactive` is `true`.
        - `undefined` : Use default tap behavior.
    - `table.press` : [Configuration of cell-press behavior](gesture-press.md#create-instance), if `table.interactive` is `true`.
        - `undefined` : Use default press behavior.
    - `table.swipe` : [Configuration of cell-swipe behavior](gesture-swipe.md#create-instance), if `table.interactive` is `true`.
        - `undefined` : Use default swipe behavior.
- `slider` : Componments of slider, optional.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of track.
    - `slider.thumb` : Game object of thumb.
    - `slider.input` :
        - `'pan'`, `'drag'`, or `0` : Control slider by panning/dragging thumb game object. Default setting.
        - `'click'`, or `1` : Control slider by touching track game object.
        - `'none'`, or `-1` : Disable sider controlling.
    - `slider.position` : Position of this sldier.
        - `0`, `'right'`, `'bottom'` : Sldier at right/bottom side. Default value.
        - `1`, `'left'`, `'top'` : Sldier at left/top side.
    - `slider.adaptThumbSize` :
        - `false` : Don't adjust height/width of thumb. Default behavior.
        - `true` : Adjust height/width of thumb according to ratio of visible child.
            - Minimum height/width of thumb = `slider.minThumbSize`. If content is larger then a page.
            - Maximum height/width of thumb = height/width of `slider.track`. If content is less then a page.
    - `slider.minThumbSize` : Minimum height/width of thumb used in `slider.adaptThumbSize` mode.
    - `slider.buttons` : Press button to scroll content in each tick.
        - `slider.buttons.top`, `slider.buttons.bottom` : Top and bottom buttons.
        - `slider.buttons.left`, `slider.buttons.right` : Left and right buttons
        - `slider.buttons.step` : Scrolling step in each tick. Default value is `0.01`.
    - Set to `false` to skip creating slider.
- `scroller` : Configuration of scroller behavior.
    - `scroller.threshold` : Minimal movement to scroll. Set `0` to scroll immediately.
    - `scroller.slidingDeceleration` : Deceleration of slow down when dragging released.
        - Set `false` to disable it.
    - `scroller.backDeceleration` : Deceleration of pull back when out of bounds.
        - Set `false` to disable it.
    - `scroller.pointerOutRelease` : Set to `true` to release input control when pointer out of gameObject.
    - Set to `false` to skip creating scroller.
- `mouseWheelScroller` : Configuration of mouse-wheel-scroller behavior.
    - `mouseWheelScroller.focus` : 
        - `true` : Only scrolling when cursor is over table.
        - `false` : Scrolling without checking cursor. Default behavior.
    - `mouseWheelScroller.speed` : Scrolling speed, default value is `0.1`.
    - Set to `false` to skip creating mouse-wheel-scroller. Default behavior.
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
    - `expand.footer` : Set `true` to expand width or height of footer game object.
- `align` : Align element
    - `align.header`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `align.footer`
- `items` : Array of item data for each cell.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyGridTable extends RexPlugins.UI.GridTable {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
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

See also - [dirty](ui-basesizer.md#dirty)

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

### Cell container

- Get
    ```javascript
    var container = table.getCellContainer(cellIndex);
    ```

### Scroll content

- Set
    ```javascript
    table.childOY = oy;
    // table.setChildOY(oy);
    ```
- Set and clamp
    ```javascript
    table.setChildOY(oy, true);
    ```
- Add
    ```javascript
    table.addChildOY(oy);
    ```
- Add and clamp
    ```javascript
    table.addChildOY(oy, true);
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
- Is overflow (height of content is larger than display height)
    ```javascript
    var isOverflow = textArea.isOverflow;
    ```

#### Scroll by percentage

- Set
    ```javascript
    table.t = t;  // t: 0~1
    // table.setT(t);  
    ```
- Set and clamp
    ```javascript    
    table.setT(t, true);
    ```
- Get
    ```javascript
    var t = table.t;
    ```

#### Scroll to top/bottom

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

#### Enable/disable scrolling

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

- Refresh all visible cells
    ```javascript
    table.refresh();
    ```
    - Equal to `table.setItems(table.items)`.
- Update a visible cell
    ```javascript
    table.updateVisibleCell(cellIndex);
    ```

### Other properties

See [base sizer object](ui-basesizer.md).

### Events

- Pointer-down cell
    ```javascript
    table.on('cell.down', function(cellContainer, cellIndex, pointer, event) {
        // ...
    }, scope);
    ```
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-up cell
    ```javascript
    table.on('cell.up', function(cellContainer, cellIndex, pointer, event) {
        // ...
    }, scope);
    ```
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-over cell
    ```javascript
    table.on('cell.over', function(cellContainer, cellIndex, pointer, event) {
        // ...
    }, scope);
    ```
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-out cell
    ```javascript
    table.on('cell.out', function(cellContainer, cellIndex, pointer, event) {
        // ...
    }, scope);
    ```
    - Cancel remaining touched events : `event.stopPropagation()`
- Click cell
    ```javascript
    table.on('cell.click', function(cellContainer, cellIndex, pointer, event) {
        // ...
    }, scope);
    ```
    - Cancel remaining touched events : `event.stopPropagation()`
- [Tap](gesture-tap.md) cell
    ```javascript
    table.on(tapEventName, function(cellContainer, cellIndex, pointer) {
        // ...
    }, scope);
    ```
    - `tapEventName` : `'cell.1tap'`, `'cell.2tap'`, `'cell.3tap'`, etc ...
    - `cellContainer` : Container game object of triggered cell.
    - `cellIndex` : Index of triggered cell.
- [Press](gesture-press.md) cell
    ```javascript
    table.on(`cell.pressstart`, function(cellContainer, cellIndex, pointer) {
        // ...
    }, scope);
    ```
    ```javascript
    table.on(`cell.pressend`, function(cellContainer, cellIndex, pointer) {
        // ...
    }, scope);
    ```
- [Swipe](gesture-swipe.md) cell
    ```javascript
    table.on(swipeEventName, function(cellContainer, cellIndex, pointer) {
        // ...
    }, scope);
    ```
    - `swipeEventName` : `'cell.swipeleft'`, `'cell.swiperight'`, `'cell.swipeup'`, `'cell.swipedown'`.
- Scroll table
    ```javascript
    table.on('scroll', function(table) {
        // ...
    })
    ```
- Scroller drag start
    ```javascript
    table.getElement('scroller').on('dragstart', function(panel) {
        // ...
    })
    ```
- Scroller drag end
    ```javascript
    table.getElement('scroller').on('dragend', function(panel) {
        // ...
    })
    ```

### Get element

- Get element
    - Background game object
        ```javascript
        var background = table.getElement('background');
        ```
    - [Grid table](gridtable.md)
        ```javascript
        var tableBody = table.getElement('table');
        ```
    - Layer of gridtable, assigned at config `table.mask.layer`.
        ```javascript
        var layer = table.getElement('tableLayer');
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
    // var gameObject = table.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = table.getByName('#' + name);
    // var gameObject = table.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.