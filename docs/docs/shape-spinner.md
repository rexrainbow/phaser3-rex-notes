## Introduction

Loading animations on shape.

- Author: Rex
- Game object

## Live demos

- [Spinners](https://codepen.io/rexrainbow/pen/vYgNRMp)
    - [Arrow](https://codepen.io/rexrainbow/pen/gOJmKZy)
    - [AIO](https://codepen.io/rexrainbow/pen/abrVgEd)
- Custom spinner
    - [Custom spinner](https://codepen.io/rexrainbow/pen/YzNqJEd)
    - [Snake](https://codepen.io/rexrainbow/pen/PwZjmmQ)
    - [Hourglass](https://codepen.io/rexrainbow/pen/WbrOevK)
    - [Explode blob](https://codepen.io/rexrainbow/pen/KwVqWrR)    
- [Loading animation](https://codepen.io/rexrainbow/pen/OJdMzbL)

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
  var aio = scene.rexSpinner.add.aio(config);
  var arrow = scene.rexSpinner.add.arrow(config);
  var downArrow = scene.rexSpinner.add.downArrow(config);
  var leftArrow = scene.rexSpinner.add.leftArrow(config);
  var rightArrow = scene.rexSpinner.add.rightArrow(config);
  var upArrow = scene.rexSpinner.add.upArrow(config);
  var audio = scene.rexSpinner.add.audio(config);
  var ball = scene.rexSpinner.add.ball(config);
  var bars = scene.rexSpinner.add.bars(config);
  var box = scene.rexSpinner.add.box(config);
  var clock = scene.rexSpinner.add.clock(config);
  var cube = scene.rexSpinner.add.cube(config);
  var dots = scene.rexSpinner.add.dots(config);
  var facebook = scene.rexSpinner.add.facebook(config);
  var grid = scene.rexSpinner.add.grid(config);
  var hearts = scene.rexSpinner.add.hearts(config);
  var ios = scene.rexSpinner.add.ios(config);
  var orbit = scene.rexSpinner.add.orbit(config);
  var oval = scene.rexSpinner.add.oval(config);
  var pie = scene.rexSpinner.add.pie(config);
  var puff = scene.rexSpinner.add.puff(config);
  var radio = scene.rexSpinner.add.radio(config);
  var rings = scene.rexSpinner.add.rings(config);
  var spinner = scene.rexSpinner.add.spinner(config);

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
  var aio = scene.rexSpinner.add.aio(config);
  var arrow = scene.rexSpinner.add.arrow(config);
  var downArrow = scene.rexSpinner.add.downArrow(config);
  var leftArrow = scene.rexSpinner.add.leftArrow(config);
  var rightArrow = scene.rexSpinner.add.rightArrow(config);
  var upArrow = scene.rexSpinner.add.upArrow(config);  
  var audio = scene.rexSpinner.add.audio(config);
  var ball = scene.rexSpinner.add.ball(config);
  var bars = scene.rexSpinner.add.bars(config);
  var box = scene.rexSpinner.add.box(config);
  var clock = scene.rexSpinner.add.clock(config);
  var cube = scene.rexSpinner.add.cube(config);
  var dots = scene.rexSpinner.add.dots(config);
  var facebook = scene.rexSpinner.add.facebook(config);
  var grid = scene.rexSpinner.add.grid(config);
  var hearts = scene.rexSpinner.add.hearts(config);
  var ios = scene.rexSpinner.add.ios(config);
  var orbit = scene.rexSpinner.add.orbit(config);
  var oval = scene.rexSpinner.add.oval(config);
  var pie = scene.rexSpinner.add.pie(config);
  var puff = scene.rexSpinner.add.puff(config);
  var radio = scene.rexSpinner.add.radio(config);
  var rings = scene.rexSpinner.add.rings(config);
  var spinner = scene.rexSpinner.add.spinner(config);    
  ```

#### Import class

- Install rex plugins from npm
  ```
  npm i phaser3-rex-plugins
  ```
- Import class
  ```javascript
  import { 
    AIO, Arrow, Audio, Ball, Bars, Box, Clock, Cube, Custom, Dots, 
    Facebook, Grid, Hearts, Ios, Orbit, Oval, Puff, Radio, Rings, Spinner
  } from "phaser3-rex-plugins/templates/spinner/spinner-components.js";
  ```
- Add spinner object
  ```javascript
  var spinner = new Audio(scene, config);
  scene.add.existing(spinner);
  ```

### Add spinner object

#### General

```javascript
var spinner = scene.rexSpinner.add.audio({
  // x: 0,
  // y: 0,
  // width: 64,
  // height: 64,
  // color: 0xffffff,

  // duration: 1000,
  // start: true,
  // delay: 0,
  // repeatDelay: 0,
});
```

- `x`, `y` : Position of this object.
- `width`, `height` : Size of this object.
- `color` : Fill color, or stroke color. Default value is `0xffffff`
- `duration` : Duration of animation.
- `start` : Start animation when object created.
   - `false` : Don't play animation at beginning.
- `delay` : Delay time in ms before running.
- `repeatDelay` : Delay time between 2 periods.

#### Arrow

```javascript
var spinner = scene.rexSpinner.add.audio({
  // ...
  // direction: 'down'
});
```

- `direction` :
    - `0`, `'right'` : Arrow from left to right.
    - `1`, `'down'` : Arrow from up to down. Default behavior.
    - `2`, `'left'` : Arrow from right to left.
    - `3`, `'up'` : Arrow from down to up.

#### AIO

All-in-one

```javascript
var spinner = scene.rexSpinner.add.aio({
  // ...
  // animationMode: undefined
});
``` 

- `animationMode` :
    - `undefined` : Play random spinner animation.
    - `'leftArrow' ` : Play *leftArrow* spinner animation.
    - `'rightArrow'` : Play *rightArrow* spinner animation.
    - `'upArrow'` : Play *upArrow* spinner animation.
    - `'downArrow'` : Play *dowbArrow* spinner animation.
    - `'audio'` : Play *audio* spinner animation.
    - `'ball'` : Play *ball* spinner animation. 
    - `'bars'` : Play *bars* spinner animation. 
    - `'box'` : Play *box* spinner animation.
    - `'clock'` : Play *clock* spinner animation.
    - `'cube'` : Play *cube* spinner animation.
    - `'dots'` : Play *dots* spinner animation.
    - `'facebook'` : Play *facebook* spinner animation.
    - `'grid'` : Play *grid* spinner animation.
    - `'hearts'` : Play *hearts* spinner animation.
    - `'ios'` : Play *ios* spinner animation.
    - `'oribit'` : Play *oribit* spinner animation. 
    - `'oval'` : Play *oval* spinner animation.
    - `'pie'` : Play *pie* spinner animation.
    - `'puff'` : Play *puff* spinner animation.
    - `'radio'` : Play *radio* spinner animation.
    - `'rings'` : Play *rings* spinner animation.
    - `'spinner'` : Play *spinner* spinner animation.

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

### Set animation mode

[AIO-spinner](#aio) only

```javascript
aioSpinner.setAnimationMode(mode);
```

- `mode` : 
    - `undefined` : Play random spinner animation.
    - `'leftArrow' ` : Play *leftArrow* spinner animation.
    - `'rightArrow'` : Play *rightArrow* spinner animation.
    - `'upArrow'` : Play *upArrow* spinner animation.
    - `'downArrow'` : Play *dowbArrow* spinner animation.
    - `'audio'` : Play *audio* spinner animation.
    - `'ball'` : Play *ball* spinner animation. 
    - `'bars'` : Play *bars* spinner animation. 
    - `'box'` : Play *box* spinner animation.
    - `'clock'` : Play *clock* spinner animation.
    - `'cube'` : Play *cube* spinner animation.
    - `'dots'` : Play *dots* spinner animation.
    - `'facebook'` : Play *facebook* spinner animation.
    - `'grid'` : Play *grid* spinner animation.
    - `'hearts'` : Play *hearts* spinner animation.
    - `'ios'` : Play *ios* spinner animation.
    - `'oribit'` : Play *oribit* spinner animation. 
    - `'oval'` : Play *oval* spinner animation.
    - `'pie'` : Play *pie* spinner animation.
    - `'puff'` : Play *puff* spinner animation.
    - `'radio'` : Play *radio* spinner animation.
    - `'rings'` : Play *rings* spinner animation.
    - `'spinner'` : Play *spinner* spinner animation.

```javascript
aioSpinner.setRandomAnimationMode();
```

### Custom spinner

```javascript
var customSpinner = scene.rexSpinner.add.custom({
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
            - `'arc'` : Create [Arc shape](shape-custom-shapes.md#arc).
            - `'circle'` : Create [Circle shape](shape-custom-shapes.md#circle).
            - `'ellipse'` : Create [Ellipse shape](shape-custom-shapes.md#ellipse).
            - `'line'` : Create [Line shape](shape-custom-shapes.md#line).
            - `'lines'` : Create [Lines shape](shape-custom-shapes.md#lines).
            - `'rectangle'` : Create [Rectangle shape](shape-custom-shapes.md#rectangle).
            - `'roundRectangle'` : Create [Round rectangle shape](shape-custom-shapes.md#round-rectangle).
            - `'triangle'` : Create [Triangle shape](shape-custom-shapes.md#triangle).
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

### Prompt

[Prompt for generating customize logic](prompts/shape-spinner-custom.txt)
[Demo](https://chatgpt.com/share/68e92b21-f668-800f-8865-2b376ff86223)

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = customSpinner.createGeometryMask();
```

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
