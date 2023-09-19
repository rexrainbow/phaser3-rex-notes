## Introduction

A container with a panel, slider, and scroller.

- Author: Rex
- Game object

## Live demos

- [Scroll-able panel + grid sizer](https://codepen.io/rexrainbow/pen/YMyBom)
- [Scroll-able panel + table by fix-width sizer](https://codepen.io/rexrainbow/pen/NWwymOO)
- [Scroll-able panel + fix-width sizer](https://codepen.io/rexrainbow/pen/eYOdKBR)
- [Scroll-able panel + built-in container](https://codepen.io/rexrainbow/pen/MWzNoyb)
- [Dropdown, scrollable list](https://codepen.io/rexrainbow/pen/zYzVgZd)
- [Add child](https://codepen.io/rexrainbow/pen/PopLRVm)
- [Scroll to child](https://codepen.io/rexrainbow/pen/ZEmWwaN)
- [Drag item](https://codepen.io/rexrainbow/pen/yLRYqWe)
- [Destory](https://codepen.io/rexrainbow/pen/rNvKdqg)
- [XY sliders](https://codepen.io/rexrainbow/pen/VwVVyYV)
- [Min-width panel](https://codepen.io/rexrainbow/pen/JjeqGLb)
- [Drag,resize panel](https://codepen.io/rexrainbow/pen/wvRvrzr)
- Drag&drop items between panels : 
    - [With scroller](https://codepen.io/rexrainbow/pen/jOXPXOg)
    - [Without scroller](https://codepen.io/rexrainbow/pen/KKbdPRy)
- [Nested scroll-able panel](https://codepen.io/rexrainbow/pen/RwEoLzy)


## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-scrollablepanel)

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
    scene.add.existing(panel);
    ```

### Add scroll-able panel object

```javascript
var panel = scene.rexUI.add.scrollablePanel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // scrollMode: 0,

    // Elements
    background: backgroundGameObject,

    panel: {
        child: panelGameObject,
        mask: {
            padding: 0, // or {left, right, top, bottom}
            // updateMode: 0,
        }
    }.

    slider: {
        // background: sliderBackgroundGameObject,
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

        // input: 'drag',
        // position: 'right',

        // hideUnscrollableSlider: false,
        // adaptThumbSize: false,
        // minThumbSize: undefined,

        // buttons: {
        //     top: topButtonGameObject, 
        //     bottom: bottomButtonGameObject,
        //     left: leftButtonGameObject, 
        //     right: rightButtonGameObject,
        //     step: 0.01,
        // }
    },

    // sliderX: {...},
    // sliderY: {...},

    // scroller: {
    //     threshold: 10,
    //     slidingDeceleration: 5000,
    //     backDeceleration: 2000,
    //     pointerOutRelease: true,
    //     dragRate: 1,
    // },

    // scrollerX: {...},
    // scrollerY: {...},

    mouseWheelScroller: false,
    // mouseWheelScroller: {
    //     focus: true,
    //     speed: 0.1
    // },

    // mouseWheelScrollerX: {...},
    // mouseWheelScrollerY: {...},

    clamplChildOY: false,
    // clamplChildOX: false,

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

        slider: 0,
        // slider: {
        //     top: 0,
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        // },
        // sliderX: 0,
        // sliderY: 0,

        header: 0,
        footer: 0,
    },

    expand: {
        header: true,
        footer: true,
        panel: true,
    },

    align: {
        header: 'center',
        footer: 'center',
        panel: 'center',
    },

    // name: '',
    // draggable: false,
    // enableLayer: false,
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
- `scrollMode` : Scroll panel vertically, or horizontally.
    - `0`, `'vertical'`, or `'v'`, `'y'` : Scroll panel vertically. Default value.
    - `1`, `'horizontal'`, or `'h'`. `'x'` : Scroll panel horizontally.
    - `2`, or `'xy'` : Two-sliders mode, scroll panel vertically and horizontally.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of scroll-able panel.
- `panel` : Configuration of panel game object.
    - `panel.child` : Panel game object.
    - `panel.mask` : Configuration of panel's mask.
        - `panel.mask.padding` : 
            - A number : Extra left/right/top/bottom padding spacing of this rectangle mask. Default value is `0`.
            - A plain object `{left, right, top, bottom}`
        - `panel.mask.updateMode` : When to update mask
            - `0`, or `'update'` : Apply mask only when scrolling. Default behavior.
            - `1`, or `'everyTick'` : Apply mask every tick. Use this mode if children game objects of panel are moved after scrolling and still been masked.
        - `false` : No mask
- `slider` : Componments of slider, optional.
    - `slider.background` : 
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
    - `slider.track` : 
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
    - `slider.indicator` : 
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
    - `slider.thumb` : 
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
    - `slider.input` :
        - `'pan'`, `'drag'`, or `0` : Control slider by panning/dragging thumb game object. Default setting.
        - `'click'`, or `1` : Control slider by touching track game object.
        - `'none'`, or `-1` : Disable sider controlling.
    - `slider.position` : Position of this slider.
        - `0`, `'right'`, `'bottom'` : Slider at right/bottom side. Default value.
        - `1`, `'left'`, `'top'` : Slider at left/top side.
    - `slider.hideUnscrollableSlider` :
        - `false` : Slider is always visible no matter it is scrollable or not. Default behavior.
        - `true` : Set slider to invisible if it is unscrollable.
    - `slider.adaptThumbSize` :
        - `false` : Don't adjust height/width of thumb. Default behavior.
        - `true` : Adjust height/width of thumb according to ratio of visible child.
            - Minimum height/width of thumb = `slider.minThumbSize`. If content is larger then a page.
            - Maximum height/width of thumb = height/width of `slider.track`. If content is less then a page.
    - `slider.minThumbSize` : Minimum height/width of thumb used in `slider.adaptThumbSize` mode.
    - `slider.buttons` : Press button to scroll content in each tick.
        - `slider.buttons.top`, `slider.buttons.bottom` : Top and bottom buttons.
        - `slider.buttons.left`, `slider.buttons.right` : Left and right buttons
        - `slider.buttons.step` : Scrolling step in each tick. Default value is `0.01`.
    - Set to `false` to skip creating slider.
- `sliderX`, `sliderY` : Componments of sliderX and sliderY, for two-sliders mode.
- `scroller` : Configuration of scroller behavior.
    - `scroller.threshold` : Minimal movement to scroll. Set `0` to scroll immediately.
    - `scroller.slidingDeceleration` : Deceleration of slow down when dragging released.
        - Set `false` to disable it.
    - `scroller.backDeceleration` : Deceleration of pull back when out of bounds.
        - Set `false` to disable it.
    - `scroller.pointerOutRelease` : Set to `true` to release input control when pointer out of gameObject.
    - `scroller.dragRate` : Rate of dragging distance/dragging speed. Default value is `1`.
    - Set to `false` to skip creating scroller.
- `scrollerX`, `scrollerY` : Configuration of scrollerX, scrollerY behavior, for two-sliders mode.
- `mouseWheelScroller` : Configuration of mouse-wheel-scroller behavior.
    - `mouseWheelScroller.focus` : 
        - `true` : Only scrolling when cursor is over panel.  Default behavior.
        - `false` : Scrolling without checking cursor.
    - `mouseWheelScroller.speed` : Scrolling speed, default value is `0.1`.
    - Set to `false` to skip creating mouse-wheel-scroller. Default behavior.
- `mouseWheelScrollerX`, `mouseWheelScrollerY` : Configuration of mouse-wheel-scrollerX, or mouse-wheel-scrollerY behavior, for two-sliders mode.
- `clamplChildOY` : Set `true` to clamp scrolling.
- `clamplChildOX` : Set `true` to clamp scrolling, for two-sliders mode.
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
            - If two-sliders mode (`scrollMode` is `2`):
                - `space.panel.top`, `space.panel.bottom`, `space.panel.left`, `space.panel.right` : Top, bottom, left, right padding space of panel object.
    - `space.slider` :
        - `0` : No space around slider.
        - `space.slider.left`, `space.slider.right`, `space.slider.top`, `space.slider.bottom` : Space around slider.
    - `space.sliderX`, `space.sliderX` : Space configuration of sliderX, sliderX, for two-sliders mode.
        - `0` : No space around slider.
    - `space.header` : Space between header and panel.
    - `space.footer` : Space between footer and panel.
- `expand` : Expand width or height of element
    - `expand.header` : Set `true` to expand width or height of header game object. Default value is `true`.
    - `expand.footer` : Set `true` to expand width or height of footer game object. Default value is `true`.
    - `expand.panel` : Set `true` to expand width or height of panel game object. Default value is `true`.
- `align` : Align element
    - `align.header`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
        - `'top'`, or `Phaser.Display.Align.ALIGN.TOP_CENTER` : Align game object at top-center.
        - `'bottom'`, or `Phaser.Display.Align.ALIGN.BOTTOM_CENTER` : Align game object at bottom-center.
    - `align.footer`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
        - `'top'`, or `Phaser.Display.Align.ALIGN.TOP_CENTER` : Align game object at top-center.
        - `'bottom'`, or `Phaser.Display.Align.ALIGN.BOTTOM_CENTER` : Align game object at bottom-center.    
    - `align.panel`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
        - `'top'`, or `Phaser.Display.Align.ALIGN.TOP_CENTER` : Align game object at top-center.
        - `'bottom'`, or `Phaser.Display.Align.ALIGN.BOTTOM_CENTER` : Align game object at bottom-center.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

#### Scroll mode

If `scrollMode` parameter is not given :

- Set `scrollMode` to `2`, if configuration has `sliderX`, `sliderY`, or `scrollerX`, `scrollerY` parameters.
- Set `scrollMode` to `0`, if configuration has `sliderY`, or `scrollerY` parameters.
- Set `scrollMode` to `1`, if configuration has `sliderX`, or `scrollerX` parameters.

#### Child bounds

Scrollable panel will mask child if child's bounds (`child.getBounds()`)  is across mask area. 

**Bitmaptext game object does not have `getBounds` method**. 
User can inject it by

```javascript
const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(
    Phaser.GameObjects.BitmapText,
    [
        Components.ComputedSize,
        Components.GetBounds
    ]
);
```

### Custom class

- Define class
    ```javascript
    class MyPanel extends RexPlugins.UI.ScrollablePanel {
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
    var panel = new MyPanel(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
panel.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Scroll content

- Set
    ```javascript
    panel.childOY = oy;
    // panel.setChildOY(oy);
    ```
- Set and clamp
    ```javascript
    panel.setChildOY(oy, true);
    ```
- Add
    ```javascript
    panel.addChildOY(oy);
    ```
- Add and clamp
    ```javascript
    panel.addChildOY(oy, true);
    ```    
- Get
    ```javascript
    var childOY = panel.childOY;
    ```
- Top OY
    ```javascript
    var topOY = panel.topChildOY;
    ```
- Bottom OY
    ```javascript
    var bottomOY = panel.bottomChildOY;
    ```
- Is overflow (height of content is larger than display height)
    ```javascript
    var isOverflow = panel.isOverflow;
    ```

#### Scroll by percentage

- Set
    ```javascript
    panel.t = t;  // t: 0~1
    // panel.setT(t);  
    ```
- Set and clamp
    ```javascript    
    panel.setT(t, true);
    ```
- Get
    ```javascript
    var t = panel.t;
    ```

#### Scroll to top/bottom

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

#### Scroll to child

```javascript
panel.scrollToChild(child, align);
```

- `align` : 
    - `undefined` : Align child to top(left), or bottom(right) of panel. Default value.
    - `'top'`, `'center'`, `'bottom'` : Align child to top/center/bottom of panel.
    - `'left'`, `'center'`, `'right'` : Align child to left/center/right of panel.

#### Enable/disable scrolling

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
- Mouse-Wheel-Scroller
    - Set enable state
        ```javascript
        panel.setMouseWheelScrollerEnable(enabled);
        ```
        or
        ```javascript
        panel.mouseWheelScrollerEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = panel.mouseWheelScrollerEnable;
        ```


### Event

- Scroll
    ```javascript
    panel.on('scroll', function(panel) {
        // ...
    })
    ```
- Scroller drag start
    ```javascript
    panel.getElement('scroller').on('dragstart', function(panel) {
        // ...
    })
    ```
- Scroller drag end
    ```javascript
    panel.getElement('scroller').on('dragend', function(panel) {
        // ...
    })
    ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Get element

- Get element
    - Background game object
        ```javascript
        var background = panel.getElement('background');
        ```
    - Child-panel game object
        ```javascript
        var childPanel = panel.getElement('panel');
        ```
    - Child-panel mask game object, which is a graphics game object.
        ```javascript
        var maskGameObject = panel.getElement('mask');
        ```
    - Layer of panel, assigned at config `panel.mask.layer`.
        ```javascript
        var layer = panel.getElement('panelLayer');
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
    - Scrollable-block, registering scroller and children-interactive on it.
        ```javascript
        var scrollableBlock = panel.getElement('scrollableBlock');
        ```
- Get by name
    ```javascript
    var gameObject = panel.getElement('#' + name);
    // var gameObject = panel.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = panel.getByName(name);
    // var gameObject = panel.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Input events

Two possible solution to register input events to children of scrollable panel.

#### Set children interactive

Applies [click](button.md), [tap](gesture-tap.md), [press](gesture-press.md), [swipe](gesture-swipe.md) behaviors on this scrollable panel, to detect input events of children.

```javascript
panel.setChildrenInteractive({
    targets: targetSizers,

    // dropZone: false,

    // click: {mode: 'release', clickInterval: 100},

    // over: undefined,
    
    // press: {time: 251, threshold: 9},

    // tap: {time: 250, tapInterval: 200, threshold: 9, tapOffset: 10, 
    //       taps: undefined, minTaps: undefined, maxTaps: undefined,},

    // swipe: {threshold: 10, velocityThreshold: 1000, dir: '8dir'},

    // inputEventPrefix: 'child.',
})
```

- `targetSizers` : Array of target children-sizer.
- `dropZone` :
    - `true` : Enable [drop Zone](touchevents.md#drop-zone) on scrollable area.
    - `false` : Do nothing.


See [Base-sizer/Set children interactive](ui-basesizer.md#set-children-interactive)

##### Events

See [Base-sizer/Set children interactive/Events](ui-basesizer.md#events)

#### Individual input events

When [`scene.input.topOnly`](touchevents.md#top-only) is `true` (default value), input events of children elements will block the drag-scrolling of scrollable panel. (Assmue that the children elememts are above scrollable panel)

- Set `scene.input.topOnly` to `false` to enable drag-scrolling and input events of children elememts both.
- Test if pointer is inside the mask of panel via [`panel.isInTouching('mask')`](ui-basesizer.md#is-in-touching), during input events' callback.
- To recognize pointer-down and dragging-start, use press's [`pressstart`](gesture-press.md#pressing-start) event.
  
## Steps of building a scrollable panel

1. Build child panel from bottom to top
    - Child panel might be composed of sizers ([sizer](ui-sizer.md)/[fix-width sizer](ui-fixwidthsizer.md)/[grid sizer](ui-gridsizer.md))
    - Return child sizer from method
1. Build scrollable panel
1. Add interactive events