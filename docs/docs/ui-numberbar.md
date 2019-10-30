## Introduction

A container with an icon, slider, text, and background.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/numberbar/NumberBar.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-numberbar)

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

### Add number bar object

```javascript
var numberBar = scene.rexUI.add.numberBar({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    background: backgroundGameObject,
    icon: iconGameObject,
    iconMask: false,
    slider: {
        background: sliderBackgroundGameObject,
        track: sliderTrackGameObject,
        indicator: sliderIndicatorGameObject,
        thumb: sliderThumbGameObject,
        input: 'none',
        gap: undefined,
    }
    text: textGameObject,

    valuechangeCallback: function(newValue, oldValue, numberBar) {
        // numberBar.text = Math.round(Phaser.Math.Linear(0, 100, newValue));
    }

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0,
        slider: 0,
    },

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
- `background` : Game object of background, optional. This background game object will be resized to fit the size of numberBar.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `slider` : Slider game object which composed of
    - `slider.width` : Fixed width of slider, optional. Width of slider will be extended if this value is not set.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of slider track.
    - `slider.indicator` : Game object of slider indicator, optional.
    - `slider.thumb` : Game object of slider thumb, optional.
    - `slider.input` :
        - `'drag'` : Control slider by dragging thumb game object.
        - `'click'` : Control slider by touching track game object.
        - `'none'` : Disable sider controlling. Default setting.
    - `slider.gap` : Snap a value to nearest grid slice, using rounding.
        - `undefined` : Disable this feature.
- `text` : Game object of text, optional.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.icon` : Space between icon game object and text game object.
    - `space.slider` : Space between slider game object and text game object.
- `valuechangeCallback` : callback function when value changed.
- `name` : Set name of this numberBar.

### Custom class

- Define class
    ```javascript
    class MyNumberBar extends RexPlugins.UI.NumberBar {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var numberBar = new MyNumberBar(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
numberBar.layout();
```

### Get element

- Get element
    - Background game object
        ```javascript
        var background = numberBar.getElement('background');
        ```
    - Icon game object
        ```javascript
        var icon = numberBar.getElement('icon');
        ```
    - Slider game object
        - Slider background
            ```javascript
            var sliderBackground = numberBar.getElement('slider.background');
            ```
        - Slider track
            ```javascript
            var sliderTrack = numberBar.getElement('slider.track');
            ```
        - Slider indicator
            ```javascript
            var sliderIndicator = numberBar.getElement('slider.indicator');
            ```
        - Slider thumb
            ```javascript
            var sliderThumb = numberBar.getElement('slider.thumb');
            ```
    - Text game object
        ```javascript
        var icon = numberBar.getElement('text');
        ```
- Get by name
    ```javascript
    var gameObject = numberBar.getElement('#' + name);
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

### Text

- Get text string
    ```javascript
    var s = numberBar.text;
    ```
- Set text string
    ```javascript
    numberBar.setText(s);
    ```
    or
    ```javascript
    numberBar.text = s;
    ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Events

- On value changed
    ```javascript
    numberBar.on('valuechange', function(newValue, oldValue, numberBar){
        // numberBar.text = Math.round(Phaser.Math.Linear(0, 100, newValue));
    }, scope);
    ```