## Introduction

Round rectangle shape.

- Author: Rex
- Game object

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

- `width`, `height` : Size of rectangle.
    - `undefined` : Set ot `undefined` to draw a circle.
- `radius` : Radius of four corners.
    - `0`, or `undefined` : Disable round corner.
    - Number: 4 corners with the same radius.
    - JSON
        - 4 corners with the same radius X/Y
            ```javascript
            {
                x: radiusX,
                y: radiusY
            }
            ```
        - Eeach radius of corner
            ```javascript
            {
                tl: radius,
                tr: radius,
                bl: radius,
                br: radius
            }
            ```
            or
            ```javascript
            {
                tl: {x : radiusX, y: radiusY},
                tr: {x : radiusX, y: radiusY},
                bl: {x : radiusX, y: radiusY},
                br: {x : radiusX, y: radiusY},
            }
            ```
        - Radius and iteration
            ```javascript
            {
                radius: radius,
                iteration: 0
            }
            ```
            or
            ```javascript
            {
                radius: {x: radiusX, y: radiusY},
                iteration: 0
            }
            ```
            or
            ```javascript
            {
                radius: {
                    tl: {x : radiusX, y: radiusY},
                    tr: {x : radiusX, y: radiusY},
                    bl: {x : radiusX, y: radiusY},
                    br: {x : radiusX, y: radiusY},
                },
                iteration: 0
            }
            ```
            - `iteration` : Number of interpolation points in each round corner. Default value is `4`.
                - `0` : Draw a straight line instead of arc.

#### Deform

- Rectangle, set radius of 4 corners to `0`.
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y,  width, height, 0, fillColor, fillAlpha);
    ```
- Circle, set width and height to `undefined`.
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y, undefined, undefined, radius, fillColor, fillAlpha);
    ```
- Ellipse, set width and height to `undefined`, and radiusX/radiusY.
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y, undefined, undefined, {x: radiusX, y: radiusY}, fillColor, fillAlpha);
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

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var rect = new MyRoundRectangle(x, y, width, height, radius, fillColor, fillAlpha);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = rect.fillColor;
        ```
    - Set
        ```javascript
        rect.setFillStyle(color, alpha);
        ```
- Stroke color
    - Get
        ```javascript
        var color = rect.strokeColor;
        ```
    - Set
        ```javascript
        rect.setStrokeStyle(lineWidth, color, alpha);
        ```

!!! warning "No tint methods"
    Uses `rect.setFillStyle(color, alpha)` to change color.

### Size

- Get
    ```javascript
    var width = rect.width;
    var height = rect.height;
    ```
- Set
    ```javascript
    rect.setSize(width, height);
    ```
    or
    ```javascript
    rect.width = width;
    rect.height = height;
    ```

### Radius

- Get
    ```javascript
    var radius = rect.radius;
    ```
    or
    ```javascript
    var cornerRadius = rect.cornerRadius;
    ```
    - `radius` : Number, maximum radius of 4 corners.
    - `cornerRadius` : JSON object of 4 corners.
        ```javascript
        {
            tl: {x : radiusX, y: radiusY},
            tr: {x : radiusX, y: radiusY},
            bl: {x : radiusX, y: radiusY},
            br: {x : radiusX, y: radiusY},
        }
        ```
- Set
    ```javascript
    rect.setRadius(value);
    ```
    or
    ```javascript
    rect.radius = radius;
    ```
    - `radius` :
        - Number : 4 corners with the same radius.
        - JSON
            - 4 corners with the same radius X/Y
                ```javascript
                {
                    x: radiusX,
                    y: radiusY
                }
                ```
            - Eeach radius of corner
                ```javascript
                {
                    tl: radius,
                    tr: radius,
                    bl: radius,
                    br: radius
                }
                ```
                or
                ```javascript
                {
                    tl: {x : radiusX, y: radiusY},
                    tr: {x : radiusX, y: radiusY},
                    bl: {x : radiusX, y: radiusY},
                    br: {x : radiusX, y: radiusY},
                }
                ```

### Iteration

- Get
    ```javascript
    var iteration = rect.iteration;
    ```
- Set
    ```javascript
    rect.setIteration(value);
    ```
    or
    ```javascript
    rect.iteration = value;
    ```

Number of interpolation points in each round corner. Default value is `4`.

- `0` : Draw a straight line instead of arc.

### Other properties

See [game object](gameobject.md)
