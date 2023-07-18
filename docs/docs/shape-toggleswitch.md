## Introduction

Toggle-switch [input](button.md).

- Author: Rex
- Game object

## Live demos

- [Toggle-switch](https://codepen.io/rexrainbow/pen/KKBVNEj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/toggleswitch)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextoggleswitchplugin', 'https://raw.githubusercontent.com/rexrainbow/    phaser3-rex-notes/master/dist/rextoggleswitchplugin.min.js', true);
    ```
- Add toggle-switch input
    ```javascript
    var toggleSwitch = scene.add.rexToggleSwitch(x, y, width, height, color, config);
    ```
- Add toggle-switch shape (without [click input](button.md))
    ```javascript
    var toggleSwitch = scene.add.rexToggleSwitchShape(x, y, width, height, color, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ToggleSwitchPlugin from 'phaser3-rex-plugins/plugins/toggleswitch-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexToggleSwitchPlugin',
                plugin: ToggleSwitchPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add toggle-switch input
    ```javascript
    var toggleSwitch = scene.add.rexToggleSwitch(x, y, width, height, color, config);
    ```
- Add toggle-switch shape (without [click input](button.md))
    ```javascript
    var toggleSwitch = scene.add.rexToggleSwitchShape(x, y, width, height, color, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ToggleSwitch from 'phaser3-rex-plugins/plugins/toggleswitch.js';
    ```
- Add toggle-switch input
    ```javascript    
    var toggleswitch = new ToggleSwitch(scene, x, y, width, height, color, config);
    scene.add.existing(toggleSwitch);
    ```
- Add toggle-switch shape (without [click input](button.md))
    ```javascript
    // import ToggleSwitchShape from 'phaser3-rex-plugins/plugins/toggleswitchshape.js';
    var toggleSwitch = new ToggleSwitchShape(scene, x, y, width, height, color, config);
    scene.add.existing(toggleSwitch);
    ```

### Create toggle-switch input

```javascript
var toggleSwitch = scene.add.rexToggleSwitch(x, y, width, height, color, config);
```

or

```javascript
var toggleSwitch = scene.add.rexToggleSwitch({
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

    color: 0x005cb2,
    trackFillAlpha: 1,
    falseValueTrackColor: undefined,
    falseValueTrackFillAlpha: 1,

    thumbColor: 0xffffff,
    thumbAlpha: 1,

    trackWidth: 0.9,
    trackHeight: 0.5,
    trackCornerRadius: (trackHeight * 0.5),

    thumbHeight: (trackHeight * 0.9),
    thumbWidth: (thumbHeight),
    thumbCornerRadius: (thumbHeight * 0.5),

    thumbLeft: 0.3,
    thumbRight: (1 - thumbLeft),
    rtl: false,

    animationDuration: 150,

    value: false,

    click: undefined,
    // click: {
    //     mode: 1,            // 0|'press'|1|'release'
    //     clickInterval: 100  // ms
    //     threshold: undefined
    // },
    readOnly: false,
});
```

- `width`, `height` : Size of toggleswitch.
- Track fill style
    - `color`, `trackFillAlpha` : Track color and alpha when value is `true`.
    - `falseValueTrackColor`, `falseValueTrackFillAlpha` : Track color and alpha when value is `false`.
        - Default value of `falseValueTrackColor` is the grayscale of `color`.    
- Thumb fill style
    - `thumbColor`, `thumbAlpha` : Thumb color and alpha
- Track size
    - `trackWidth` : Width ration of track. Default value is `0.9`.
    - `thumbWidth` : Height ratio of track. Default value is `0.5`.
    - `trackCornerRadius` : Ratio of track corner. Default value is half of `trackHeight`.
- Thumb size
    - `thumbWidth` : Width ration of thumb. Default value is equal to `thumbHeight`.
    - `thumbHeight` : Height ratio of thumb. Default value `trackHeight * 0.5`.
    - `thumbCornerRadius` : Ratio of thumb corner. Default value is half of `thumbHeight`.
- Thumb position
    - `thumbLeft` : Thumb position if value is `false`. Default value is `0.3`.
    - `thumbRight` : Thumb position if value is `true`. Default value is `1 - thumbLeft`.
    - `rtl` : Moving direction of thumb when when value changes from `false` to `true`.
        - `false` : Thumb moves from left to right. Default behavior.
        - `true` : Thumb moves from right to left.
- `animationDuration` : Duration of drawing path of checker.
- `value` : Initial value.
- `click` : Configuration of [click input](button.md#create-instance)
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
    - `click.threshold` : Cancel clicking detecting when dragging distance is larger then this threshold.
        - `undefined` : Ignore this feature. Default behavior. 
- `readOnly` : Set `ture` to disable input.

### Custom class

- Define class
    ```javascript
    class MyToggleSwitch extends RexPlugins.GameObjects.ToggleSwitch {
        constructor(scene, x, y, width, height, color, config) {
            super(scene, x, y, width, height, color, config);
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
    var toggleSwitch = new MyToggleSwitch(scene, x, y, width, height, color, config);
    ```

### Value

- Get
    ```javascript
    var value = toggleSwitch.value;
    // var value = toggleSwitch.value;
    ```
- Set
    ```javascript
    toggleSwitch.setValue(value);
    // toggleSwitch.setValue(value, duration);
    ```
    or
    ```javascript
    toggleSwitch.value = value;
    ```
- Toggle
    ```javascript
    toggleSwitch.toggleValue();
    // toggleSwitch.toggleValue(duration);
    ```
    or
    ```javascript
    toggleSwitch.value = !toggleSwitch.value;
    // toggleSwitch.value = !toggleSwitch.value;
    ```

### Read only

- Get
    ```javascript
    var readOnly = toggleSwitch.readOnly;
    ```
- Set
    ```javascript
    toggleSwitch.setReadOnly();
    // toggleSwitch.setReadOnly(true);
    ```
    or
    ```javascript
    toggleSwitch.readOnly = true;
    ```

### Track fill style

- Get
    ```javascript
    var color = toggleSwitch.trackFillColor;
    var alpha = toggleSwitch.trackFillAlpha;
    ```
    ```javascript
    var color = toggleSwitch.falseValueTrackColor;
    var alpha = toggleSwitch.falseValueTrackFillAlpha;
    ```
- Set
    ```javascript
    toggleSwitch.setTrackFillStyle(color, alpha);
    // toggleSwitch.trackFillColor = color;
    // toggleSwitch.trackFillAlpha = alpha;
    ```
    ```javascript
    toggleSwitch.setFalseValueTrackFillStyle(color, alpha);
    // toggleSwitch.falseValueTrackColor = color;
    // toggleSwitch.falseValueTrackFillAlpha = alpha;
    ```

### Thumb fill style

- Get
    ```javascript
    var color = toggleSwitch.thumbColor;
    var alpha = toggleSwitch.thumbAlpha;
    ```
- Set
    ```javascript
    toggleSwitch.setThumbStyle(color, alpha);
    // toggleSwitch.thumbColor = color;
    // toggleSwitch.thumbAlpha = alpha;
    ```

### Toggle animation

- Duration
    - Get
        ```javascript
        var duration = toggleSwitch.toggleAnimProgress;
        ```
    - Set
        ```javascript
        toggleSwitch.setToggleAnimationDuration(duration);
        toggleSwitch.toggleAnimProgress = duration;
        ```

### Size

- Get
    ```javascript
    var width = toggleSwitch.width;
    var height = toggleSwitch.height;
    ```
- Set
    ```javascript
    toggleSwitch.setSize(width, height);
    ```
    or
    ```javascript
    toggleSwitch.width = width;
    toggleSwitch.height = height;
    ```

### Display size

- Get
    ```javascript
    var width = toggleSwitch.displayWidth;
    var height = toggleSwitch.displayHeight;
    ```
- Set
    ```javascript
    toggleSwitch.setDisplaySize(width, height);
    ```
    or
    ```javascript
    toggleSwitch.displayWidth = width;
    toggleSwitch.displayHeight = height;
    ```

### Track size ratio

- Get
    ```javascript
    var trackWidth = toggleSwitch.trackWidth;
    var trackHeight = toggleSwitch.trackHeight;
    ```
    - `trackWidth`, `trackHeight` : Size ratio of track
- Set
    ```javascript
    toggleSwitch.setTrackSize(trackWidth, trackHeight);
    // toggleSwitch.trackWidth = trackWidth;
    // toggleSwitch.trackHeight = trackHeight;
    ```

### Track corner ratio

- Get
    ```javascript
    var trackRadius = toggleSwitch.trackRadius;
    ```
    - `trackRadius` : Corner ratio of track
- Set
    ```javascript
    toggleSwitch.setTrackRadius(trackRadius);
    // toggleSwitch.trackRadius = trackRadius;
    ```

### Thumb size ratio

- Get
    ```javascript
    var thumbWidth = toggleSwitch.thumbWidth;
    var thumbHeight = toggleSwitch.thumbHeight;
    ```
    - `trackWidth`, `trackHeight` : Size ratio of thumb
- Set
    ```javascript
    toggleSwitch.setThumbSize(thumbWidth, thumbHeight);
    // toggleSwitch.thumbWidth = thumbWidth;
    // toggleSwitch.thumbHeight = thumbHeight;
    ```

### Thumb corner ratio

- Get
    ```javascript
    var thumbRadius = toggleSwitch.thumbRadius;
    ```
    - `thumbRadius` : Corner ratio of track
- Set
    ```javascript
    toggleSwitch.setThumbRadius(thumbRadius);
    // toggleSwitch.thumbRadius = thumbRadius;
    ```

### Thumb position ratio

- Get
    ```javascript
    var thumbLeft = toggleSwitch.thumbLeftX;
    var thumbRight = toggleSwitch.thumbRightX;
    ```
    ```javascript
    var rtl = toggleSwitch.rtl;
    ```
- Set
    ```javascript
    toggleSwitch.setThumbPosition(thumbLeft, thumbRight);
    // toggleSwitch.thumbLeftX = thumbLeft;
    // toggleSwitch.thumbRightX = thumbRight;
    ```
    ```javascript
    toggleSwitch.setRTL(rtl);
    // toggleSwitch.rtl = rtl;
    ```

### Events

- On value change
    ```javascript
    toggleSwitch.on('valuechange', function(value) {
        // value: checked
    })
    ```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = toggleSwitch.createGeometryMask();
```

See [mask](mask.md)

### Shader effects

Support [postFX effects](shader-builtin.md)

!!! note
    No preFX effect support
