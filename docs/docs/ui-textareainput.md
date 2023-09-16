## Introduction

A container with a canvasInput, and slider.

- Author: Rex
- Game object

## Live demos

- [Text-area](https://codepen.io/rexrainbow/pen/ExGPBjd)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-textareainput)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add text-area-input object
    ```javascript
    var textAreaInput = scene.rexUI.add.textAreaInput(config);
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
- Add text-area-input object
    ```javascript
    var textAreaInput = scene.rexUI.add.textAreaInput(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { TextAreaInput } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add text-area-input object
    ```javascript
    var textAreaInput = new TextAreaInput(scene, config);
    scene.add.existing(textAreaInput);
    ```

### Add text-area-input object

```javascript
var textAreaInput = scene.rexUI.add.textAreaInput({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // Elements
    background: backgroundGameObject,

    text: {
        background: {
            color: null,
            color2: null,
            horizontalGradient: true,

            stroke: null,
            strokeThickness: 2,

            cornerRadius: 0,
            cornerIteration: null,
            
            // Style when focus
            // 'focus.color': ...
            // 'focus.color2': ...
            // 'focus.stroke': ...
        },
        focusStyle: undefined,

        innerBounds: {
            color: null,
            color2: null,
            horizontalGradient: true,

            stroke: null,
            strokeThickness: 2
        },

        style: {
            bold: false,
            italic: false,
            fontSize: '16px',
            fontFamily: 'Courier',
            color: '#fff',
            stroke: '#fff',
            strokeThickness: 0,
            shadowColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            backgroundColor: null,
            backgroundHeight: undefined,
            backgroundBY: undefined,
            offsetX: 0,
            offsetY: 0,

            // Style when cursor move on
            // 'cursor.color': ...
            // 'cursor.backgroundColor': ...
            // 'cursor.xxx': ...
        },
        cursorStyle: undefined,

        childrenInteractive: false,

        text: '',

        wrap: {
            lineHeight: undefined,
            useDefaultLineHeight: true,
            maxLines: 1,
            wrapWidth: undefined,
            letterSpacing: 0,
            hAlign: 0,
            vAlign: 'center',  // For single line text input
            charWrap: true,    // For single line text input
        },

        textArea: true,
        
        // Parameters of hidden-text-editor   
        // inputType: 'text',  // 'text'|'password'|'textarea'|...                
        
        // readOnly: false,
        // maxLength: undefined,
        // minLength: undefined,
        // selectAll: false,

        // enterClose: true,

        // Callbacks
        // onOpen: function (textObject, hiddenInputText) {
        // },

        // onClose: function (textObject, hiddenInputText) {
        // },

        // onUpdate: function (text, textObject, hiddenInputText) {
        //     return text;
        // },

        // onAddChar: function(child, index, canvasInput) {
        //    child.modifyStyle({...})
        // },

        // onCursorOut: function(child, cursorIndex, canvasInput) {
        //     child.modifyStyle({
        //         
        //     });
        // },

        // onCursorIn: function(child, cursorIndex, canvasInput) {
        //     child.modifyStyle({
        //         
        //     });
        // },

        // parseTextCallback: function(text) {
        //     return text;
        // }.        
    },
    // alwaysScrollable: false,

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


        // indicator: indicatorGameObject,
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
        //     top: topButtonGameObject, bottom: bottomButtonGameObject,
        //     left: leftButtonGameObject, right: rightButtonGameObject,
        //     step: 0.01,
        // }
    },

    // scroller: false,  // No scrollor support

    mouseWheelScroller: false,
    // mouseWheelScroller: {
    //     focus: true,
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
        
        slider: 0,
        // slider: {
        //     top: 0,
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        // },

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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of text area.
- `text` : [Configuration of CanvasInput](canvasinput.md#create-instance), or a CanvasInput game object.
- `slider` : Componments of slider, optional.
    - `slider.background` : Game object of slider background, optional.
    - `slider.track` : Game object of track.
    - `slider.thumb` : Game object of thumb.
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
- `scroller` : **No scroller supported** (`false`).
- `mouseWheelScroller` : Configuration of mouse-wheel-scroller behavior.
    - `mouseWheelScroller.focus` : 
        - `true` : Only scrolling when cursor is over textAreaInput. Default behavior.
        - `false` : Scrolling without checking cursor.
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
            - `space.text.top`, `space.text.bottom` : Top, bottom padding space of text object.
            - `space.text.right` : Space between text object and slider object.  
    - `space.slider` :
        - `0` : No space around slider.
        - `space.slider.left`, `space.slider.right`, `space.slider.top`, `space.slider.bottom` : Space around slider.
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
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyTextAreaInput extends RexPlugins.UI.TextAreaInput {
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
    var textAreaInput = new MyTextAreaInput(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
textAreaInput.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Content

- Set
    ```javascript
    textAreaInput.setText(text);
    ```
- Append
    ```javascript
    textAreaInput.appendText(text);
    ```
- Get
   ```javascript
   var text = textAreaInput.text;
   ```

### Scroll content

- Scroll down lines
    ```javascript
    textAreaInput.scrollLine(lineCount);
    ```
- Set
    ```javascript
    textAreaInput.childOY = oy;
    // textAreaInput.setChildOY(oy);
    ```
- Set and clamp
    ```javascript
    textAreaInput.setChildOY(oy, true);
    ```
- Add
    ```javascript
    textAreaInput.addChildOY(oy);
    ```
- Add and clamp
    ```javascript
    textAreaInput.addChildOY(oy, true);
    ```    
- Get
    ```javascript
    var childOY = textAreaInput.childOY;
    ```
- Top OY
    ```javascript
    var topOY = textAreaInput.topChildOY;
    ```
- Bottom OY
    ```javascript
    var bottomOY = textAreaInput.bottomChildOY;
    ```
- Is overflow (height of content is larger than display height)
    ```javascript
    var isOverflow = textAreaInput.isOverflow;
    ```

#### Scroll by percentage

- Set
    ```javascript
    textAreaInput.t = t;  // t: 0~1
    // textAreaInput.setT(t);  
    ```
- Set and clamp
    ```javascript    
    textAreaInput.setT(t, true);
    ```
- Get
    ```javascript
    var t = textAreaInput.t;
    ```

#### Scroll to top/bottom

- Scroll to top
    ```javascript
    textAreaInput.scrollToTop();
    ```
    - Equal to `textAreaInput.t = 0;`
- Scroll to bottom
    ```javascript
    textAreaInput.scrollToBottom();
    ```
    - Equal to `textAreaInput.t = 1;`

#### Scroll to line

- Scroll to next line
    ```javascript
    textAreaInput.scrollToNextLine();
    ```
- Scroll to next n line
    ```javascript
    textAreaInput.scrollToNextLine(n);
    ```
- Scroll to line
    ```javascript
    textAreaInput.scrollToLine(lineIndex);
    ```
- Get current line index
    ```javascript
    var lineIndex = textAreaInput.lineIndex;
    ```

#### Enable/disable scrolling

- Slider
    - Set enable state
        ```javascript
        textAreaInput.setSliderEnable(enabled);
        ```
        or
        ```javascript
        textAreaInput.sliderEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = textAreaInput.sliderEnable;
        ```
- Scroller
    - Set enable state
        ```javascript
        textAreaInput.setScrollerEnable(enabled);
        ```
        or
        ```javascript
        textAreaInput.scrollerEnable = enabled;
        ```
    - Get enable state
        ```javascript
        var enable = textAreaInput.scrollerEnable;
        ```

### Read only

- Enable read only
    ```javascript
    textAreaInput.setReadOnly();
    // textAreaInput.setReadOnly(true);
    ```
    or
    ```javascript
    textAreaInput.readOnly = true;
    ```
- Disable read only
    ```javascript
    textAreaInput.setReadOnly(false);
    ```
    or
    ```javascript
    textAreaInput.readOnly = false;
    ```
- Get read only
    ```javascript
    var readOnlyEanble = txt.readOnly;
    ```

### Event

- Text changed
    ```javascript
    textAreaInput.on('textchange', function(text, textAreaInput){
        // ...
    })
    ```
- Scroll
    ```javascript
    textAreaInput.on('scroll', function(textAreaInput) {
        // ...
    })
    ```
- Scroller drag start
    ```javascript
    textAreaInput.getElement('scroller').on('dragstart', function(panel) {
        // ...
    })
    ```
- Scroller drag end
    ```javascript
    textAreaInput.getElement('scroller').on('dragend', function(panel) {
        // ...
    })
    ```

### Lines count

```javascript
var linesCount = textAreaInput.linesCount;
```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Get element

- Get element
    - Background game object
        ```javascript
        var background = textAreaInput.getElement('background');
        ```
    - Text game object
        ```javascript
        var text = textAreaInput.getElement('text');
        ```
    - Slider
        - Track
            ```javascript
            var track = textAreaInput.getElement('slider.track');
            ```
        - Thumb
            ```javascript
            var thumb = textAreaInput.getElement('slider.thumb');
            ```
- Get by name
    ```javascript
    var gameObject = textAreaInput.getElement('#' + name);
    // var gameObject = textAreaInput.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = textAreaInput.getByName(name);
    // var gameObject = textAreaInput.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.