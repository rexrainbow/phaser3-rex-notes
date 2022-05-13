## Introduction

A container with a text, slider, and scroller.

- Author: Rex
- Game object

## Live demos

- [Text-area](https://codepen.io/rexrainbow/pen/JzBZzy)
- [Bitmap text](https://codepen.io/rexrainbow/pen/YzNRRaz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-textarea)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add text-area object
    ```javascript
    var textArea = scene.rexUI.add.textArea(config);
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
- Add text-area object
    ```javascript
    var textArea = scene.rexUI.add.textArea(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { TextArea } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add text-area object
    ```javascript
    var textArea = new TextArea(scene, config);
    scene.add.existing(textArea);
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
    // textMask: false,
    // alwaysScrollable: false,

    slider: {
        // background: sliderBackgroundGameObject,
        track: trackGameObject,
        thumb: thumbGameObject,
        // input: 'drag',
        // position: 'right',
        // adaptThumbSize: false,
        // minThumbSize: undefined,
        
        // buttons: {
        //     top: topButtonGameObject, bottom: bottomButtonGameObject,
        //     left: leftButtonGameObject, right: rightButtonGameObject,
        //     step: 0.01,
        // }
    },

    scroller: {
        threshold: 10,
        slidingDeceleration: 5000,
        backDeceleration: 2000,
        pointerOutRelease: true,
    },

    mouseWheelScroller: false,
    // mouseWheelScroller: {
    //     focus: false,
    //     speed: 0.1
    // },

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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of text area.
- `text` : [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), or [bitmap text object](bitmaptext.md)
- `textWidth` : Fixed width of text game object. Set `undefined` to ignore this feature.
- `textHeight` : Fixed height of text game object. Set `undefined` to ignore this feature.
- `textMask` :
    - `false` : Crop text game object. Default behavior if text game object has `setCrop` method.
    - `true` : Apply mask on text to crop text game object. Default behavior if text game object does not have `setCrop` method (ex. bitmaptext game object).
- `slider` : Componments of slider, optional.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of track.
    - `slider.thumb` : Game object of thumb.
    - `slider.input` :
        - `'pan'`, `'drag'`, or `0` : Control slider by panning/dragging thumb game object. Default setting.
        - `'click'`, or `1` : Control slider by touching track game object.
        - `'none'`, or `-1` : Disable sider controlling.
    - `slider.position` : Position of this sldier.
        - `0`, `'right'`, `'bottom'` : Sldier at right/bottom side. Default value.
        - `1`, `'left'`, `'top'` : Sldier at left/top side.
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
- `scroller` : Configuration of scroller behavior.
    - `scroller.threshold` : Minimal movement to scroll. Set `0` to scroll immediately.
    - `scroller.slidingDeceleration` : Deceleration of slow down when dragging released.
        - Set `false` to disable it.
    - `scroller.backDeceleration` : Deceleration of pull back when out of bounds.
        - Set `false` to disable it.
    - `scroller.pointerOutRelease` : Set to `true` to release input control when pointer out of gameObject.
    - Set to `false` to skip creating scroller.
- `mouseWheelScroller` : Configuration of mouse-wheel-scroller behavior.
    - `mouseWheelScroller.focus` : 
        - `true` : Only scrolling when cursor is over textArea.
        - `false` : Scrolling without checking cursor. Default behavior.
    - `mouseWheelScroller.speed` : Scrolling speed, default value is `0.1`.
    - Set to `false` to skip creating mouse-wheel-scroller. Default behavior.
- `clamplChildOY` : Set `true` to clamp scrolling.
- `alwaysScrollable` : 
    - `false` : Can't scroll if content is less then 1 page. Default behavior.
    - `true` : Can scroll in all cases
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
    - `expand.footer` : Set `true` to expand width or height of footer game object.
- `align` : Align element
    - `align.header`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `align.footer`
- `content` : Content of this text area.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyTextArea extends RexPlugins.UI.TextArea {
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
    var textArea = new MyTextArea(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
textArea.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

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
    textArea.childOY = oy;
    // textArea.setChildOY(oy);
    ```
- Set and clamp
    ```javascript
    textArea.setChildOY(oy, true);
    ```
- Add
    ```javascript
    textArea.addChildOY(oy);
    ```
- Add and clamp
    ```javascript
    textArea.addChildOY(oy, true);
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
- Is overflow (height of content is larger than display height)
    ```javascript
    var isOverflow = textArea.isOverflow;
    ```

#### Scroll by percentage

- Set
    ```javascript
    textArea.t = t;  // t: 0~1
    // textArea.setT(t);  
    ```
- Set and clamp
    ```javascript    
    textArea.setT(t, true);
    ```
- Get
    ```javascript
    var t = textArea.t;
    ```

#### Scroll to top/bottom

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

#### Enable/disable scrolling

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

### Event

- Scroll
    ```javascript
    textArea.on('scroll', function(textArea) {
        // ...
    })
    ```
- Scroller drag start
    ```javascript
    textArea.getElement('scroller').on('dragstart', function(panel) {
        // ...
    })
    ```
- Scroller drag end
    ```javascript
    textArea.getElement('scroller').on('dragend', function(panel) {
        // ...
    })
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
    // var gameObject = textArea.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = textArea.getByName('#' + name);
    // var gameObject = textArea.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.