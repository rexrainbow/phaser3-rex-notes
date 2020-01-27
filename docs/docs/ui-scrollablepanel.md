## Introduction

A container with a panel, slider, and scroller.

- Author: Rex
- Game object

## Live demos

- [Scroll-able panel + grid sizer](https://codepen.io/rexrainbow/pen/YMyBom)
- [Scroll-able panel + fix-width sizer](https://codepen.io/rexrainbow/pen/eYOdKBR)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-scollablepanel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add scrollable-panel object
    ```javascript
    var panel = scene.rexUI.add.scrollablePanel(config);
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
- Add scrollable-panel object
    ```javascript
    var panel = scene.rexUI.add.scrollablePanel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add scrollable-panel object
    ```javascript    
    var panel = new ScrollablePanel(scene, config);
    sscene.add.existing(panel);
    ```

### Add scroll-able panel object

```javascript
var panel = scene.rexUI.add.scrollablePanel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

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

        panel: 0,
        // panel: {
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
    - `space.panel` :
        - A number: Space between panel object and slider object.
        - An object: Padding of panel object.
            - If `scrollMode` is `0` (vertical) :
                - `space.panel.top`, `space.panel.bottom` : Top, bottom padding space of panel object.
                - `space.panel.right` : Space between panel object and slider object.
            - If `scrollMode` is `1` (horizontal) :
                - `space.panel.left`, `space.panel.right` : Left, right padding space of panel object.
                - `space.panel.bottom` : Space between panel object and slider object.
    - `space.header` : Space between header and panel.
    - `space.footer` : Space between footer and panel.
- `expand` : Expand width or height of element
    - `expand.header` : Set `true` to expand width or height of header game object.
    - `expand.footer`
- `align` : Align element
    - `align.header`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `align.footer`
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
    var panel = new MyPanel(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
panel.layout();
```

### Scroll content

- Set
    ```javascript
    panel.setChildOY(oy);
    ```
    or
    ```javascript
    panel.childOY = oy;
    ```
- Get
    ```javascript
    var childOY = panel.childOY;
    ```

#### Scroll by percentage

- Set
    ```javascript
    panel.setT(t);  // t: 0~1
    ```
    or
    ```javascript
    panel.t = t;
    ```
- Get
    ```javascript
    var t = panel.t;
    ```
- Top OY
    ```javascript
    var topOY = panel.topChildOY;
    ```
- Bottom OY
    ```javascript
    var bottomOY = panel.bottomChildOY;
    ```

### Scroll to top/bottom

- Scroll to top
    ```javascript
    panel.scrollToTop();
    ```
    - Equal to `panel.t = 0;`
- Scroll to bottom
    ```javascript
    panel.scrollToBottom();
    ```
    - Equal to `panel.t = 1;`

### Enable/disable scrolling

- Slider
    - Set enable state
        ```javascript
        panel.setSliderEnable(enabled);
        ```
        or
        ```javascript
        panel.sliderEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = panel.sliderEnable;
        ```
- Scroller
    - Set enable state
        ```javascript
        panel.setScrollerEnable(enabled);
        ```
        or
        ```javascript
        panel.scrollerEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = panel.scrollerEnable;
        ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Get element

- Get element
    - Background game object
        ```javascript
        var background = panel.getElement('background');
        ```
    - Panel game object
        ```javascript
        var panel = panel.getElement('panel');
        ```
    - Slider
        - Track
            ```javascript
            var track = panel.getElement('slider.track');
            ```
        - Thumb
            ```javascript
            var thumb = panel.getElement('slider.thumb');
            ```
    - Scroller
        ```javascript
        var scroller = panel.getElement('scroller');
        ```
- Get by name
    ```javascript
    var gameObject = panel.getElement('#' + name);
    ```