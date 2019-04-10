## Introduction

A container with a text, slider, and scroller.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/textarea/TextArea.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-textarea)

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

### Add text-area object

```javascript
var textArea = scene.rexUI.add.textArea({
    x: 0,
    y: 0,
    width: 2,
    height: 2,

    // Elements
    background: backgroundGameObject,

    text: textGameObject,
    // textWidth: undefined,
    // textHeight: undefined,

    slider: {
        track: trackGameObject,
        thumb: thumbGameObject,
    },

    scroller: {
        slidingDeceleration: 5000,
        backDeceleration: 2000,
    },

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        text: 0,
    },

    name: '',
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
    - Number : World position in pixels.
    - String (`'p%+n'`) : Position based on visible window. See [anchor](anchor.md#create-instance).
- `width`, `height` : Minimum width, minimum height.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of text area.
- `text` : Game object of text.
- `textWidth` : Fixed width of text game object. Set `undefined` to ignore this feature.
- `textHeight` : Fixed height of text game object. Set `undefined` to ignore this feature.
- `slider` : Componments of slider, optional.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of track.
    - `slider.thumb` : Game object of thumb.
    - `slider.input` :
        - `'drag'` : Control slider by dragging thumb game object. Default setting.
        - `'click'` : Control slider by touching track game object.
        - `'none'` : Disable sider controlling.
    - Set to `false` to ignore slider.
- `scroller` : Configuration of scroller behavior.
    - `scroller.slidingDeceleration` : Deceleration of slow down when dragging released.
        - Set `false` to disable it.
    - `scroller.backDeceleration` : Deceleration of pull back when out of bounds.
        - Set `false` to disable it.
    - Set to `false` to ignore scroller.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.text` : Space between text object and slider object.
- `name` : Set name of this textArea.

### Custom class

- Define class
    ```javascript
    class MyTextArea extends RexPlugins.UI.TextArea {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var textArea = new MyTextArea(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
textArea.layout();
```

### Content

- Set
    ```javascript
    textArea.setText(text);
    ```
- Append
    ```javascript
    textArea.appendText(text);
    ```
- Get
   ```javascript
   var text = textArea.text;
   ```

### Scroll content

- Set
    ```javascript
    textArea.setChildOY(oy);
    ```
    or
    ```javascript
    textArea.childOY = oy;
    ```
- Get
    ```javascript
    var childOY = textArea.childOY;
    ```

#### Scroll by percentage

- Set
    ```javascript
    textArea.setT(t);  // t: 0~1
    ```
    or
    ```javascript
    textArea.t = t;
    ```
- Get
    ```javascript
    var t = textArea.t;
    ```

### Scroll to top/bottom

- Scroll to top
    ```javascript
    textArea.scrollToTop();
    ```
    - Equal to `textArea.t = 0;`
- Scroll to bottom
    ```javascript
    textArea.scrollToBottom();
    ```
    - Equal to `textArea.t = 1;`

### Enable/disable scrolling

- Slider
    - Set enable state
        ```javascript
        textArea.setSliderEnable(enabled);
        ```
        or
        ```javascript
        textArea.sliderEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = textArea.sliderEnable;
        ```
- Scroller
    - Set enable state
        ```javascript
        textArea.setScrollerEnable(enabled);
        ```
        or
        ```javascript
        textArea.scrollerEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = textArea.scrollerEnable;
        ```

### Lines count

```javascript
var linesCount = textArea.linesCount;
```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Get element

- Get element
    - Background game object
        ```javascript
        var background = textArea.getElement('background');
        ```
    - Text game object
        ```javascript
        var text = textArea.getElement('text');
        ```
    - Slider
        - Track
            ```javascript
            var track = textArea.getElement('slider.track');
            ```
        - Thumb
            ```javascript
            var thumb = textArea.getElement('slider.thumb');
            ```
    - Scroller
        ```javascript
        var scroller = textArea.getElement('scroller');
        ```
- Get by name
    ```javascript
    var gameObject = textArea.getElement('#' + name);
    ```