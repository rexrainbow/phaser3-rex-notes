## Introduction

Layout children game objects in rows.

- Author: Rex
- A kind of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/fixwidthsizer/FixWidthSizer.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-fixwidthsizer)

### Install plugin

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

### Add sizer object

```javascript
var sizer = scene.rexUI.add.fixWidthSizer({
    width: 2,
    height: 2
    orientation: 0,
    // x: 0,
    // y: 0
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, {
    width: 2,
    height: 2
    orientation: 0,
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, width, height, {
    orientation: 0,
});
```

or

```javascript
var sizer = scene.rexUI.add.fixWidthSizer(x, y, width, height, orientation);
```

- `orientation` : Main orientation of the sizer.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom.
- `x`, `y` : Position of sizer. Only available for top-sizer, children-sizers will be changed by parent.
- `width` : Minimum width. i.e. Width of this sizer will larger then this value.
- `height` : Minimum height. i.e. Hieght of this sizer will larger then this value.

### Custom class

- Define class
    ```javascript
    class MySizer extends RexPlugins.UI.FixWidthSizer {
        constructor(scene, x, y, minWidth, minHeight, orientation) {
            super(scene, x, y, minWidth, minHeight, orientation);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var sizer = new MySizer(scene, x, y, minWidth, minHeight, orientation);
    ```

### Add child

Add a game obejct to sizer

```javascript
sizer.add(child);
```

or

```javascript
sizer.add(child, paddingConfig);
```

- `child` : A game object
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

### Add background

```javascript
sizer.addBackground(child, paddingConfig);
```

### Layout children

Arrange position of all children.

```javascript
sizer.layout();
```

### Bounds of sizer

- Get
    ```javascript
    var leftBound = sizer.left;
    var rightBound = sizer.right;
    var topBound = sizer.top;
    var bottomBound = sizer.bottom;
    ```
- Set
    ```javascript
    sizer.left = leftBound;
    sizer.right = rightBound;
    sizer.top = topBound;
    sizer.bottom = bottomBound;
    ```
    or
    ```javascript
    sizer.alignLeft(leftBound);
    sizer.alignRight(rightBound);
    sizer.alignTop(topBound);
    sizer.alignBottom(bottomBound);
    ```

### Push into bounds

Align sizer to bound if overlapping it.

```javascript
sizer.pushIntoBounds();
```

or

```javascript
sizer.pushIntoBounds(bounds);
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
sizer.drawBounds(graphics, color);
```

- `graphics` : [Graphics game object](graphics.md)
- `color` : Default value is `0xffffff`

### Other properties

This sizer game object inherits from [ContainerLite](containerlite.md).