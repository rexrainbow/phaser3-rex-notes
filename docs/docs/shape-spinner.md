## Introduction

Loading animations on shape.

- Author: Rex
- Game object

## Live demos

- [Spinners](https://codepen.io/rexrainbow/pen/vYgNRMp)
- [Custom spinner](https://codepen.io/rexrainbow/pen/YzNqJEd)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/spinner)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
  ```javascript
  scene.load.scenePlugin(
    "rexspinnerplugin",
    "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexspinnerplugin.min.js",
    "rexSpinner",
    "rexSpinner"
  );
  ```
- Add spinner object
  ```javascript
  var audio = this.rexSpinner.add.audio(config);
  var ball = this.rexSpinner.add.ball(config);
  var bars = this.rexSpinner.add.bars(config);
  var box = this.rexSpinner.add.box(config);
  var clock = this.rexSpinner.add.clock(config);
  var cube = this.rexSpinner.add.cube(config);
  var dots = this.rexSpinner.add.dots(config);
  var facebook = this.rexSpinner.add.facebook(config);
  var grid = this.rexSpinner.add.grid(config);
  var los = this.rexSpinner.add.los(config);
  var orbit = this.rexSpinner.add.orbit(config);
  var oval = this.rexSpinner.add.oval(config);
  var pie = this.rexSpinner.add.pie(config);
  var puff = this.rexSpinner.add.puff(config);
  var radio = this.rexSpinner.add.radio(config);
  var rings = this.rexSpinner.add.rings(config);
  var spinner = this.rexSpinner.add.spinner(config);
  ```

#### Import plugin

- Install rex plugins from npm
  ```
  npm i phaser3-rex-plugins
  ```
- Install plugin in [configuration of game](game.md#configuration)
  ```javascript
  import SpinnerPlugin from "phaser3-rex-plugins/templates/spinner/spinner-plugin.js";
  var config = {
    // ...
    plugins: {
      scene: [
        {
          key: "rexSpinner",
          plugin: SpinnerPlugin,
          mapping: "rexSpinner",
        },
        // ...
      ],
    },
    // ...
  };
  var game = new Phaser.Game(config);
  ```
- Add spinner object
  ```javascript
  var audio = this.rexSpinner.add.audio(config);
  var ball = this.rexSpinner.add.ball(config);
  var bars = this.rexSpinner.add.bars(config);
  var box = this.rexSpinner.add.box(config);
  var clock = this.rexSpinner.add.clock(config);
  var cube = this.rexSpinner.add.cube(config);
  var dots = this.rexSpinner.add.dots(config);
  var facebook = this.rexSpinner.add.facebook(config);
  var grid = this.rexSpinner.add.grid(config);
  var los = this.rexSpinner.add.los(config);
  var orbit = this.rexSpinner.add.orbit(config);
  var oval = this.rexSpinner.add.oval(config);
  var pie = this.rexSpinner.add.pie(config);
  var puff = this.rexSpinner.add.puff(config);
  var radio = this.rexSpinner.add.radio(config);
  var rings = this.rexSpinner.add.rings(config);
  var spinner = this.rexSpinner.add.spinner(config);
  ```

#### Import class

- Install rex plugins from npm
  ```
  npm i phaser3-rex-plugins
  ```
- Import class
  ```javascript
  import { 
    Audio, Ball, Bars, Box, Clock, Cube, Custom, Dots, Facebook, Grid, 
    Los, Orbit, Oval, Puff, Radio, Rings, Spinner
  } from "phaser3-rex-plugins/templates/spinner/spinner-components.js";
  ```
- Add spinner object
  ```javascript
  var spinner = new Audio(scene, config);
  sscene.add.existing(spinner);
  ```

### Add spinner object

```javascript
var spinner = scene.rexSpinner.add.audio({
  // x: 0,
  // y: 0,
  // width: 64,
  // height: 64,
  // color: 0xffffff,

  // duration: 1000,
  // start: true
});
```

- `x`, `y` : Position of this object.
- `width`, `height` : Size of this object.
- `color` : Fill color, or stroke color. Default value is `0xffffff`
- `duration` : Duration of animation.
- `start` : Start animation when object created.
   - `false` : Don't play animation at beginning.

### Play animation

#### Pause

```javascript
spinner.pause();
```

#### Resume

```javascript
spinner.resume();
```

#### Stop

```javascript
spinner.stop();
```

#### Play animation manually

1. Set `start` to `false` in config
1. Set progress manually
    ```javascript
    spinner.setValue(t);
    ```
    or
    ```javascript
    spinner.value = t;
    ```
    - `t` : `0` ~ `1`

### Custom spinner

1. Create custom spinner
    ```javascript
    var customSpinner = this.rexSpinner.add.custom({
        // x: 0,
        // y: 0,
        // width: 64,
        // height: 64,
        // color: 0xffffff,
    
        // duration: 1000,
        // start: true,

        create: {            
            // shapeType: [name0, name1, ...],
            // shapeType: number,
            // shapeType: name,
        },

        // create: function() {
        // 
        // },

        update: function() {

        },
    })
    ```
    - `create` : Callback to create shapes
        - A plain object with `shapeType: name`, or `shapeType: number`
            - `shapeType` : 
                - `'arc'` : Create [Arc shape](shape-spinner.md#arc).
                - `'circle'` : Create [Circle shape](shape-spinner.md#circle).
                - `'ellipse'` : Create [Ellipse shape](shape-spinner.md#ellipse).
                - `'line'` : Create [Line shape](shape-spinner.md#line).
                - `'lines'` : Create [Lines shape](shape-spinner.md#lines).
                - `'rectangle'` : Create [Rectangle shape](shape-spinner.md#rectangle).
                - `'triangle'` : Create [Triangle shape](shape-spinner.md#triangle).
            - `nameArray` : An array of unique string name for each shape.
            - `name` : An unique string name of this shape.
            - `number` : Amount of shapes to create.
        - A callback
            ```javascript
            function() {
                // this : This spinner game object
                var shape = this.createShape(shapeType, name);
                this.addShape(shape);
            }
            ```
            - `this.createShape(shapeType, name)` : Crate a shape instance, with an unique name.
            - `this.addShape(shape)` : Add this shape instance to this custom spinner.
    - `update` : Callback when porgressing
        ```javascript
        function() {
            // this : This spinner game object
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var color = this.color;

            var shapes = this.getShapes();
            var shape = this.getShape(name);

            var t = this.value;
        }
        ```
        - `this.value` : Progress, `0`~`1`.
        - Position : 
            - `this.centerX`, `this.centerY` : Center position of this spinner. The coordinate of top-left point is `(0,0)`
            - `this.radius` : Minimun value of `this.centerX`, `this.centerY`, to draw shape at square.
        - Color :
            - `this.color` : Color property of this spinner.
        - Shape instances : Change properties of shape instances.
            - `this.getShapes()` : Return all shapes in an array.
            - `this.getShape(name)` : Return a shape by the unique string name.

#### Shape class

#### Common properties

- Style
    - Get
        ```javascript
        var fillColor = shape.fillColor;
        var fillAlpha = shape.fillAlpha;
        var lineWidth = shape.lineWidth;
        var strokeColor = shape.strokeColor;
        var strokeAlpha = shape.strokeAlpha;
        ```
    - Set
        ```javascript
        shape.fillStyle(color, alpha);
        shape.lineStyle(lineWidth, color, alpha);
        ```
    - Clear
        ```javascript
        shape.fillStyle().lineStyle();
        ```
- Private data
    - Get
        ```javascript
        var data = shape.getData(key);
        // var data = shape.getData(key, defaultValue);
        ```
    - Set
        ```javascript
        shape.setData(key, value);
        ```
- Name
    - Get
        ```javascript
        var name = shape.name;
        ```

##### Line

- End points
    - Get
        ```javascript
        var x0 = line.x0;
        var y0 = line.y0;
        var x1 = line.x1;
        var y1 = line.y1;
        ```
    - Set
        ```javascript
        line.setP0(x, y);
        line.setP1(x, y);
        ```
        or
        ```javascript
        line.x0 = x0;
        line.y0 = y0;
        line.x1 = x1;
        line.y1 = y1;
        ```

##### Lines

- Start position
    ```javascript
    lines.startAt(x, y);
    ```
- Line to
    - To position
        ```javascript
        lines.lineTo(x, y);
        ```
    - To relative position
        ```javascript
        lines.lineTo(x, y, true);
        ```
    - To vertical position
        ```javascript
        lines.verticalLineTo(x);
        ```
    - To relative vertical position
        ```javascript
        lines.verticalLineTo(x, true);
        ```
    - To horizontal position
        ```javascript
        lines.horizontalLineTo(y);
        ```
    - To relative horizontal position
        ```javascript
        lines.horizontalLineTo(y, true);
        ```
- Add arc composed of lines
    ```javascript
    lines.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
    ```
    - `startAngle`, `endAngle` : Start and end angle in degrees.
- Add elliptical arc composed of lines
    ```javascript
    lines.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);
    ```
    - `startAngle`, `endAngle` : Start and end angle in degrees.
- Close path
    ```javascript
    lines.close();
    ```
- Rotation all points
    ```javascript
    lines.rotateAround(centerX, centerY, angle);
    ```
    - `angle` : Rotate angle in degrees.

##### Rectangle

- Top-left
    - Get
        ```javascript
        var left = rectangle.x;
        var top = rectangle.y;
        ```
    - Set
        ```javascript
        rectangle.setTopLeftPosition(x, y);
        ```
        or
        ```javascript
        rectangle.x = left;
        rectangle.y = top;
        ```
- Size
    - Get
        ```javascript
        var width = rectangle.width;
        var height = rectangle.height;
        ```
    - Set
        ```javascript
        rectangle.setSize(width, height);
        ```
        or
        ```javascript
        rectangle.width = width;
        rectangle.height = height;
        ```

##### Triangle

- Vertices
    - Get
        ```javascript
        var x0 = triangle.x0;
        var y0 = triangle.x0;
        var x1 = triangle.x1;
        var y1 = triangle.x1;
        var x2 = triangle.x2;
        var y2 = triangle.x2;
        ```
    - Set
        ```javascript
        triangle.setP0(x, y);
        triangle.setP1(x, y);
        triangle.setP2(x, y);
        ```
        or
        ```javascript
        triangle.x0 = x0;
        triangle.x0 = y0;
        triangle.x1 = x1;
        triangle.x1 = y1;
        triangle.x2 = x2;
        triangle.x2 = y2;
        ```

##### Arc

- Center position
    - Get
        ```javascript
        var x = arc.x;
        var y = arc.y;
        ```
    - Set
        ```javascript
        arc.setCenterPosition(x, y);
        ```
        or
        ```javascript
        arc.x = x;
        arc.y = y;
        ```
- Radius
    - Get
        ```javascript
        var radiusX = arc.radiusX;
        var radiusY = arc.radiusY;
        ```
    - Set
        ```javascript
        arc.setRadius(radiusX, radiusY);
        // arc.setRadius(radius);
        ```
        or
        ```javascript
        arc.radiusX = radiusX;
        arc.radiusY = radiusY;
        ```
- Angles
    - Get
        ```javascript
        var startAngle = arc.startAngle;
        var endAngle = arc.endAngle;
        var anticlockwise = arc.anticlockwise; // boolean        
        ```
    - Set
        ```javascript
        arc.setAngle(startAngle, endAngle);  // anticlockwise = false
        // arc.setAngle(startAngle, endAngle, anticlockwise);
        ```
        or
        ```javascript
        arc.startAngle = startAngle;
        arc.endAngle = endAngle;
        arc.anticlockwise = anticlockwise; // boolean
        ```
        - `startAngle`, `endAngle` : Start/end angle in degrees.
- Pie
    - Get
        ```javascript
        var pie = arc.pie; // boolean
        ```
    - Set
        ```javascript
        arc.setPie();
        ```
        or
        ```javascript
        arc.pie = true;
        ```

##### Circle

- Center position
    - Get
        ```javascript
        var x = arc.x;
        var y = arc.y;
        ```
    - Set
        ```javascript
        arc.setCenterPosition(x, y);
        ```
        or
        ```javascript
        arc.x = x;
        arc.y = y;
        ```
- Radius
    - Get
        ```javascript
        var radiusX = arc.radiusX;
        var radiusY = arc.radiusY;
        ```
    - Set
        ```javascript
        arc.setRadius(radiusX, radiusY);
        // arc.setRadius(radius);
        ```
        or
        ```javascript
        arc.radiusX = radiusX;
        arc.radiusY = radiusY;
        ```

##### Ellipse

The same as Circle.

