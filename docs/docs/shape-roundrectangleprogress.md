## Introduction

Horizontal or vertical round rectangle progress bar shape.

- Author: Rex
- Game object

## Live demos

- [RoundRectangle-progress](https://codepen.io/rexrainbow/pen/vYoGGXq)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/roundrectangleprogress)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexroundrectangleprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleprogressplugin.min.js', true);
    ```
- Add roundrectangle-progress object
    ```javascript
    var roundRectangleProgress = scene.add.rexRoundRectangleProgress(x, y, width, height, radius, barColor, value, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RoundRectangleProgressPlugin from 'phaser3-rex-plugins/plugins/roundrectangleprogress-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRoundRectangleProgressPlugin',
                plugin: RoundRectangleProgressPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add roundrectangle-progress object
    ```javascript
    var roundRectangleProgress = scene.add.rexRoundRectangleProgress(x, y, width, height, radius, barColor, value, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RoundRectangleProgress from 'phaser3-rex-plugins/plugins/roundrectangleprogress.js';
    ```
- Add roundrectangle-progress object
    ```javascript
    var roundRectangleProgress = new RoundRectangleProgress(scene, x, y, width, height, radius, barColor, value, config);
    scene.add.existing(roundRectangleProgress);
    ```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexRoundRectangleProgressPlugin',
            plugin: RoundRectangleProgressPlugin,
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
var roundRectangleProgress = scene.add.rexRoundRectangleProgress(x, y, width, height, radius, barColor, value, {    
    trackColor: undefined,
    trackStrokeColor: undefined,
    trackStrokeThickness: 2,
    
    rtl: false,
    orientation: 0,

    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    valuechangeCallback: function(newValue, oldValue, roundRectangleProgress) {
    },
});
```

or 

```javascript
var roundRectangleProgress = scene.add.rexRoundRectangleProgress({
    x: 0,
    y: 0,
    width: 2,
    height: 2,
    radius: 0,

    barColor: undefined,
    trackColor: undefined,
    trackStrokeColor: undefined,
    trackStrokeThickness: 2,

    rtl: false,
    orientation: 0,

    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    value: 0,
    valuechangeCallback: function(newValue, oldValue, roundRectangleProgress) {
    },
});
```

- `x`, `y` : Position of this object.
- `width`, `height` : Size of this object.
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
            - `radius` : 
                - `0`  : No round corner
                - `> 0` : Convex round corner
                - `< 0` : Concave round corner
            - `iteration` : Number of interpolation points in each round corner. Default value is `4`.
                - `0` : Draw a straight line instead of arc.
- `barColor` : Fill color of line bar, in number or css string value.
- `trackColor` : Fill color of line track, in number or css string value.
- `trackStrokeColor` : Stroke color of track, in number or css string value.
- `trackStrokeThickness` : Stroke line width of track.
- `orientation` : Orientation of the bar.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right. Default value is `0`.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom.
- `rtl` : 
    - `false` : Bar starts from left side. Default behavior.
    - `true` : Bar starts from right side.
- `value` : `0` ~ `1`, progress value. Default is `0`.
- `easeValue` : Parameters of easing value.
    - `easeValue.duration` : Duration of value easing, default is `0` (no easing).
    - `easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- `valuechangeCallback` : callback function when value changed.
    ```javascript
    function(newValue, oldValue, roundRectangleProgress) {
    }
    ```

Add roundrectangle-progress from JSON

```javascript
var roundRectangleProgress = scene.make.rexRoundRectangleProgress({
    x: 0,
    y: 0,
    width: 2,
    height: 2,
    radius: 0,

    barColor: undefined,
    trackColor: undefined,
    trackStrokeColor: undefined,
    trackStrokeThickness: 2,

    rtl: false,
    orientation: 0,

    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    value: 0,
    valuechangeCallback: function(newValue, oldValue, roundRectangleProgress) {
    },
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyRoundRectangleProgress extends RoundRectangleProgress {
        constructor(scene, x, y, width, height, radius, barColor, value, config) {
            super(scene, x, y, width, height, radius, barColor, value, config);
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
    var roundRectangleProgress = new MyRoundRectangleProgress(scene, x, y, width, height, radius, barColor, value, config);
    ```

### Progress value

- Get value
    ```javascript
    var value = roundRectangleProgress.getValue(min, max); // value : min ~ max
    ```
    or
    ```javascript
    var value = roundRectangleProgress.getValue(); // value: 0 ~ 1
    ```
    or
    ```javascript
    var value = roundRectangleProgress.value; // value: 0 ~ 1
    ```
- Set value
    ```javascript
    roundRectangleProgress.setValue(value, min, max); // value: min ~ max
    ```
    or
    ```javascript
    roundRectangleProgress.setValue(value); // value: 0 ~ 1
    ```
    or
    ```javascript
    roundRectangleProgress.value = value; // value: 0 ~ 1
    ```
- Increase value
    ```javascript
    roundRectangleProgress.addValue(inc, min, max); // inc: min ~ max
    ```
    or
    ```javascript
    roundRectangleProgress.addValue(inc); // inc: 0 ~ 1
    ```
    or
    ```javascript
    roundRectangleProgress.value += inc; // inc: 0 ~ 1
    ```

### Ease progress value

- Ease value to
    ```javascript
    roundRectangleProgress.easeValueTo(value, min, max);  // value: min ~ max
    ```
    or
    ```javascript
    roundRectangleProgress.easeValueTo(value);  // value: 0 ~ 1
    ```
- Stop ease
    ```javascript
    roundRectangleProgress.stopEaseValue();
    ```
- Set ease duration
    ```javascript
    roundRectangleProgress.setEaseValueDuration(duration);
    ```
- Set ease function
    ```javascript
    roundRectangleProgress.setEaseValueFunction(ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations).

### Track

- Color
    - Get
        ```javascript
        var trackColor = roundRectangleProgress.trackColor;
        ```
    - Set
        ```javascript
        roundRectangleProgress.setTrackColor(trackColor);
        // roundRectangleProgress.trackColor = trackColor;
        ```
- Stroke
    - Get
        ```javascript
        var trackStrokeColor = roundRectangleProgress.trackStrokeColor;
        var trackStrokeThickness = roundRectangleProgress.trackStrokeThickness;
        ```
    - Set
        ```javascript
        roundRectangleProgress.setTrackColor(color);
        roundRectangleProgress.setTrackStroke(lineWidth, color);
        ``` 

### Bar

- Color
    - Get
        ```javascript
        var barColor = roundRectangleProgress.barColor;
        ```
    - Set
        ```javascript
        roundRectangleProgress.setBarColor(barColor);
        // roundRectangleProgress.barColor = barColor;
        ```

### Orientation

- Get
    ```javascript
    var orientation = roundRectangleProgress.orientation;
    ```
    - `orientation` :
        - `0` : Horizontal
        - `1` : Vertical
- Set
    ```javascript
    roundRectangleProgress.setOrientation(orientation);
    // roundRectangleProgress.orientation = orientation;
    ```
    - `orientation` : Orientation of the bar.
        - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right.
        - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom.

### Right-to-left

Right-to-left, or bottom-to-top

- Get
    ```javascript
    var rtl = roundRectangleProgress.rtl;
    ```
- Set
    ```javascript
    roundRectangleProgress.setRTL(rtl);
    // roundRectangleProgress.rtl = rtl;
    ```

### Events

- On value changed
    ```javascript
    roundRectangleProgress.on('valuechange', function(newValue, oldValue, roundRectangleProgress){
        //
    }, scope);
    ```

### Alpha

- Get
    ```javascript
    var alpha = roundRectangleProgress.alpha;
    ```
- Set
    ```javascript
    roundRectangleProgress.setAlpha(alpha);
    // roundRectangleProgress.alpha = alpha;
    ```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = roundRectangleProgress.createGeometryMask();
```

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
