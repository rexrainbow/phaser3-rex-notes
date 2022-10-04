## Introduction

Horizontal line progress bar shape.

- Author: Rex
- Game object

## Live demos

- [Line-progress](https://codepen.io/rexrainbow/pen/OJZExrM)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/lineprogress)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlineprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlineprogressplugin.min.js', true);
    ```
- Add line-progress object
    ```javascript
    var lineProgress = scene.add.rexLineProgress(x, y, width, height, barColor, value, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LineProgressPlugin from 'phaser3-rex-plugins/plugins/lineprogress-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLineProgressPlugin',
                plugin: LineProgressPlugin,
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
    var lineProgress = scene.add.rexLineProgress(x, y, width, height, barColor, value, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LineProgress from 'phaser3-rex-plugins/plugins/lineprogress.js';
    ```
- Add line-progress object
    ```javascript
    var lineProgress = new LineProgress(scene, x, y, width, height, barColor, value, config);
    scene.add.existing(image);
    ```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexLineProgressPlugin',
            plugin: LineProgressPlugin,
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
var lineProgress = scene.add.rexLineProgress(x, y, width, height, barColor, value, {    
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
var lineProgress = scene.add.rexLineProgress({
    x: 0,
    y: 0,
    width: 2,
    height: 2,

    barColor: undefined,
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
- `barColor` : Color of line bar, in number or css string value.
- `trackColor` : Color of line track, in number or css string value.
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
var lineProgress = scene.make.rexLineProgress({
    x: 0,
    y: 0,
    width: 2,
    height: 2,

    barColor: undefined,
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
    class MyLineProgress extends LineProgress {
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
    var lineProgress = new MyLineProgress(scene, x, y, width, height, barColor, value, config);
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
        ```
    - Set
        ```javascript
        lineProgress.setBarColor(barColor);
        // lineProgress.barColor = barColor;
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
