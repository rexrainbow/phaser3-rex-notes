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
  scene.add.existing(spinner);
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

#### Start

- Start playing, won't restart when playing
    ```javascript
    spinner.start();
    ```
- Restart with new duration
    ```javascript
    spinner.start(duration);
    ```

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

#### Is running

```javascript
var isRunning = spinner.isRunning;
```

### Color

- Get
    ```javascript
    var color = spinner.color;
    ```
- Set
    ```javascript
    spinner.setColor(color);
    ```
    or
    ```javascript
    spinner.color = color;
    ```
    - `color` : Fill color, or stroke color, in number.

### Alpha

- Get
    ```javascript
    var alpha = spinner.alpha;
    ```
- Set
    ```javascript
    spinner.setAlpha(alpha);
    // spinner.alpha = alpha;
    ```

### Duration

- Get
    ```javascript
    var duration = spinner.duration;
    ```
- Set, will apply to next animation playing.
    ```javascript
    spinner.setDuration(duration);
    ```
    or
    ```javascript
    spinner.duration = duration;
    ```

### Ease

- Get
    ```javascript
    var ease = spinner.ease;
    ```
- Set, will apply to next animation playing.
    ```javascript
    spinner.setEasen(ease);
    ```
    or
    ```javascript
    spinner.ease = ease;
    ```

### Custom spinner

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
        // ...
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

See [Shape class](shape-custom-shapes.md#shape-class)