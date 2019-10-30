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
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

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
        threshold: 10,
        slidingDeceleration: 5000,
        backDeceleration: 2000,
    },

    clamplChildOY: false,

    header: headerGameObject,
    footer: footerGameObject,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        text: 0,
        // text: {
        //    top: 0,
        //    bottom: 0,
        //    left: 0,
        //    right: 0,
        //},
        header: 0,
        footer: 0,
    },

    expand: {
        header: true,
        footer: true,
    },

    align: {
        header: 'center',
        footer: 'center',
    },

    content: '',

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
    - Set to `false` to skip creating slider.
- `scroller` : Configuration of scroller behavior.
    - `scroller.threshold` : Minimal movement to scroll. Set `0` to scroll immediately.
    - `scroller.slidingDeceleration` : Deceleration of slow down when dragging released.
        - Set `false` to disable it.
    - `scroller.backDeceleration` : Deceleration of pull back when out of bounds.
        - Set `false` to disable it.
    - Set to `false` to skip creating scroller.
- `clamplChildOY` : Set `true` to clamp scrolling.
- `header` : Game object of header, optional.
- `footer` : Game object of footer, optional.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.text` :
        - A number: Space between text object and slider object.
        - An object: Padding of text object.
            - If `scrollMode` is `0` (vertical) :
                - `space.text.top`, `space.text.bottom` : Top, bottom padding space of text object.
                - `space.text.right` : Space between text object and slider object.
            - If `scrollMode` is `1` (horizontal) :
                - `space.text.left`, `space.text.right` : Left, right padding space of text object.
                - `space.text.bottom` : Space between text object and slider object.
    - `space.header` : Space between header and text object.
    - `space.footer` : Space between footer and text object.
- `expand` : Expand width or height of element
    - `expand.header` : Set `true` to expand width or height of header game object.
    - `expand.footer`
- `align` : Align element
    - `align.header`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `align.footer`
- `content` : Content of this text area.
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
- Top OY
    ```javascript
    var topOY = textArea.topChildOY;
    ```
- Bottom OY
    ```javascript
    var bottomOY = textArea.bottomChildOY;
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