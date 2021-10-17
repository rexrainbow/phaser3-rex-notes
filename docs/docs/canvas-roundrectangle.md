## Introduction

Round rectangle on canvas.

- Author: Rex
- Game object

## Live demos

- [Round rectangle](https://codepen.io/rexrainbow/pen/rNWqaeZ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/roundrectanglecanvas)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexroundrectanglecanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/    phaser3-rex-notes/master/dist/rexroundrectanglecanvasplugin.min.js', true);
    ```
- Add shape object
    ```javascript
    var rect = scene.add.rexRoundRectangleCanvas(x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectanglecanvas-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRoundRectangleCanvasPlugin',
                plugin: RoundRectangleCanvasPlugin,
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
    var rect = scene.add.rexRoundRectangleCanvas(x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas.js';
    ```
- Add shape object
    ```javascript    
    var rect = new RoundRectangleCanvas(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    scene.add.existing(rect);
    ```

### Create shape object

```javascript
var rect = scene.add.rexRoundRectangleCanvas(x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
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
- `fillStyle` : Fill color in number or css string value.
- `strokeStyle` : Stroke color in number or css string value.
- `lineWidth` : Stroke line width.
- `fillColor2` : Gradient color in number or css string value.
- `isHorizontalGradient` :
    - `true` : Horizontal gradient.
    - `false` : Vertical gradient.

#### Deform

- Rectangle, set radius of 4 corners to `0`.
    ```javascript
    var rect = scene.add.rexRoundRectangleCanvas(x, y, width, height, 0, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```
- Circle, set width and height to `2*radius`.
    ```javascript
    var rect = scene.add.rexRoundRectangleCanvas(x, y, (2*radius), (2*radius), radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```
- Ellipse, set width and height to `2*radiusX`, `2*radiusY`.
    ```javascript
    var rect = scene.add.rexRoundRectangleCanvas(x, y, (2*radiusX), (2*radiusX), {x: radiusX, y: radiusY}, fillColor, fillAlpha);
    ```
- Rhombus, set width and height to `2*radius`, and assign iteration to `0`
    ```javascript
    var rect = scene.add.rexRoundRectangleCanvas(x, y, (2*radius), (2*radius), {
        radius: radius,
        iteration: 0
    }, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```
- Octagon, assign iteration to `0`
    ```javascript
    var rect = scene.add.rexRoundRectangleCanvas(x, y, width, height, {
        radius: radius,
        iteration: 0
    }, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```

### Custom class

- Define class
    ```javascript
    class MyRoundRectangleCanvas extends RexPlugins.GameObjects.RoundRectangleCanvas {
        constructor(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
            super(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
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
    var rect = new MyRoundRectangleCanvas(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var fillStyle = rect.fillStyle;
        var fillColor2 = rect.fillColor2;
        var isHorizontalGradient = rect.isHorizontalGradient;
        ```
    - Set
        ```javascript
        rect.setFillStyle(fillStyle);
        // rect.setFillStyle(fillStyle, fillColor2, isHorizontalGradient);
        ```
    - Clear
        ```javascript
        rect.setFillStyle();
        ```
- Stroke color
    - Get
        ```javascript
        var strokeStyle = rect.strokeStyle;
        var lineWidth = rect.lineWidth;
        ```
    - Set
        ```javascript
        rect.setStrokeStyle(strokeStyle, lineWidth);
        ```
    - Clear
        ```javascript
        rect.setStrokeStyle();
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

### Radius

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

### Compare with [Shape-Roundrectangle](shape-roundrectangle.md)

- Gradient
    - Canvas-RoundRectangle can fill with gradient color.
    - Shape-Roundrectangle does not have radient color.
- Drawing method
    - Canvas-RoundRectangle draw shape on canvas, then map this canvas to frame buffer.
    - Shape-Roundrectangle draw shape on frame buffer directly without drawing to canvas first.