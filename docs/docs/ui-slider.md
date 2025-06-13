## Introduction

A container with a track, indicator, thumb and background.

- Author: Rex
- Game object

## Live demos

- [Slider bar](https://codepen.io/rexrainbow/pen/dwYaaQ)
- [Color picker](https://codepen.io/rexrainbow/pen/XWmgMaX)
- [Crop resize](https://codepen.io/rexrainbow/pen/poaapbd)
- [Tick](https://codepen.io/rexrainbow/pen/PoRMERZ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-slider)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add slider object
    ```javascript
    var slider = scene.rexUI.add.slider(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add slider object
    ```javascript
    var slider = scene.rexUI.add.slider(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Slider } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add slider object
    ```javascript    
    var slider = new Slider(scene, config);
    scene.add.existing(slider);
    ```

### Add slider object

```javascript
var slider = scene.rexUI.add.slider({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    orientation: 0,
    reverseAxis: false,

    background: backgroundGameObject,
    /* 
    background: { 
        radius: 0, 
        color: undefined, alpha: 1,
        strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
        shape: undefined
    }
    */

    track: trackGameObject,
    /* 
    track: { 
        width: 1, height: 1,
        radius: 0, 
        color: undefined, alpha: 1,
        strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
        shape: undefined
    }
    */    

    indicator: indicatorGameObject,
    /* 
    indicator: { 
        width: 1, height: 1,
        radius: 0, 
        color: undefined, alpha: 1,
        strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
        shape: undefined
    }
    */

    thumb: thumbGameObject,
    /* 
    thumb: { 
        width: 1, height: 1,
        radius: 0, 
        color: undefined, alpha: 1,
        strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
        shape: undefined
    }
    */
    thumbOffsetX: 0,
    thumbOffsetY: 0,

    input: 'drag',

    value: 0,
    tick: undefined,
    easeValue: {
        duration: 0,
        ease: 'Linear'
    },    
    valuechangeCallback: function(newValue, oldValue, slider) {
    },

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    enable: true,

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y`, `aspectRatio` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `aspectRatio` :
        - `undefined`, or `false` : Does not keep aspect ratio. Default behavior.
        - `true` : Use the current width and height as the aspect ratio.
        - A number : Use given number as the aspect ratio.    
    - `onResizeCallback` : A default resize callback will be assigned interanlly.
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Horizontal slider.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Vertical slider.
- `reverseAxis` : 
    - `false` : Map left/top to `0`, and right/bottom to `1`. Default behavior.
    - `true` : Map left/top to `1`, and right/bottom to `0`.
- `background` : 
    - [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of slider.
    - A plain object to create [round rectangle shape](shape-roundrectangle.md#create-shape-object)
        ```javascript
        { 
            radius: 0, 
            color: undefined, alpha: 1,
            strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
            shape: undefined
        }
        ```
- `track` : 
    - Game object of track, optional. This track game object will be resized to fit the size of slider, with *space*.
    - A plain object to create [round rectangle shape](shape-roundrectangle.md#create-shape-object)
        ```javascript
        { 
            width: 1, height: 1,
            radius: 0, 
            color: undefined, alpha: 1,
            strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
            shape: undefined
        }
        ```
- `indicator` : 
    - Game object of indicator, optional.
    - A plain object to create [round rectangle shape](shape-roundrectangle.md#create-shape-object)
        ```javascript
        { 
            width: 1, height: 1,
            radius: 0, 
            color: undefined, alpha: 1,
            strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
            shape: undefined
        }
        ```
- `thumb` : 
    - Game object of thumb, optional.
    - A plain object to create [round rectangle shape](shape-roundrectangle.md#create-shape-object)
        ```javascript
        { 
            width: 1, height: 1,
            radius: 0, 
            color: undefined, alpha: 1,
            strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
            shape: undefined
        }
        ```
- `thumbOffsetX`, `thumbOffsetY` : Shift thumb, default value is `0`.
- `input` :
    - `'pan'`, `'drag'`, or `0` : Control slider by panning/dragging thumb game object. Default setting.
    - `'click'`, or `1` : Control slider by touching track game object.
    - `'none'`, or `-1` : Disable sider controlling.
- `value` : Initial value (0 ~ 1).
- `tick` : Snap a value to nearest grid slice, using rounding.
    - `undefined` : Disalbe this feature.
- `easeValue` : Easing value when `input` is `'click'`.
    - `easeValue.duration` : Duration of value easing, default is `0` (no easing).
    - `easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- `valuechangeCallback` : callback function when value changed.
    ```javascript
    function(newValue, oldValue, slider) {
    }
    ```
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
- `enable` : Set `false` to disable controlling.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).

### Custom class

- Define class
    ```javascript
    class MySlider extends RexPlugins.UI.Slider {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var slider = new MySlider(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
slider.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = slider.getElement('background');
        ```
    - Track game object
        ```javascript
        var track = slider.getElement('track');
        ```
    - Indicator game object
        ```javascript
        var track = slider.getElement('indicator');
        ```
    - Thumb track game object
        ```javascript
        var action = slider.getElement('thumb');
        ```
- Get by name
    ```javascript
    var gameObject = slider.getElement('#' + name);
    // var gameObject = slider.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = slider.getByName(name);
    // var gameObject = slider.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Enable

- Get
    ```javascript
    var enable = slider.enable;
    ```
- Set
    ```javascript
    slider.setEanble(enable);
    ```
    or
    ```javascript
    slider.enable = enable;
    ```

### Value

Change value will also change the position of slider thumb and width of slider indicator.

- Get value
    ```javascript
    var value = slider.getValue(min, max); // value : min ~ max
    ```
    or
    ```javascript
    var value = slider.getValue(); // value: 0 ~ 1
    ```
    or
    ```javascript
    var value = slider.value; // value: 0 ~ 1
    ```
- Set value
    ```javascript
    slider.setValue(value, min, max); // value: min ~ max
    ```
    or
    ```javascript
    slider.setValue(value); // value: 0 ~ 1
    ```
    or
    ```javascript
    slider.value = value; // value: 0 ~ 1
    ```
- Increase value
    ```javascript
    slider.addValue(inc, min, max); // inc: min ~ max
    ```
    or
    ```javascript
    slider.addValue(inc); // inc: 0 ~ 1
    ```
    or
    ```javascript
    slider.value += inc; // inc: 0 ~ 1
    ```

### Ease value

- Ease value to
    ```javascript
    slider.easeValueTo(value, min, max);  // value: min ~ max
    ```
    or
    ```javascript
    slider.easeValueTo(value);  // value: 0 ~ 1
    ```
- Stop ease
    ```javascript
    slider.stopEaseValue();
    ```
- Set ease duration
    ```javascript
    slider.setEaseValueDuration(duration);
    ```
- Set ease function
    ```javascript
    slider.setEaseValueFunction(ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations).

### Tick

- Set
    ```javascript
    slider.setTick(tick);  // tick: 0~1
    ```
    or
    ```javascript
    slider.setTick(tick, min, max);  // tick: min~max
    ```
- Get
    ```javascript
    var tick = slider.tick;  // tick: 0~1
    ```

### Events

- On value changed
    ```javascript
    slider.on('valuechange', function(newValue, oldValue, slider){
        //
    }, scope);
    ```
- On input start
    ```javascript
    slider.on('inputstart', function(pointer) {

    }, scope);
    ```
- On input end
    ```javascript
    slider.on('inputend', function(pointer) {

    }, scope);
    ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).
