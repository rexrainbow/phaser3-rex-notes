## Introduction

Circular progress bar shape.

- Author: Rex
- Game object

## Live demos

- [Circular-progress](https://codepen.io/rexrainbow/pen/ZELGmrE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/circularprogress)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcircularprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcircularprogressplugin.min.js', true);
    ```
- Add circular-progress object
    ```javascript
    var circularProgress = scene.add.rexCircularProgress(x, y, radius, color, value, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CircularProgressPlugin from 'phaser3-rex-plugins/plugins/circularprogress-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCircularProgressPlugin',
                plugin: CircularProgressPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add circular-progress object
    ```javascript
    var circularProgress = scene.add.rexCircularProgress(x, y, radius, color, value, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CircularProgress from 'phaser3-rex-plugins/plugins/circularprogress.js';
    ```
- Add circular-progress object
    ```javascript
    var circularProgress = new CircularProgress(scene, x, y, radius, color, value, config);
    scene.add.existing(image);
    ```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCircularProgressPlugin',
            plugin: CircularProgressPlugin,
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
var circularProgress = scene.add.rexCircularProgress(x, y, radius, barColor, value, {
    barColor: undefined,
    trackColor: undefined,
    centerColor: undefined,
    thickness: 0.2,
    startAngle: Phaser.Math.DegToRad(270),
    anticlockwise: false,

    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    valuechangeCallback: function(newValue, oldValue, circularProgress) {
    },
});
```

or 

```javascript
var circularProgress = scene.add.rexCircularProgress({
    x: 0,
    y: 0,
    radius: 1,

    barColor: undefined,
    trackColor: undefined,
    centerColor: undefined,
    thickness: 0.2,
    startAngle: Phaser.Math.DegToRad(270),
    anticlockwise: false,

    value: 0,
    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    valuechangeCallback: function(newValue, oldValue, circularProgress) {
    },  
});
```

- `x`, `y` : Position of this object.
- `radius` : Radius of this circle. Size will be `(radius*2, radius*2)`.
- `barColor` : Color of circular bar, in number or css string value.
- `trackColor` : Color of circular track, in number or css string value.
- `centerColor` : Color of center circle, in number or css string value.
- `thickness` : `0` ~ `1`, thickness of circular bar. Default value is `0.2` (`0.2*radius`)
- `startAngle` : Start angle of circular bar, in radians. Default value is 270 degrees.
- `anticlockwise` : Set `true` to put anticlockwise circular bar. Default value is `false`.
- `value` : `0` ~ `1`, progress value. Default is `0`.
- `easeValue` : Parameters of easing value.
    - `easeValue.duration` : Duration of value easing, default is `0` (no easing).
    - `easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- `valuechangeCallback` : callback function when value changed.
    ```javascript
    function(newValue, oldValue, circularProgress) {
    }
    ```

Add circular-progress from JSON

```javascript
var circularProgress = scene.make.rexCircularProgress({
    x: 0,
    y: 0,
    radius: 1,

    barColor: undefined,
    trackColor: undefined,
    centerColor: undefined,
    thickness: 0.2,
    startAngle: Phaser.Math.DegToRad(270),
    anticlockwise: false,

    value: 0,
    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    valuechangeCallback: function(newValue, oldValue, circularProgress) {
    },  
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyCircularProgress extends CircularProgress {
        constructor(scene, x, y, radius, color, value, config) {
            super(scene, x, y, radius, color, value, config);
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
    var circularProgress = new MyCircularProgress(scene, x, y, radius, color, value, config);
    ```

### Progress value

- Get value
    ```javascript
    var value = circularProgress.getValue(min, max); // value : min ~ max
    ```
    or
    ```javascript
    var value = circularProgress.getValue(); // value: 0 ~ 1
    ```
    or
    ```javascript
    var value = circularProgress.value; // value: 0 ~ 1
    ```
- Set value
    ```javascript
    circularProgress.setValue(value, min, max); // value: min ~ max
    ```
    or
    ```javascript
    circularProgress.setValue(value); // value: 0 ~ 1
    ```
    or
    ```javascript
    circularProgress.value = value; // value: 0 ~ 1
    ```
- Increase value
    ```javascript
    circularProgress.addValue(inc, min, max); // inc: min ~ max
    ```
    or
    ```javascript
    circularProgress.addValue(inc); // inc: 0 ~ 1
    ```
    or
    ```javascript
    circularProgress.value += inc; // inc: 0 ~ 1
    ```

### Ease progress value

- Ease value to
    ```javascript
    circularProgress.easeValueTo(value, min, max);  // value: min ~ max
    ```
    or
    ```javascript
    circularProgress.easeValueTo(value);  // value: 0 ~ 1
    ```
- Stop ease
    ```javascript
    circularProgress.stopEaseValue();
    ```
- Set ease duration
    ```javascript
    circularProgress.setEaseValueDuration(duration);
    ```
- Set ease function
    ```javascript
    circularProgress.setEaseValueFunction(ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations).

### Radius

- Get
    ```javascript
    var radius = circularProgress.radius;
    ```
- Set
    ```javascript
    circularProgress.setRadius(radius);
    // circularProgress.radius = radius;
    ```
    - Also resize this game object to `(radius*2, radius*2)`

### Circular track

- Color
    - Get
        ```javascript
        var trackColor = circularProgress.trackColor;
        ```
    - Set
        ```javascript
        circularProgress.setTrackColor(trackColor);
        // circularProgress.trackColor = trackColor;
        ```
- Thickness : `radius*thickness`
    ```javascript
    circularProgress.setThickness(thickness);
    ```
    - `thickness` : `0`~`1`.

### Circular bar

- Color
    - Get
        ```javascript
        var barColor = circularProgress.barColor;
        ```
    - Set
        ```javascript
        circularProgress.setBarColor(barColor);
        // circularProgress.barColor = barColor;
        ```
- Thickness : `radius*thickness`
    ```javascript
    circularProgress.setThickness(thickness);
    ```
    - `thickness` : `0`~`1`.
- Start angle
    - Get
        ```javascript
        var startAngle = circularProgress.startAngle;
        ```
    - Set
        ```javascript
        circularProgress.setStartAngle(startAngle);
        circularProgress.startAngle = startAngle;
        ```
        - `startAngle` : Start angle of circular bar, in radians.
- Anticlockwise
    - Get
        ```javascript
        var anticlockwise = circularProgress.anticlockwise;
        ```
    - Set
        ```javascript
        circularProgress.setAnticlockwise(anticlockwise);
        // circularProgress.anticlockwise = anticlockwise;
        ```

### Center circle

- Color
    - Get
        ```javascript
        var centerColor = circularProgress.centerColor;
        ```
    - Set
        ```javascript
        circularProgress.setCenterColor(centerColor);
        // circularProgress.centerColor = centerColor;
        ```

### Events

- On value changed
    ```javascript
    circularProgress.on('valuechange', function(newValue, oldValue, circularProgress){
        //
    }, scope);
    ```

### Alpha

- Get
    ```javascript
    var alpha = circularProgress.alpha;
    ```
- Set
    ```javascript
    circularProgress.setAlpha(alpha);
    // circularProgress.alpha = alpha;
    ```

### Compare with Circular-progress canvas

- [Circular-progress canvas](canvas-circularprogress.md) creates a canvas then draw on that canvas, circular progress shape draw on GRAPHICS pipeline like Shape or Graphics game object.
- [Circular-progress canvas](canvas-circularprogress.md) can draw text directly, circular progress shape can't draw any text.