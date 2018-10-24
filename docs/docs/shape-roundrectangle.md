## Introduction

Round rectangle shape.

- Author: Rex
- A kind of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/roundrectangle-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexroundrectangleplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/roundrectangle.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/roundrectangle)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexRoundRectanglePlugin',
            plugin: RoundRectanglePlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create shape

### Add shape object

```javascript
var rect = scene.add.rexRoundRectangle(x, y, width, height, radius, fillColor);
// var rect = scene.add.rexRoundRectangle(x, y, width, height, radius, fillColor, fillAlpha);
```

or

```javascript
var rect = scene.add.rexRoundRectangle(x, y, width, height, {
    tl: radius,
    tr: radius,
    bl: radius,
    br: radius
}, fillColor, fillAlpha);
```

or

```javascript
var rect = scene.add.rexRoundRectangle(x, y, width, height, {
    radius: radius,
    iteration: 6
}, fillColor, fillAlpha);
```

or

```javascript
var rect = scene.add.rexRoundRectangle(x, y, width, height, {
    tl: radius,
    tr: radius,
    bl: radius,
    br: radius,
    iteration: 6
}, fillColor, fillAlpha);
```

- `width`, `height` : Size of rectangle.
    - `undefined` : Set ot `undefined` to draw a circle.
- `radius` : Radius of four corners.
    - `0`, or `undefined` : Disable round corner.
    - Number: 4 corners with the same radius.
    - JSON : Defined each radius of corner
        ```javascript
        {
            tl: radius,
            tr: radius,
            bl: radius,
            br: radius
        }
        ```
- `iteration` : Number of interpolation points in each round corner. Default value is `4`.
    - `0` : Draw a straight line instead of arc.

#### Deform

- Rectangle, set radius of 4 corners to `0`
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y,  width, height, 0, fillColor, fillAlpha);
    ```
- Circle, set width and height to `undefined`
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y, undefined, undefined, radius, fillColor, fillAlpha);
    ```
- Rhombus, set width and height to `undefined`, and assign iteration to `0`
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y, undefined, undefined, {
        radius: radius,
        iteration: 0
    }, fillColor, fillAlpha);
    ```
- Octagon, assign iteration to `0`
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y, width, height, {
        radius: radius,
        iteration: 0
    }, fillColor, fillAlpha);
    ```

### Custom class

- Define class
    ```javascript
    class MyRoundRectangle extends RexPlugins.GameObjects.RoundRectangle {
        constructor(x, y, width, height, radius, fillColor, fillAlpha) {
            super(x, y, width, height, radius, fillColor, fillAlpha);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var rect = new MyRoundRectangle(x, y, width, height, radius, fillColor, fillAlpha);
    ```

### Set color

- Fill color
    ```javascript
    rect.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    rect.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `rect.setFillStyle(color, alpha)` to change color.

### Other properties

See [game object](gameobject.md)
