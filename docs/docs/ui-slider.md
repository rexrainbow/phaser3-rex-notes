## Introduction

A container with a track, indicator, thumb and background.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/slider/Slider.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-slider)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

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

### Add slider object

```javascript
var slider = scene.rexUI.add.slider({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,

    background: backgroundGameObject,
    track: trackGameObject,
    indicator: indicatorGameObject,
    thumb: thumbGameObject,

    input: 'drag',

    value: 0,
    gap: undefined,
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
    // draggable: false
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `width`, `height` : Minimum width, minimum height.
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Horizontal slider.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Vertical slider.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of slider.
- `track` : Game object of track, optional.
- `indicator` : Game object of indicator, optional.
- `thumb` : Game object of thumb, optional.
- `input` :
    - `'drag'`, or `0` : Control slider by dragging thumb game object. Default setting.
    - `'click'`, or `1` : Control slider by touching track game object.
    - `'none'`, or `-1` : Disable sider controlling.
- `value` : Initial value (0 ~ 1).
- `gap` : Snap a value to nearest grid slice, using rounding.
    - `undefined` : Disalbe this feature.
- `valuechangeCallback` : callback function when value changed.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
- `enable` : Set `false` to disable controlling.
- `name` : Set name of this slider.

### Custom class

- Define class
    ```javascript
    class MySlider extends RexPlugins.UI.Slider {
        constructor(scene, config) {
            super(scene, config);
            // ...
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
    ```

### Value

Change value will also change the position of slider thumb and width of slider indicator.

- Get value
    ```javascript
    var value = numberBar.getValue(min, max); // value : min ~ max
    ```
    or
    ```javascript
    var value = numberBar.getValue(); // value: 0 ~ 1
    ```
    or
    ```javascript
    var value = numberBar.value; // value: 0 ~ 1
    ```
- Set value
    ```javascript
    numberBar.setValue(value, min, max); // value: min ~ max
    ```
    or
    ```javascript
    numberBar.setValue(value); // value: 0 ~ 1
    ```
    or
    ```javascript
    numberBar.value = value; // value: 0 ~ 1
    ```
- Increase value
    ```javascript
    numberBar.addValue(inc, min, max); // inc: min ~ max
    ```
    or
    ```javascript
    numberBar.addValue(inc); // inc: 0 ~ 1
    ```
    or
    ```javascript
    numberBar.value += inc; // inc: 0 ~ 1
    ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Events

- On value changed
    ```javascript
    slider.on('valuechange', function(newValue, oldValue, slider){
        //
    }, scope);
    ```