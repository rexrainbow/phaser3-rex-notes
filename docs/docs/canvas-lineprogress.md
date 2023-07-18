## Introduction

Horizontal line progress bar filled with gradient color on canvas.

- Author: Rex
- Game object

## Live demos

- [Line-progress](https://codepen.io/rexrainbow/pen/LYmgvrE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/lineprogresscanvas)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlineprogresscanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlineprogresscanvasplugin.min.js', true);
    ```
- Add line-progress object
    ```javascript
    var lineProgress = scene.add.rexLineProgressCanvas(x, y, width, height, barColor, value, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LineProgressCanvasPlugin from 'phaser3-rex-plugins/plugins/lineprogresscanvas-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLineProgressCanvasPlugin',
                plugin: LineProgressCanvasPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add line-progress object
    ```javascript
    var lineProgress = scene.add.rexLineProgressCanvas(x, y, width, height, barColor, value, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LineProgressCanvas from 'phaser3-rex-plugins/plugins/lineprogresscanvas.js';
    ```
- Add line-progress object
    ```javascript
    var lineProgress = new LineProgressCanvas(scene, x, y, width, height, barColor, value, config);
    scene.add.existing(image);
    ```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexLineProgressCanvasPlugin',
            plugin: LineProgressCanvasPlugin,
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
var lineProgress = scene.add.rexLineProgressCanvas(x, y, width, height, barColor, value, {    
    barColor2: undefined,
    isHorizontalGradient: true,
    trackColor: undefined,
    trackStrokeColor: undefined,
    trackStrokeThickness: 2,

    skewX:0,
    rtl: false,

    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    valuechangeCallback: function(newValue, oldValue, lineProgress) {
    },
});
```

or 

```javascript
var lineProgress = scene.add.rexLineProgressCanvas({
    x: 0,
    y: 0,
    width: 2,
    height: 2,

    barColor: undefined,
    barColor2: undefined,
    isHorizontalGradient: true,
    trackColor: undefined,
    trackStrokeColor: undefined,
    trackStrokeThickness: 2,

    skewX:0,
    rtl: false,

    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    value: 0,
    valuechangeCallback: function(newValue, oldValue, lineProgress) {
    },
});
```

- `x`, `y` : Position of this object.
- `width`, `height` : Size of this object.
- `barColor`, `barColor2`, `isHorizontalGradient` : Fill color of line bar, in number or css string value. Assign gradient start color by `barColor2`.
- `trackColor` : Fill color of line track, in number or css string value.
- `trackStrokeColor` : Stroke color of track, in number or css string value.
- `trackStrokeThickness` : Stroke line width of track.
- `skewX` : Horizontal skew of track and bar.
- `rtl` : 
    - `false` : Bar starts from left side. Default behavior.
    - `true` : Bar starts from right side.
- `value` : `0` ~ `1`, progress value. Default is `0`.
- `easeValue` : Parameters of easing value.
    - `easeValue.duration` : Duration of value easing, default is `0` (no easing).
    - `easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- `valuechangeCallback` : callback function when value changed.
    ```javascript
    function(newValue, oldValue, lineProgress) {
    }
    ```

Add line-progress from JSON

```javascript
var lineProgress = scene.make.rexLineProgressCanvas({
    x: 0,
    y: 0,
    width: 2,
    height: 2,

    barColor: undefined,
    barColor2: undefined,
    isHorizontalGradient: true,
    trackColor: undefined,
    trackStrokeColor: undefined,
    trackStrokeThickness: 2,

    skewX:0,
    rtl: false,

    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    value: 0,
    valuechangeCallback: function(newValue, oldValue, lineProgress) {
    },
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyLineProgressCanvas extends LineProgressCanvas {
        constructor(scene, x, y, width, height, barColor, value, config) {
            super(scene, x, y, width, height, barColor, value, config);
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
    var lineProgress = new MyLineProgressCanvas(scene, x, y, width, height, barColor, value, config);
    ```

### Progress value

- Get value
    ```javascript
    var value = lineProgress.getValue(min, max); // value : min ~ max
    ```
    or
    ```javascript
    var value = lineProgress.getValue(); // value: 0 ~ 1
    ```
    or
    ```javascript
    var value = lineProgress.value; // value: 0 ~ 1
    ```
- Set value
    ```javascript
    lineProgress.setValue(value, min, max); // value: min ~ max
    ```
    or
    ```javascript
    lineProgress.setValue(value); // value: 0 ~ 1
    ```
    or
    ```javascript
    lineProgress.value = value; // value: 0 ~ 1
    ```
- Increase value
    ```javascript
    lineProgress.addValue(inc, min, max); // inc: min ~ max
    ```
    or
    ```javascript
    lineProgress.addValue(inc); // inc: 0 ~ 1
    ```
    or
    ```javascript
    lineProgress.value += inc; // inc: 0 ~ 1
    ```

### Ease progress value

- Ease value to
    ```javascript
    lineProgress.easeValueTo(value, min, max);  // value: min ~ max
    ```
    or
    ```javascript
    lineProgress.easeValueTo(value);  // value: 0 ~ 1
    ```
- Stop ease
    ```javascript
    lineProgress.stopEaseValue();
    ```
- Set ease duration
    ```javascript
    lineProgress.setEaseValueDuration(duration);
    ```
- Set ease function
    ```javascript
    lineProgress.setEaseValueFunction(ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations).

### Line track

- Color
    - Get
        ```javascript
        var trackColor = lineProgress.trackColor;
        ```
    - Set
        ```javascript
        lineProgress.setTrackColor(trackColor);
        // lineProgress.trackColor = trackColor;
        ```
- Stroke
    - Get
        ```javascript
        var trackStrokeColor = lineProgress.trackStrokeColor;
        var trackStrokeThickness = lineProgress.trackStrokeThickness;
        ```
    - Set
        ```javascript
        lineProgress.setTrackColor(color);
        lineProgress.setTrackStroke(lineWidth, color);
        ``` 

### Line bar

- Color
    - Get
        ```javascript
        var barColor = lineProgress.barColor;
        var barColor2 = lineProgress.barColor2;
        ```
    - Set
        ```javascript
        lineProgress.setBarColor(barColor, barColor2);
        // lineProgress.barColor = barColor;
        // lineProgress.barColor2 = barColor2;
        ```

### Horizontal skew

- Get
    ```javascript
    var skewX = lineProgress.skewX;
    ```
- Set
    ```javascript
    lineProgress.setSkewX(skewX);
    // lineProgress.skewX = skewX;
    ```

### Right-to-left

- Get
    ```javascript
    var rtl = lineProgress.rtl;
    ```
- Set
    ```javascript
    lineProgress.setRTL(rtl);
    // lineProgress.rtl = rtl;
    ```

### Events

- On value changed
    ```javascript
    lineProgress.on('valuechange', function(newValue, oldValue, lineProgress){
        //
    }, scope);
    ```

### Alpha

- Get
    ```javascript
    var alpha = lineProgress.alpha;
    ```
- Set
    ```javascript
    lineProgress.setAlpha(alpha);
    // lineProgress.alpha = alpha;
    ```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = lineProgress.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Support [preFX and postFX effects](shader-builtin.md)

### Compare with Line-progress shape

- Line-progress canvas creates a canvas then draw on that canvas, [line progress shape](shape-lineprogress.md) draw on GRAPHICS pipeline like Shape or Graphics game object.
- Line-progress canvas can fill gradient color, [line progress shape](shape-lineprogress.md) only can fill 1 color.