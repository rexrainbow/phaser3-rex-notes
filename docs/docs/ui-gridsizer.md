## Introduction

Layout children game objects in grids.

- Author: Rex
- A kind of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/gridsizer/GridSizer.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-gridsizer)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexSizerPlugin',
            plugin: SizerPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add grid sizer object

```javascript
var gridSizer = scene.rexUI.add.gridSizer({
    column: 0,
    row: 0,
    // x: 0,
    // y: 0,
    // width: undefined,
    // height: undefined
});
```

or

```javascript
var gridSizer = scene.rexUI.add.gridSizer(x, y, {
    column: 0,
    row: 0,
    // width: undefined,
    // height: undefined
});
```

or

```javascript
var gridSizer = scene.rexUI.add.gridSizer(x, y, width, height, {
    column: 0,
    row: 0
});
```

or

```javascript
var gridSizer = scene.rexUI.add.gridSizer(x, y, width, height, column, row);
```

- `column` : Amount of column grids.
- `row` : Amount of row grids.
- `x`, `y` : Position of gridSizer. Only available for top-gridSizer, children-sizers will be changed by parent.
- `width` : Minimum width. i.e. Width of this gridSizer will bigger then this value.
- `height` : Minimum height. i.e. Hieght of this gridSizer will bigger then this value.

### Custom class

- Define class
    ```javascript
    class MyGridSizer extends RexPlugins.UI.GridSizer {
        constructor(scene, x, y, minWidth, minHeight, column, row) {
            super(scene, x, y, minWidth, minHeight, column, ro);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var gridSizer = new MyGridSizer(scene, x, y, minWidth, minHeight, column, row);
    ```

### Add child

Add a game obejct to grid sizer

```javascript
gridSizer.add(child, columnIndex, rowIndex);
```

or

```javascript
gridSizer.add(child, columnIndex, rowIndex, align, paddingConfig, expand);
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

### Add background

```javascript
gridSizer.addBackground(child, paddingConfig);
```

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

### Bounds of grid sizer

- Get
    ```javascript
    var leftBound = gridSizer.left;
    var rightBound = gridSizer.right;
    var topBound = gridSizer.top;
    var bottomBound = gridSizer.bottom;
    ```
- Set
    ```javascript
    gridSizer.left = leftBound;
    gridSizer.right = rightBound;
    gridSizer.top = topBound;
    gridSizer.bottom = bottomBound;
    ```
    or
    ```javascript
    gridSizer.alignLeft(leftBound);
    gridSizer.alignRight(rightBound);
    gridSizer.alignTop(topBound);
    gridSizer.alignBottom(bottomBound);
    ```

### Push into bounds

Align grid sizer to bound if overlapping it.

```javascript
gridSizer.pushIntoBounds();
```

or

```javascript
gridSizer.pushIntoBounds(bounds);
```

- `bounds` : Bounds in [rectangle object](geom-rectangle.md).

### Scale

- Pop up
    - Pop up width and height
        ```javascript
        sizer.popUp(duration);
        // sizer.popUp(duration, undefined, ease);
        ```
        - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
    - Pop up width only
        ```javascript
        sizer.popUp(duration, 'x');
        // sizer.popUp(duration, 'x', ease);
        ```
        - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
    - Pop up height only
        ```javascript
        sizer.popUp(duration, 'y');
        // sizer.popUp(duration, 'y', ease);
        ```
        - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
- Scale down destroy
    - Scale down width and height
        ```javascript
        sizer.scaleDownDestroy(duration);
        ```
    - Scale down width only
        ```javascript
        sizer.scaleDownDestroy(duration, 'x');
        ```
    - Scale down height only
        ```javascript
        sizer.scaleDownDestroy(duration, 'y');
        ```

### Fade

- Fade in
    ```javascript
    sizer.fadeIn(duration);
    ```
- Fade out destroy
    ```javascript
    sizer.fadeOutDestroy(duration);
    ```

### Draw bounds

Draw all bounds of children.

```javascript
gridSizer.drawBounds(graphics, color);
```

- `graphics` : [Graphics game object](graphics.md)
- `color` : Default value is `0xffffff`

### Other properties

This gridSizer game object inherits from [ContainerLite](containerlite.md).