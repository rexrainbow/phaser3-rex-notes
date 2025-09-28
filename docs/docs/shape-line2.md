## Introduction

A line shape, composed of 4 points

- Author: Rex
- Game object

## Live demos

- [Line type](https://codepen.io/rexrainbow/pen/MWNRqWE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/lineshape)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlineshapelugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlineshapelugin.min.js', true);
    ```
- Add line object
    ```javascript
    var line = scene.add.rexLineShape(points, lineWidth, color, alpha, lineType);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LineShapePlugin from 'phaser3-rex-plugins/plugins/line-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLineShapePlugin',
                plugin: LineShapePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(points, lineWidth, color, alpha, lineType);
    ```
- Add line object
    ```javascript
    var line = scene.add.rexLineShape(points, lineWidth, color, alpha, lineType);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LineShape from 'phaser3-rex-plugins/plugins/lineshape.js';
    ```
- Add line object
    ```javascript
    var line = new LineShape(points, lineWidth, color, alpha, lineType);
    scene.add.existing(line);
    ```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexLineShapePlugin',
            plugin: LineShapePlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var line = scene.add.rexLineShape(points, lineWidth, color, alpha, lineType);
```

or 

```javascript
var line = scene.add.rexLineShape({
    points: [],
    lineWidth: 2,
    color: 0xffffff,
    alpha: 1,
    lineType: 0,
    pointRadius: 10
});
```

- `lineType` :
    - `0` or `'bezier'` : Bezier line type, default type.
    - `1` or `'spline'` : Spline line type.
    - `2` or `'polyline'`, `'poly'` : Polygon line type.
    - `3` or `'straightline'`, `'straight'` : Straight line type.
- `points` : An array with 4 `{x,y}` elements
    - Straight line type will use 1st and last `{x, y}` elements
- `lineWidth` : Line width.
- `color` : Stroke color.
- `alpha` : Stroke alpha.
- `pointRadius` : Radius of the point used in [interaction detection](#input-event), default value is `10`.


### Custom class

- Define class
    ```javascript
    class MyLineShape extends LineShape {
        constructor(scene, points, lineWidth, color, alpha, lineType) {
            super(scene, points, lineWidth, color, alpha, lineType);
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
    var line = new MyLineShape(scene, points, lineWidth, color, alpha, lineType);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = line.fillColor;
        var alpha = line.fillAlpha;
        ```
    - Set
        ```javascript
        line.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        line.setFillStyle();
        ```
- Stroke color
    - Get
        ```javascript
        var color = line.strokeColor;
        ```
    - Set
        ```javascript
        line.setStrokeStyle(lineWidth, color, alpha);
        ```
    - Clear
        ```javascript
        line.setStrokeStyle();
        ```

!!! warning "No tint methods"
    Uses `line.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = line.alpha;
    ```
- Set
    ```javascript
    line.setAlpha(alpha);
    // line.alpha = alpha;
    ```

### Points

- Get
    ```javascript
    var points = line.points;
    ```
- Set
    ```javascript
    line.setLine(points, lineType);
    ```
    - `lineType` :
        - `0` or `'bezier'` : Bezier line type, default type.
        - `1` or `'spline'` : Spline line type.
        - `2` or `'polyline'`, `'poly'` : Polygon line type.
        - `3` or `'straightline'`, `'straight'` : Straight line type.
    - `points` : An array with 4 `{x,y}` elements
        - Straight line type will use 1st and last `{x, y}` elements

### Line type

- Get
    ```javascript
    var lineType = line.lineType;
    ```
- Set
    ```javascript
    line.setLineType(lineType);
    ```
    - `lineType` :
        - `0` or `'bezier'` : Bezier line type, default type.
        - `1` or `'spline'` : Spline line type.
        - `2` or `'polyline'`, `'poly'` : Polygon line type.
        - `3` or `'straightline'`, `'straight'` : Straight line type.

### Input event

```javascript
line
  .setInteractive()
  .on('pointerover', function () {
  })
  .on('pointerout', function () {
  })
```

Set point radius

```javascript
line.setPointRadius(radius);
```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = line.createGeometryMask();
```

See [mask](mask.md)

### Shader effects

Support [postFX effects](shader-builtin.md)

!!! note
    No preFX effect support
