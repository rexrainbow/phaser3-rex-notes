## Introduction

A container with a panel, slider, and scroller.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/scollablepanel/ScrollablePanel.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-scollablepanel)

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

### Add scroll-able panel object

```javascript
var scrollablePanel = scene.rexUI.add.scrollablePanel({
    x: 0,
    y: 0,
    width: 2,
    height: 2,

    scrollMode: 0,

    // Elements
    background: backgroundGameObject,

    panel: {
        child: panelGameObject,
        mask: {
            padding: 0
        }
    }.

    slider: {
        track: trackGameObject,
        thumb: thumbGameObject,
    },

    scroller: {
        slidingDeceleration: 5000,
        backDeceleration: 2000,
    },

    clamplChildOY: false,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        panel: 0,
    },

    name: '',
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
    - Number : World position in pixels.
    - String (`'p%+n'`) : Position based on visible window. See [anchor](anchor.md#create-instance).
- `width`, `height` : Minimum width, minimum height.
- `scrollMode` : Scroll panel vertically, or horizontally.
    - `0`, `'vertical'`, or `'v'` : Scroll panel vertically. Default value.
    - `1`, `'horizontal'`, or `'h'` : Scroll panel horizontally.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of scroll-able panel.
- `panel` : Configuration of panel game object.
    - `panel.child` : Panel game object.
    - `panel.mask` : Configuration of panel's mask.
        - Set `panel.mask` to `false` to disable masking.
    - `panel.mask.padding` : Extend mask with padding. Default value is `0`.
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
- `clamplChildOY` : Set `true` to clamp scrolling.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.panel` : Space between panel object and slider object.
- `name` : Set name of this panel.

### Custom class

- Define class
    ```javascript
    class MyPanel extends RexPlugins.UI.ScrollablePanel {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var scrollablePanel = new MyPanel(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
scrollablePanel.layout();
```

### Scroll content

- Set
    ```javascript
    scrollablePanel.setChildOY(oy);
    ```
    or
    ```javascript
    scrollablePanel.childOY = oy;
    ```
- Get
    ```javascript
    var childOY = scrollablePanel.childOY;
    ```

#### Scroll by percentage

- Set
    ```javascript
    scrollablePanel.setT(t);  // t: 0~1
    ```
    or
    ```javascript
    scrollablePanel.t = t;
    ```
- Get
    ```javascript
    var t = scrollablePanel.t;
    ```
- Top OY
    ```javascript
    var topOY = scrollablePanel.topChildOY;
    ```
- Bottom OY
    ```javascript
    var bottomOY = scrollablePanel.bottomChildOY;
    ```

### Scroll to top/bottom

- Scroll to top
    ```javascript
    scrollablePanel.scrollToTop();
    ```
    - Equal to `scrollablePanel.t = 0;`
- Scroll to bottom
    ```javascript
    scrollablePanel.scrollToBottom();
    ```
    - Equal to `scrollablePanel.t = 1;`

### Enable/disable scrolling

- Slider
    - Set enable state
        ```javascript
        scrollablePanel.setSliderEnable(enabled);
        ```
        or
        ```javascript
        scrollablePanel.sliderEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = scrollablePanel.sliderEnable;
        ```
- Scroller
    - Set enable state
        ```javascript
        scrollablePanel.setScrollerEnable(enabled);
        ```
        or
        ```javascript
        scrollablePanel.scrollerEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = scrollablePanel.scrollerEnable;
        ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Get element

- Get element
    - Background game object
        ```javascript
        var background = scrollablePanel.getElement('background');
        ```
    - Panel game object
        ```javascript
        var panel = scrollablePanel.getElement('panel');
        ```
    - Slider
        - Track
            ```javascript
            var track = scrollablePanel.getElement('slider.track');
            ```
        - Thumb
            ```javascript
            var thumb = scrollablePanel.getElement('slider.thumb');
            ```
    - Scroller
        ```javascript
        var scroller = scrollablePanel.getElement('scroller');
        ```
- Get by name
    ```javascript
    var gameObject = scrollablePanel.getElement('#' + name);
    ```