## Introduction

Control position, angle of each character drawn on a [canvas](canvas.md).

- Author: Rex
- Game object

## Live demos

- [Page typing](https://codepen.io/rexrainbow/pen/LYxoRWJ)
- [Align, rotation, drawBelowCallback](https://codepen.io/rexrainbow/pen/JjEQXqj)
- [Vertical wrap](https://codepen.io/rexrainbow/pen/oNBKpYG)
- [Character's world position](https://codepen.io/rexrainbow/pen/oNyRYZj)
- [Child input event](https://codepen.io/rexrainbow/pen/GRdrLrw)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/dynamictext)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdynamictextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdynamictextplugin.min.js', true);
    ```
- Add dynamic-text object
    ```javascript
    var txt = scene.add.rexDynamicText(x, y, width, height, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DynamicTextPlugin from 'phaser3-rex-plugins/plugins/dynamictext-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexDynamicTextPlugin',
                plugin: DynamicTextPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add dynamic-text object
    ```javascript
    var txt = scene.add.rexDynamicText(x, y, width, height, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import DynamicText from 'phaser3-rex-plugins/plugins/dynamictext.js';
    ```
- Add dynamic-text object
    ```javascript
    var txt = new DynamicText(scene, x, y, width, height, config);
    scene.add.existing(txt);
    ```

### Create instance

```javascript
var txt = scene.add.rexDynamicText({
    x: 0, 
    y: 0,
    width: undefined, 
    height: undefined,

    padding: 0,  // {left: 0, right: 0, top: 0, bottom: 0}

    background: {
        color: null,
        color2: null,
        horizontalGradient: true,

        stroke: null,
        strokeThickness: 2,

        cornerRadius: 0,
        cornerIteration: null
    },

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
        backgroundBottomY: undefined,
        offsetX: 0,
        offsetY: 0
    },

    childrenInteractive: false,

    text: '',

    wrap: undefined,

    testString: '|MÉqgy',
});
```

- `x`, `y` : Position of this dynamic-text game object.
- `width` : Fixed width.
    - A number : Width of this dynamic-text game object. 
        - Wrap-width is `width - padding.left - padding.right`.
    - `undefined` : Width of this dynamic-text game object will be set after invoked `runWordWrap` method.
- `height` : Fixed height.
    - A number : Height of this dynamic-text game object. 
    - `undefined` : Height of this dynamic-text game object will be set after invoked `runWordWrap` method.
- `padding` : Padding of bounds.
    - A number 
    - `padding.left`, `padding.right`, `padding.top`, `padding.bottom`
- `background` : Properties of background round-rectangle.
    - `background.color` : Fill color, number or string.
        - `null` : No filling.
    - `background.color2` : Gradient fill color, number or string.
        - `null` : No gradient filling.
    - `background.horizontalGradient` : Horizontal or vertical gradient filling.
        - `true` : Horizontal gradient filling.
        - `false` : Vertical gradient filling.
    - `background.stroke` : Stroke color, number or string.
        - `null` : No stroke.
    - `background.strokeThickness` : Line width of stroke.
    - `background.cornerRadius` : Corner-radius of round rectangle.
    - `background.cornerIteration` : Iteration of corner-radius.
        - `null` : Draw corner-radius via arc directly.
        - A number : Draw corner-radius via lines
- `innerBounds` : Properties of inner-bounds.
    - `innerBounds.color` : Fill color, number or string.
        - `null` : No filling.
    - `innerBounds.color2` : Gradient fill color, number or string.
        - `null` : No gradient filling.
    - `innerBounds.horizontalGradient` : Horizontal or vertical gradient filling.
        - `true` : Horizontal gradient filling.
        - `false` : Vertical gradient filling.
    - `innerBounds.stroke` : Stroke color, number or string.
        - `null` : No stroke.
    - `innerBounds.strokeThickness` : Line width of stroke.
- `style` : Initial text-style.
    - `style.bold` : Bold
    - `style.italic` : Italic
    - `style.fontSize` : Font size, number or string.
    - `style.fontFamily` : Font family
    - `style.color` : Fill color, number or string.
    - `style.stroke` : Stroke color, number or string.
    - `style.strokeThickness` : Line width of stroke.
    - `style.shadowColor` : Shadow color, number or string.
        - `null` : No shadow.
    - `style.shadowOffsetX` : OffsetX of shadow.
    - `style.shadowOffsetY` : OffsetY of shadow.
    - `style.shadowBlur` : Blur of shadow.
    - `style.backgroundColor` : Background color of a character.
    - `style.backgroundHeight`, `style.backgroundBottomY` : Background position and height of a character.
        - `undefined`, or `null` : Use height of character as background height. Default behavior.
    - `style.offsetX` : OffsetX.
    - `style.offsetY` : OffsetY.
    - `style.align` : Override default line-alignment setting.
        - `0`, `'left'`, `'top'` : Align remainder lines to left/top.
        - `1`, `'center'` : Align remainder lines to center.
        - `2`, `'right'`, `'bottom'` : Align remainder lines to right/bottom.
        - `undefined` : Use default line-alignment setting.
- `childrenInteractive` :
    - `true` : Fire input events (`'child.pointerdown'`, `'child.pointerup'`, `'child.pointerover'`, `'child.pointerout'`) of any child after `text.setInteractive()`.
    - `false` : Won't fire any input events of child. Default behavior.
- `text` : Content of text.
- `wrap` : Default configuration [Horizontal](dynamictext.md#horizontal-wrap)/[Vertical](dynamictext.md#vertical-wrap) wrapping.
- `testString` : Test string to get text ascent and text height with default text style.

or

```javascript
var txt = scene.add.rexDynamicText(x, y, width, height, config);
```

or

```javascript
var txt = scene.add.rexDynamicText(x, y, config);
```

Add dynamictext from JSON

```javascript
var txt = scene.make.rexDynamicText({
    x: 0,
    y: 0,

    // origin: {x: 0.5, y: 0.5},
    // fill: null,
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyDynamicText extends DynamicText {
        constructor(scene, x, y, width, height, config)) {
            super(scene, x, y, width, height, config));
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var txt = new MyDynamicText(scene, x, y, config);
    ```

### Clear content

```javascript
txt.clearContent();
```

### Text

#### Append text

```javascript
txt.appendText(text);
```

or

```javascript
txt.appendText(text, 
    {
        // bold: false,
        // italic: false,
        // fontSize: '16px',
        // fontFamily: 'Courier',
        // color: '#fff',
        // stroke: '#fff',
        // strokeThickness: 0,
        // shadowColor: null,
        // shadowOffsetX: 0,
        // shadowOffsetY: 0,
        // shadowBlur: 0,
        // backgroundColor: null,
        // backgroundHeight: undefined,
        // backgroundBottomY: undefined,
        // offsetY: 0,
        // offsetY: 0,
        // align: undefined
    }
);
```

To overwrite some properties of text-style.

Each [character](dynamictext.md#character-data) will be placed at position (0,0), without rotation. 
Uses [word-wrap](dynamictext.md#word-wrap) method to rearrange position of characters. 

#### Set text

```javascript
txt.setText(text);
```

or

```javascript
txt.setText(text, 
    {
        // bold: false,
        // italic: false,
        // fontSize: '16px',
        // fontFamily: 'Courier',
        // color: '#fff',
        // stroke: '#fff',
        // strokeThickness: 0,
        // shadowColor: null,
        // shadowOffsetX: 0,
        // shadowOffsetY: 0,
        // shadowBlur: 0,
        // backgroundColor: null,
        // backgroundHeight: undefined,
        // backgroundBottomY: undefined,
        // offsetY: 0,
        // offsetY: 0,
        // align: undefined
    }
);
```

#### Insert text

```javascript
txt.insertText(index, text);
```
or

```javascript
txt.insertText(index, text, 
    {
        // bold: false,
        // italic: false,
        // fontSize: '16px',
        // fontFamily: 'Courier',
        // color: '#fff',
        // stroke: '#fff',
        // strokeThickness: 0,
        // shadowColor: null,
        // shadowOffsetX: 0,
        // shadowOffsetY: 0,
        // shadowBlur: 0,
        // backgroundColor: null,
        // backgroundHeight: undefined,
        // backgroundBottomY: undefined,
        // offsetY: 0,
        // offsetY: 0,
        // align: undefined
    }
);
```

#### Remove text

```javascript
txt.removeText(index);
```

#### Get text

- Get active characters
    ```javascript
    var text = txt.text;
    ```
    or
    ```javascript
    var text = txt.getText();
    ```
- Get all characters
    ```javascript
    var text = txt.getText(false);
    ```

### Image

#### Append image

```javascript
txt.appendImage(key, frame, {
    // width
    // height
    // scaleX
    // scaleY
})
```

- `width` : Scaled-width. Aspect-ratio will be keep if no `height`, or `scaleY` is set.
- `height` : Scaled-height. Aspect-ratio will be keep if no `width`, or `scaleX` is set.

### Background

- Fill style
    ```javascript
    txt.setBackgroundColor(color);
    // txt.setBackgroundColor(color, color2, isHorizontalGradient);
    ```
- Stroke style
    ```javascript
    txt.setBackgroundStroke(color, lineWidth);
    ```
- Corner radius
    ```javascript
    txt.setBackgroundCornerRadius(radius);
    // txt.setBackgroundCornerRadius(radius, iteration)
    ```

### Inner bounds

- Fill style
    ```javascript
    txt.setInnerBoundsColor(color);
    // txt.setInnerBoundsColor(color, color2, isHorizontalGradient);
    ```
- Stroke style
    ```javascript
    txt.setInnerBoundsStroke(color, lineWidth);
    ```

### Wrap

Control characters :

- `'\n'` : New line
- `'\f'` : Page break

#### Horizontal wrap

```javascript
var result = txt.runWordWrap({
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    ascent: undefined,
    lineHeight: undefined,
    useDefaultTextHeight: false,
    maxLines: undefined,
    wrapWidth: undefined,
    letterSpacing: 0,
    hAlign: 0,
    vAlign: 0,
    charWrap: false
});
```

- `padding` :
    - `padding.top`, `padding.bottom`, `padding.left`, `padding.right` : Extra space around lines.
- `ascent`, `lineHeight` : Height of first line and remainder lines
    - `ascent` will set to `lineHeight` if `ascent` is `undefined` but `lineHeight` is not `undefined` (backward compatible)
    - Get `ascent`, `lineHeight` from default text style and test string, if `ascent`, `lineHeight` are both `undefined`
- `useDefaultTextHeight` : If parameter `lineHeight` is not given,
    - `false` : Set line height to (*total line height / maxLines*), if parameter `maxLines` is larger than `0`. Default behavior.
    - `true` : Set line height to default text height.
- `maxLines` : Lines number of this page. 
    - `0` : Wrapping whole content.
    - `undefined` : It will be set if `lineHeight` and `height` is given
- `wrapWidth` : Width of wrapping
- `letterSpacing` : Space between each character.
- `hAlign` : Horizontal alignment.
    - `0`, or `'left'` : Align to left bound.
    - `1`, or `'center'` : Align to center.
    - `2`, or `'right'` : Align to right bound.
- `vAlign` : Vertical alignment.
    - `0`, or `'top'` : Align to top bound.
    - `1`, or `'center'` : Align to center.
    - `2`, or `'bottom'` : Align to bottom bound.
- `charWrap`
    - `false` : Word wrap. Default behavior.
    - `true` : Character wrap.


##### Align

- Set vertical align mode
    ```javascript
    txt.setVAlign(vAlign);
    ```
    - `vAlign` : Vertical alignment.
        - `0`, or `'top'` : Align to top bound.
        - `1`, or `'center'` : Align to center.
        - `2`, or `'bottom'` : Align to bottom bound.
- Set horizontal align mode
    ```javascript
    txt.setHAlign(hAlign);
    ```
    - `hAlign` : Horizontal alignment.
        - `0`, or `'left'` : Align to left bound.
        - `1`, or `'center'` : Align to center.
        - `2`, or `'right'` : Align to right bound.

##### Test string

```javascript
txt.setTestString(text);
```

#### Vertical wrap

```javascript
var result = txt.runVerticalWrap({
    padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    lineWidth: undefined,
    maxLines: undefined,
    fixedChildHeight: undefined,
    charPerLine: undefined,
    wrapHeight: undefined,
    letterSpacing: 0,
    rtl: true,
    hAlign: 0,
    vAlign: 0,
});
```

- `padding` :
    - `padding.top`, `padding.bottom`, `padding.left`, `padding.right` : Extra space around lines.
- `lineWidth` : Line width. 
    - `undefined` : It will be set if `maxLines` and `fixedWidth` is given.
- `maxLines` : Lines number of this page. 
    - `0` : Wrapping whole content.
    - `undefined` : It will be set if `lineWidth` and `fixedWidth` is given.
- `fixedChildHeight` : Each character has the same fixed height.
    - `undefined` : Get `fixedChildHeight` according to `charPerLine` parameter. Or use height of each character if `fixedChildHeight` and `charPerLine` parameters are `undefined`.
- `charPerLine` : Amount of characters in each line, to get `fixedChildHeight`.
- `wrapHeight` : Height of wrapping
- `letterSpacing` : Space between each character.
- `rtl` : 
    - `true` : Place lines from right to left.
    - `false` : Place lines from left to right.
- `hAlign` : Horizontal alignment.
    - `0`, or `'left'` : Align to left bound. Default value if `rtl` is set to `false`. 
    - `1`, or `'center'` : Align to center.
    - `2`, or `'right'` : Align to right bound. Default value if `rtl` is set to `true`.
- `vAlign` : Vertical alignment.
    - `0`, or `'top'` : Align to top bound.
    - `1`, or `'center'` : Align to center.
    - `2`, or `'bottom'` : Align to bottom bound.

#### Result

```javascript
{
    children: [],
    lines: [],
    isLastPage: false
}
```

- `children` : [Character](dynamictext.md#character)/[Image](dynamictext.md#image) data in this page.
- `lines` : Array of line data. A line data contains
    ```javascript
    {
        children: [],
        width: 0,     // Horizontal-wrapping
        height: 0,    // Vertical-wrapping.        
    }
    ```
    - `children` : [Character](dynamictext.md#character)/[Image](dynamictext.md#image) data in this line.
    - `width` : Width of this line, in result of horizontal-wrapping.
    - `height` : Height of this line, in result of vertical-wrapping.
- `isLastPage` : 
    - `false` : Run `txt.runWordWrap(result)`/`txt.runVerticalWrap(result)` to get next page of word-wrapping result.
    - `true` : No remainder of characters.

#### Wrap next page

```javascript
var result = txt.runWordWrap(prevResult);
```

- `prevResult` : Result of previous word-wraping.
- `result` : Current result of word-wraping.

#### Default configuration of wrapping

```javascript
txt.setWrapConfig(config);
```

- `config` : Default configuration [Horizontal](dynamictext.md#horizontal-wrap)/[Vertical](dynamictext.md#vertical-wrap) wrapping.

### Scroll content

Scroll content by setting `textOX`, `textOY` members

- Set
    ```javascript
    txt.setTextOXY(x, y).updateTexture();    
    // txt.setTextOX(x).updateTexture();
    // txt.setTextOY(x).updateTexture(); 
    ```
    or
    ```javascript
    txt.addTextOXY(incX, incY).updateTexture(); 
    // txt.addTextOX(incX).updateTexture(); 
    // txt.addTextOY(incY).updateTexture(); 
    ```
    or
    ```javascript
    txt.textOX = x;
    txt.textOY = y;
    txt.updateTexture();
    ```
- Get
    ```javascript
    var ox = txt.textOX;
    var oy = txt.textOY;
    ```

### Child

#### General properties

- Visible :
    - Get
        ```javascript
        var visible = child.visible;
        ```
    - Set
        ```javascript
        child.setVisible();
        // child.visible = true;
        ```
        or
        ```javascript
        child.setVisible(false);  // Set to invisible
        // child.visible = false;
        ```
- Alpha
    - Get
        ```javascript
        var alpha = child.alpha;
        ```
    - Set
        ```javascript
        child.setAlpha(alpha);
        // child.alpha = alpha;
        ```
- Position :
    - Get
        ```javascript
        var x = child.x;
        var y = child.y;
        ```
    - Set
        ```javascript
        child.setPosition(x, y);
        // child.x = x;
        // child.y = y;
        ```
- Angle :
    - Get
        ```javascript
        var degrees = child.angle;
        // var radians = child.rotation;
        ```
    - Set
        ```javascript
        child.setAngle(degrees);
        child.setRotation(radians);
        // child.angle = degrees;
        // child.rotation = radians;
        ```
- Scale
    - Get
        ```javascript
        var scaleX = child.scaleX;
        var scaleY = child.scaleY;
        ```
    - Set
        ```javascript
        child.setScale(scaleX, scaleY);
        // child.scaleX = scaleX;
        // child.scaleY = scaleY;
        ```
- Draw callbacks
    - Set
        ```javascript
        child.setDrawBelowCallback(callback);
        child.setDrawAboveCallback(callback);
        ```
        - `callback` :
            ```javascript
            function(child) {
                var text = child.text;                
                var context = child.context;
                // ...
            }
            ```
- World position
    ```javascript
    var worldXY = child.getWorldPosition();
    // out = child.getWorldPosition(out);
    ```
    or
    ```javascript
    var worldXY = txt.getCharWorldPosition(char);
    // out = txt.getCharWorldPosition(char, out);
    ```

#### Character

##### Text-style

- Get
    ```javascript
    var bold = char.style.bold;
    var italic = char.style.italic;
    var fontSize = char.style.fontSize;
    var fontFamily = char.style.fontFamily;
    var color = char.style.color;
    var stroke = char.style.stroke;
    var strokeThickness = char.style.strokeThickness;
    var shaodwColor = char.style.shadowColor;
    var shadowBlur = char.style.shadowBlur;
    var shadowOffsetX = char.style.shadowOffsetX;
    var shadowOffsetY = char.style.shadowOffsetY;
    var backgroundColor = char.style.backgroundColor;
    var backgroundHeight = char.style.backgroundHeight;
    var backgroundBottomY = char.style.backgroundBottomY;
    var xOffset = char.style.x;
    var yOffset = char.style.y;
    ```
- Set
    ```javascript
    char.modifyStyle({
        // bold: false,
        // italic: false,
        // fontSize: '16px',
        // fontFamily: 'Courier',
        // color: '#fff',
        // stroke: '#fff',
        // strokeThickness: 0,
        // shaodwColor: null,
        // shadowBlur: 0,
        // shadowOffsetX: 0,
        // shadowOffsetY: 0,
        // backgroundColor: null,
        // backgroundHeight: undefined,
        // backgroundBottomY: undefined,
        // offsetX: 0,
        // offsetY: 0
    })
    ```
    or
    ```javascript
    char.setBold();
    // char.setBold(false);
    ```
    ```javascript
    char.setItalic();
    // char.setItalic(false);
    ```
    ```javascript
    char.setFontSize(fontSize); // number, string
    ```
    ```javascript
    char.setFontFamily(fontFamily);
    ```
    ```javascript
    char.setColor(color); // number, string
    // char.setColor(); // No filling color
    ```
    ```javascript
    char.setStrokeStyle(color, thickness);
    // char.setStrokeStyle();  // No stroke
    ``` 
    ```javascript
    char.setShadowColor(color);
    // char.setShadowColor();  // No shadow
    ```
    ```javascript
    char.setShadowOffset(offsetX, offsetY);
    ```
    ```javascript
    char.setShadowBlur(blur);
    ```
    ```javascript
    char.setBackgroundColor(color);
    // char.setBackgroundColor();  // No shadow
    ```
    ```javascript
    char.setOffsetX(offsetX);
    char.setOffsetY(offsetY);
    ```

#### Image

- Size
    - Get
        ```javascript
        var width = image.width;
        var height = image.height;
        ```
    - Set
        ```javascript
        image.setWidth(width);
        // image.setWidth(width, true);  // Resize and keep aspect- ratio
        image.setHeight(height);
        // image.setHeight(height, true);  // Resize and keep aspect- ratio
        ```

### For each child

- Any child
    - For each active child
        ```javascript
        txt.forEachChild(function(child, childIndex){
        }, scope)
        ```
    - For each character child
        ```javascript
        txt.forEachChild(function(child, childIndex){
        }, scope, false);
        ```
- Renderable child
    - For each active renderable child
        ```javascript
        txt.forEachRenderableChild(function(child, charIndex){
        }, scope)
        ```
    - For each renderable child
        ```javascript
        txt.forEachRenderableChild(function(child, charIndex){
        }, scope, false);
        ```
- Character child
    - For each active character child
        ```javascript
        txt.forEachCharChild(function(child, charIndex){
        }, scope)
        ```
    - For each character child
        ```javascript
        txt.forEachCharChild(function(child, charIndex){
        }, scope, false);
        ```

### Get children

- Get all children
    ```javascript
    var children = txt.getChildren();
    ```
- Get last appended children
    ```javascript
    var children = txt.getLastAppendedChildren();
    ```
- Get active children, after wrapping
    ```javascript
    var children = txt.getActiveChildren();
    ```

#### Get character children

- Get active character children
    ```javascript
    var children = txt.getCharChildren();
    ```
- Get all character children
    ```javascript
    var children = txt.getCharChildren(false);
    ```
- Get character child by character index
    ```javascript
    var child = txt.getCharChild(charIndex);
    ```

### Move child

- Move child to fist
    ```javascript
    txt.moveChildToFist(child);
    ```
- Move child to last
    ```javascript
    txt.moveChildToLast(child);
    ```
- Move child up
    ```javascript
    txt.movechildUp(child);
    ```
- Move child to down
    ```javascript
    txt.movechildDown(child);
    ```
- Move child above another child
    ```javascript
    txt.movechildAbove(child, baseChild);
    ```
- Move child below another child
    ```javascript
    txt.movechildBelow(child, baseChild);
    ```

### Size

- Resize canvas size
    ```javascript
    txt.setCanvasSize(width, height)
    ```
- Reisze text wrapping size and canvas size.
    ```javascript
    txt.setSize(width, height);
    ```
    or
    ```javascript
    txt.setFixedSize(width, height);
    ```
- Resize to minimun size to show all visible characters.
    ```javascript
    txt.setToMinSize();
    ```

### Input events of child

- Enable input events of child on [config of constructor](dynamictext.md#create-instance), or via method
    ```javascript
    txt.setChildrenInteractiveEnable();
    ```
- Pointer down/up on child
    ```javascript
    txt.on('child.pointerdown', function(child, pointer, localX, localY, event) {        
    })
    ```
    ```javascript
    txt.on('child.pointerup', function(child, pointer, localX, localY, event) {        
    })
    ```
    - `child` : Any [Character](dynamictext.md#character) or [Image](dynamictext.md#image) child
- Pointer over/out on child
    ```javascript
    txt.on('child.pointerover', function(child, pointer, localX, localY, event) {        
    })
    ```
    ```javascript
    txt.on('child.pointerout', function(child, pointer, localX, localY, event) {        
    })
    ```
    - `child` : Any [Character](dynamictext.md#character) or [Image](dynamictext.md#image) child

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = txt.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Support [preFX and postFX effects](shader-builtin.md)

### Compare with other kinds of text game object

- [Built-in text](text.md): 
    - Single color per game object.
    - Draw content line by line.
    - Best render performance.
- [BBCode text](bbcodetext.md): 
    - Multiple colors, multiple font size per gaem object.
    - Draw content segment by segment.
    - Slower than built-in text game object.
- [Dynamic text](dynamictext.md):
    - Multiple colors, multiple font size per gaem object.
    - Draw content character by character.
    - Slower than bbcode text game object.