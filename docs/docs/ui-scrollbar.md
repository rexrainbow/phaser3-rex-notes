## Introduction

A container with slider, two buttons, and background.

- Author: Rex
- Game object

## Live demos

- [Scroll bar](https://codepen.io/rexrainbow/pen/QWayKBx)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-scrollbar)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
  ```javascript
  scene.load.scenePlugin(
    "rexuiplugin",
    "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
    "rexUI",
    "rexUI"
  );
  ```
- Add scroll bar object
  ```javascript
  var scrollBar = scene.rexUI.add.scrollBar(config);
  ```

#### Import plugin

- Install rex plugins from npm
  ```
  npm i phaser3-rex-plugins
  ```
- Install plugin in [configuration of game](game.md#configuration)
  ```javascript
  import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
  var config = {
    // ...
    plugins: {
      scene: [
        {
          key: "rexUI",
          plugin: UIPlugin,
          mapping: "rexUI",
        },
        // ...
      ],
    },
    // ...
  };
  var game = new Phaser.Game(config);
  ```
- Add scroll bar object
  ```javascript
  var scrollBar = scene.rexUI.add.scrollBar(config);
  ```

#### Import class

- Install rex plugins from npm
  ```
  npm i phaser3-rex-plugins
  ```
- Import class
  ```javascript
  import { ScrollBar } from "phaser3-rex-plugins/templates/ui/ui-components.js";
  ```
- Add scroll bar object
  ```javascript
  var sizer = new ScrollBar(scene, config);
  scene.add.existing(sizer);
  ```

### Add scroll bar object

```javascript
var scrollBar = scene.rexUI.add.scrollBar({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    background: backgroundGameObject,    
    slider: {
        background: sliderBackgroundGameObject,
        track: sliderTrackGameObject,
        indicator: sliderIndicatorGameObject,
        thumb: sliderThumbGameObject,
        input: 'drag',
        gap: undefined,        
        easeValue: {
            duration: 0,
            ease: 'Linear'
        },
    },

    buttons: {
        top: topButtonGameObject, 
        bottom: bottomButtonGameObject,
        left: leftButtonGameObject, 
        right: rightButtonGameObject,
        step: 0.01,
    }

    valuechangeCallback: function(newValue, oldValue, scrollBar) {
        // scrollBar.text = Math.round(Phaser.Math.Linear(0, 100, newValue));
    }

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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of scrollBar.
- `slider` : Slider game object which composed of
    - `slider.width` : Fixed width of slider, optional. Width of slider will be extended if this value is not set.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of slider track.
    - `slider.indicator` : Game object of slider indicator, optional.
    - `slider.thumb` : Game object of slider thumb, optional.
    - `slider.input` :
        - `'pan'`, `'drag'`, or `0` : Control knob by panning/dragging thumb game object. Default setting.
        - `'click'`, or `1` : Control slider by touching track game object.
        - `'none'`, or `-1` : Disable sider controlling.
    - `slider.gap` : Snap a value to nearest grid slice, using rounding.
        - `undefined` : Disable this feature.
    - `slider.easeValue` : Easing value when `input` is `'click'`.
          - `slider.easeValue.duration` : Duration of value easing, default is `0` (no easing).
          - `slider.easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- `buttons` : Press button to scroll content in each tick.
    - `buttons.top`, `buttons.bottom` : Top and bottom buttons.
    - `buttons.left`, `buttons.right` : Left and right buttons
    - `buttons.step` : Scrolling step in each tick. Default value is `0.01`.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
- `valuechangeCallback` : callback function when value changed.
- `enable` : Set `false` to disable controlling.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
  ```javascript
  class MyScrollBar extends RexPlugins.UI.ScrollBar {
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
  var scrollBar = new MyScrollBar(scene, config);
  ```

### Layout children

Arrange position of all elements.

```javascript
scrollBar.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
  - Background game object
    ```javascript
    var background = scrollBar.getElement("background");
    ```
  - Slider game object
    - Slider background
      ```javascript
      var sliderBackground = scrollBar.getElement("slider.background");
      ```
    - Slider track
      ```javascript
      var sliderTrack = scrollBar.getElement("slider.track");
      ```
    - Slider indicator
      ```javascript
      var sliderIndicator = scrollBar.getElement("slider.indicator");
      ```
    - Slider thumb
      ```javascript
      var sliderThumb = scrollBar.getElement("slider.thumb");
      ```
  - Button game objects
    ```javascript
    var buttons = scrollBar.getElement("buttons");
    ```
    - `buttons` : Array of button game objects.
        - `buttons[0]` : Left or top button.
        - `buttons[1]` : Right or bottom button.
- Get by name
  ```javascript
  var gameObject = scrollBar.getElement("#" + name);
  // var gameObject = scrollBar.getElement('#' + name, recursive);
  ```
  or
  ```javascript
  var gameObject = scrollBar.getByName("#" + name);
  // var gameObject = scrollBar.getByName('#' + name, recursive);
  ```
  - `recursive` : Set `true` to search all children recursively.

### Enable

- Get
    ```javascript
    var enable = scrollBar.enable;
    ```
- Set
    ```javascript
    scrollBar.setEanble(enable);
    ```
    or
    ```javascript
    scrollBar.enable = enable;
    ```

### Value

Change value will also change the position of slider thumb and width of slider indicator.

- Get value
  ```javascript
  var value = scrollBar.getValue(min, max); // value : min ~ max
  ```
  or
  ```javascript
  var value = scrollBar.getValue(); // value: 0 ~ 1
  ```
  or
  ```javascript
  var value = scrollBar.value; // value: 0 ~ 1
  ```
- Set value
  ```javascript
  scrollBar.setValue(value, min, max); // value: min ~ max
  ```
  or
  ```javascript
  scrollBar.setValue(value); // value: 0 ~ 1
  ```
  or
  ```javascript
  scrollBar.value = value; // value: 0 ~ 1
  ```
- Increase value
  ```javascript
  scrollBar.addValue(inc, min, max); // inc: min ~ max
  ```
  or
  ```javascript
  scrollBar.addValue(inc); // inc: 0 ~ 1
  ```
  or
  ```javascript
  scrollBar.value += inc; // inc: 0 ~ 1
  ```

### Ease value

- Ease value to
    ```javascript
    scrollBar.easeValueTo(value, min, max);  // value: min ~ max
    ```
    or
    ```javascript
    scrollBar.easeValueTo(value);  // value: 0 ~ 1
    ```
- Stop ease
    ```javascript
    scrollBar.stopEaseValue();
    ```
- Set ease duration
    ```javascript
    scrollBar.setEaseValueDuration(duration);
    ```
- Set ease function
    ```javascript
    scrollBar.setEaseValueFunction(ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations).

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Events

- On value changed
  ```javascript
  scrollBar.on('valuechange',
    function (newValue, oldValue, scrollBar) {
      // scrollBar.text = Math.round(Phaser.Math.Linear(0, 100, newValue));
    },
    scope
  );
  ```
