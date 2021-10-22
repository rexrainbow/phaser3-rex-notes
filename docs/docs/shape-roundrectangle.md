## Introduction

Round rectangle shape.

- Author: Rex
- Game object

## Live demos

- [Round rectangle](https://codepen.io/rexrainbow/pen/ZqqJjG)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/roundrectangle)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/    phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
    ```
- Add shape object
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y, width, height, radius, fillColor, fillAlpha);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';
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
- Add shape object
    ```javascript
    var rect = scene.add.rexRoundRectangle(x, y, width, height, radius, fillColor, fillAlpha);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
    ```
- Add shape object
    ```javascript    
    var rect = new RoundRectangle(scene, x, y, width, height, radius, fillColor, fillAlpha);
    scene.add.existing(rect);
    ```

### Create shape object

```javascript
var rect = scene.add.rexRoundRectangle(x, y, width, height, radius, fillColor, fillAlpha);
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
        constructor(scene, x, y, width, height, radius, fillColor, fillAlpha) {
            super(scene, x, y, width, height, radius, fillColor, fillAlpha);
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
    var rect = new MyRoundRectangle(scene, x, y, width, height, radius, fillColor, fillAlpha);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = rect.fillColor;
        var alpha = rect.fillAlpha;
        ```
    - Set
        ```javascript
        rect.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        rect.setFillStyle();
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
    - Clear
        ```javascript
        rect.setStrokeStyle();
        ```

!!! warning "No tint methods"
    Uses `rect.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = rect.alpha;
    ```
- Set
    ```javascript
    rect.setAlpha(alpha);
    // rect.alpha = alpha;
    ```

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

### Display size

- Get
    ```javascript
    var width = rect.displayWidth;
    var height = rect.displayHeight;
    ```
- Set
    ```javascript
    rect.setDisplaySize(width, height);
    ```
    or
    ```javascript
    rect.displayWidth = width;
    rect.displayHeight = height;
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
