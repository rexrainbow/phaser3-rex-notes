## Introduction

A knob button based on [circular progress shape](shape-circularprogress.md).

- Author: Rex
- Game object

## Live demos

- [Knob](https://codepen.io/rexrainbow/pen/BaQgVEa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-knob)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add knob object
    ```javascript
    var knob = scene.rexUI.add.knob(config);
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
- Add knob object
    ```javascript
    var knob = scene.rexUI.add.knob(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Knob } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add knob object
    ```javascript    
    var knob = new Knob(scene, config);
    scene.add.existing(knob);
    ```

### Add knob object

```javascript
var knob = scene.rexUI.add.knob({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    background: backgroundGameObject,

    barColor: undefined,
    trackColor: undefined,
    centerColor: undefined,
    thickness: 0.2,
    startAngle: Phaser.Math.DegToRad(270),
    anticlockwise: false,
    knobDepth: 0,

    text: undefined,
    textFormatCallback: undefined,
    textFormatCallbackScope: undefined,

    input: 'pan',

    value: 0,
    gap: undefined,
    easeValue: {
        duration: 0,
        ease: 'Linear'
    },
    valuechangeCallback: function(newValue, oldValue, knob) {
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
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly. 
- `width`, `height` : Minimum width, minimum height.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of knob.
- `barColor` : Color of circular bar, in number or css string value.
- `trackColor` : Color of circular track, in number or css string value.
- `centerColor` : Color of center circle, in number or css string value.
- `thickness` : `0` ~ `1`, thickness of circular bar. Default value is `0.2` (`0.2*radius`)
- `startAngle` : Start angle of circular bar, in radians. Default value is 270 degrees.
- `anticlockwise` : Set `true` to put anticlockwise circular bar. Default value is `false`.
- `knobDepth` : Depth of knob (circular progress). Default value is `0`.
- `text` : [Label](ui-label.md), [Text](text.md), [BBCodeText](bbcodetext.md), or [TagText](tagtext.md), which has `setText(text)` method, optional.
    - Don't set `textColor`, `textStrokeColor` if `text` parameter is provided.
    - Depth of text object ought to larger than knob (circular progress), to put text object in front of knob.
- Display text : 
    - `textColor` : Color of display text. Default is `undefined`.
    - `textStrokeColor`, `textStrokeThickness` : Stroke color, stroke line width of display text. Default is `undefined`.
    - `textSize`, `textFamily`, `textStyle` : Size, family, style of display text.
- `textFormatCallback`, `textFormatCallbackScope` : Formating callback of display text. ex:
    ```javascript
    function(value) {
        return Math.floor(value * 100).toString();
    }
    ```
    Default value is `undefined`.
- `input` :
    - `'pan'`, `'drag'`, or `0` : Control knob by panning circular progress. Default setting.
    - `'click'`, or `1` : Control knob by touching circular progress.
    - `'none'`, or `-1` : Disable knob controlling.
- `value` : Initial value (0 ~ 1).
- `gap` : Snap a value to nearest grid slice, using rounding.
    - `undefined` : Disalbe this feature.
- `easeValue` : Easing value when `input` is `'click'`.
    - `easeValue.duration` : Duration of value easing, default is `0` (no easing).
    - `easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
- `valuechangeCallback` : callback function when value changed.
- `enable` : Set `false` to disable controlling.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyKnob extends RexPlugins.UI.Knob {
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
    var knob = new MyKnob(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
knob.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = knob.getElement('background');
        ```
    - Circular progress game object
        ```javascript
        var circularProgress = knob.getElement('knob');
        ```
    - Text game object
        ```javascript
        var text = knob.getElement('text');
        ```
- Get by name
    ```javascript
    var gameObject = knob.getElement('#' + name);
    // var gameObject = knob.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = knob.getByName('#' + name);
    // var gameObject = knob.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Enable

- Get
    ```javascript
    var enable = knob.enable;
    ```
- Set
    ```javascript
    knob.setEanble(enable);
    ```
    or
    ```javascript
    knob.enable = enable;
    ```

### Value

Change value will also change the position of knob thumb and width of knob indicator.

- Get value
    ```javascript
    var value = knob.getValue(min, max); // value : min ~ max
    ```
    or
    ```javascript
    var value = knob.getValue(); // value: 0 ~ 1
    ```
    or
    ```javascript
    var value = knob.value; // value: 0 ~ 1
    ```
- Set value
    ```javascript
    knob.setValue(value, min, max); // value: min ~ max
    ```
    or
    ```javascript
    knob.setValue(value); // value: 0 ~ 1
    ```
    or
    ```javascript
    knob.value = value; // value: 0 ~ 1
    ```
- Increase value
    ```javascript
    knob.addValue(inc, min, max); // inc: min ~ max
    ```
    or
    ```javascript
    knob.addValue(inc); // inc: 0 ~ 1
    ```
    or
    ```javascript
    knob.value += inc; // inc: 0 ~ 1
    ```

### Ease value

- Ease value to
    ```javascript
    knob.easeValueTo(value, min, max);  // value: min ~ max
    ```
    or
    ```javascript
    knob.easeValueTo(value);  // value: 0 ~ 1
    ```
- Stop ease
    ```javascript
    knob.stopEaseValue();
    ```
- Set ease duration
    ```javascript
    knob.setEaseValueDuration(duration);
    ```
- Set ease function
    ```javascript
    knob.setEaseValueFunction(ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations).

### Other properties

See [overlap sizer object](ui-overlapsizer.md), [base sizer object](ui-basesizer.md).

### Events

- On value changed
    ```javascript
    knob.on('valuechange', function(newValue, oldValue, knob){
        //
    }, scope);
    ```