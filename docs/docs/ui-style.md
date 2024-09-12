# Style

## Introduction

Style in plain object for creating image, or text.

## Style of Background

Create [Round-rectangle](shape-roundrectangle.md), [Nine-slice](nineslice.md), [Nine-patch](ninepatch.md), or [Image](image.md) for background.

- Create [Round-rectangle](shape-roundrectangle.md), if [style](ui-style.md#style-of-round-rectangle) has `color`, or `strokeColor` key. Default type of Background.
- Create [Line-progress](shape-lineprogress.md), if [style](ui-style.md#style-of-bar-rectangle) has `bar` key.
- Create [Nine-slice](nineslice.md), if [style](ui-style.md#style-of-nine-slice) has `leftWidth` key.
- Create [Nine-patch](ninepatch.md), if [style](ui-style.md#style-of-nine-patch) has `leftWidth` and `stretchMode` key.
- Create [Image](image.md), if [style](ui-style.md#style-of-image-game-object) has `key` key.

## Style of Image

Create [Image](image.md), [Nine-slice](nineslice.md), [Nine-patch](ninepatch.md), or [Round-rectangle](shape-roundrectangle.md) for image.

- Create [Image](image.md), if [style](ui-style.md#style-of-image-game-object) has `key` key. Default type of Background.
- Create [Nine-slice](nineslice.md), if [style](ui-style.md#style-of-nine-slice) has `leftWidth` key.
- Create [Nine-patch](ninepatch.md), if [style](ui-style.md#style-of-nine-patch) has `leftWidth` and `stretchMode` key.
- Create [Round-rectangle](shape-roundrectangle.md), if [style](ui-style.md#style-of-round-rectangle) has `color`, or `strokeColor` key.

## Style of Text

Create [Text](text.md), [BBCodetext](bbcodetext.md), [BitmapText](bitmaptext.md), [SimpleLabel](ui-simplelabel.md), or [TextArea](ui-textarea.md) for text.

- [Text](text.md), by [style](ui-style.md#style-of-text-game-object), default type of Text.
- [BBCodetext](bbcodetext.md), by [style](ui-style.md#style-of-bbcodetext).
- [BitmapText](bitmaptext.md), by [style](ui-style.md#style-of-bitmaptext).
- [SimpleLabel](ui-simplelabel.md), by [style](ui-style.md#style-of-simplelabel).
- [TextArea](ui-textarea.md), by [style](ui-style.md#style-of-textarea).

## Style of Image game object

```javascript
{
    // $type: 'image',

    key:
    // frame:
    // tint: 0xffffff,
    // alpha: 1,
    // scale: 1,
    // flipX: false,
    // flipY: false,
    // origin:
    // originX: 
    // originY:

    // effects: true,
    // Style override in active state
    // 'active.key': undefined,
    // 'active.frame': undefined,
    // 'active.tint': undefined,
    // 'active.alpha': undefined,
    // 'active.scale': undefined,
    // 'active.glowColor': null,
    // ...

    // Style override in hover state
    // 'hover.key': undefined,
    // 'hover.frame': undefined,
    // 'hover.tint': undefined,
    // 'hover.alpha': undefined,
    // 'hover.scale': undefined,
    // 'hover.glowColor': null,
    // ...

    // Style override in disable state
    // 'disable.key': undefined,
    // 'disable.frame': undefined,
    // 'disable.tint': undefined,
    // 'disable.alpha': undefined,
    // 'disable.scale': undefined,
    // 'disable.glowColor': null,
    // ...    
}
```

## Style of Nine-slice

```javascript
{
    // $type: 'nineSlice',

    key: ,
    frame: ,
    leftWidth: , 
    rightWidth: ,
    topHeight: , 
    bottomHeight: ,
    // tint: 0xffffff,
    // alpha: 1,
    // scale: 1,
    // flipX: false,
    // flipY: false,
    // origin:
    // originX: 
    // originY:
    // width: 0,
    // height: 0,

    // effects: true,

    // Style override in active state
    // 'active.key': undefined,
    // 'active.frame': undefined,
    // 'active.tint': undefined,
    // 'active.alpha': undefined,
    // 'active.scale': undefined,
    // 'active.glowColor': null,
    // ...

    // Style override in hover state
    // 'hover.key': undefined,
    // 'hover.frame': undefined,
    // 'hover.tint': undefined,
    // 'hover.alpha': undefined,
    // 'hover.scale': undefined,
    // 'hover.glowColor': null,
    // ...

    // Style override in disable state
    // 'disable.key': undefined,
    // 'disable.frame': undefined,
    // 'disable.tint': undefined,
    // 'disable.alpha': undefined,
    // 'disable.scale': undefined,
    // 'disable.glowColor': null,
    // ...  
}
```

## Style of Nine-patch

```javascript
{
    // $type: 'nineSlice',

    key: ,
    frame: ,
    leftWidth: , 
    rightWidth: ,
    topHeight: , 
    bottomHeight: ,
    stretchMode: ,
    // tint: 0xffffff,
    // alpha: 1,
    // scale: 1,
    // flipX: false,
    // flipY: false,
    // origin:
    // originX: 
    // originY:
    // width: 0,
    // height: 0,

    // effects: true,

    // Style override in active state
    // 'active.key': undefined,
    // 'active.frame': undefined,
    // 'active.tint': undefined,
    // 'active.alpha': undefined,
    // 'active.scale': undefined,
    // 'active.glowColor': null,
    // ...

    // Style override in hover state
    // 'hover.key': undefined,
    // 'hover.frame': undefined,
    // 'hover.tint': undefined,
    // 'hover.alpha': undefined,
    // 'hover.scale': undefined,
    // 'hover.glowColor': null,
    // ...

    // Style override in disable state
    // 'disable.key': undefined,
    // 'disable.frame': undefined,
    // 'disable.tint': undefined,
    // 'disable.alpha': undefined,
    // 'disable.scale': undefined,
    // 'disable.glowColor': null,
    // ...  
}
```

## Style of Round-rectangle

```javascript
{
    // $type: 'roundRectangle',

    color: 0xffffff,
    // alpha: 1,
    // origin:
    // originX: 
    // originY:
    strokeColor: 0xffffff,
    // strokeAlpha: 1,
    // strokeWidth: 2,
    // radius: 0,
    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    // width: 0,
    // height: 0,

    // Style override in active state
    // 'active.color': undefined,
    // 'active.alpha': undefined,
    // 'active.strokeColor': undefined,
    // 'active.strokeAlpha': undefined,
    // 'active.strokeWidth': undefined,
    // 'active.radius': undefined,
    // 'active.xxx': ...

    // Style override in hover state
    // 'hover.color': undefined,
    // 'hover.alpha': undefined,
    // 'hover.strokeColor': undefined,
    // 'hover.strokeAlpha': undefined,
    // 'hover.strokeWidth': undefined,
    // 'hover.radius': undefined,
    // 'hover.xxx': ...

    // Style override in disable state
    // 'disable.color': undefined,
    // 'disable.alpha': undefined,
    // 'disable.strokeColor': undefined,
    // 'disable.strokeAlpha': undefined,
    // 'disable.strokeWidth': undefined,
    // 'disable.radius': undefined,
    // 'disable.xxx': ...
}
```

## Style of bar-rectangle

Bar-rectangle = Line-progress

```javascript
{
    // $type: 'bar',

    barColor: 0xffffff,
    // easeDuration: 200,
    // ease: 'Quad',
    // rtl: false,

    // alpha: 1,
    // origin:
    // originX: 
    // originY:
    // color: 0xffffff,
    // strokeColor: 0xffffff,
    // strokeAlpha: 1,
    // strokeWidth: 2,    
    // width: 0,
    // height: 0,

    // Style override in active state
    // 'active.barColor': undefined,
    // 'active.color': undefined,
    // 'active.alpha': undefined,
    // 'active.strokeColor': undefined,
    // 'active.strokeAlpha': undefined,
    // 'active.strokeWidth': undefined,
    // 'active.radius': undefined,
    // 'active.xxx': ...

    // Style override in hover state
    // 'hover.barColor': undefined,
    // 'hover.color': undefined,
    // 'hover.alpha': undefined,
    // 'hover.strokeColor': undefined,
    // 'hover.strokeAlpha': undefined,
    // 'hover.strokeWidth': undefined,
    // 'hover.radius': undefined,
    // 'hover.xxx': ...,
    // 'hover.bar: true,

    // Style override in disable state
    // 'disable.barColor': undefined,
    // 'disable.color': undefined,
    // 'disable.alpha': undefined,
    // 'disable.strokeColor': undefined,
    // 'disable.strokeAlpha': undefined,
    // 'disable.strokeWidth': undefined,
    // 'disable.radius': undefined,
    // 'disable.xxx': ...
}
```

## Style of Text game object

```javascript
{
    // $type: 'text',

    // Normal text-style
    fontFamily: 'Courier',
    fontSize: '16px',
    fontStyle: '',
    backgroundColor: null,
    color: '#fff',
    stroke: '#fff',
    strokeThickness: 0,
    shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#000',
        blur: 0,
        stroke: false,
        fill: false
    },
    align: 'left',  // 'left'|'center'|'right'|'justify'
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
        width: null,
        callback: null,
        callbackScope: null,
        useAdvancedWrap: false
    },
    metrics: false,
    // metrics: {
    //     ascent: 0,
    //     descent: 0,
    //     fontSize: 0
    // },

    // tint: 0xffffff,
    // alpha: 1,
    // scale: 1,
    // flipX: false,
    // flipY: false,
    // origin:
    // originX: 
    // originY:
    
    // Style override in active state
    'active.fontFamily': undefined,
    'active.fontSize': undefined,
    'active.fontStyle': undefined,
    'active.backgroundColor': undefined,
    'active.color': undefined,
    'active.fill': undefined,
    'active.stroke': undefined,
    'active.strokeThickness': undefined,
    
    // Style override in hover state
    'hover.fontFamily': undefined,
    'hover.fontSize': undefined,
    'hover.fontStyle': undefined,
    'hover.backgroundColor': undefined,
    'hover.color': undefined,
    'hover.fill': undefined,
    'hover.stroke': undefined,
    'hover.strokeThickness': undefined,
    
    // Style override in disable state
    'disable.fontFamily': undefined,
    'disable.fontSize': undefined,
    'disable.fontStyle': undefined,
    'disable.backgroundColor': undefined,
    'disable.color': undefined,
    'disable.fill': undefined,
    'disable.stroke': undefined,
    'disable.strokeThickness': undefined,
}
```

## Style of BBCodeText

```javascript
{
    $type: 'bbcodetext', // or 'bbcode'

    fontFamily: 'Courier',
    fontSize: '16px',
    fontStyle: '',
    backgroundColor: null,
    color: '#fff',
    stroke: '#fff',
    strokeThickness: 0,
    shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#000',
        blur: 0,
        stroke: false,
        fill: false
    },
    align: 'left',  // 'left'|'center'|'right'|'justify'
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wrap: {
        mode: 'none'     // 0|'none'|1|'word'|2|'char'|'character'|3|'mix'
        width: null
    },
    // wordWrap: { width: 0 },   // Compatible with Text game object
    metrics: false,
    // metrics: {
    //     ascent: 0,
    //     descent: 0,
    //     fontSize: 0
    // },

    // tint: 0xffffff,
    // alpha: 1,
    // scale: 1,
    // flipX: false,
    // flipY: false,
    // origin:
    // originX: 
    // originY:
}
```

## Style of BitmapText

```javascript
{
    // $type: 'bitmaptext',  // or 'bitmap'

    font: '',
    fontSize: undefined,
    align: undefined,
    tint: undefined,
    letterSpacing: undefined,
    lineSpacing: undefined,

    // tint: 0xffffff,
    // alpha: 1,
    // scale: 1,
    // origin:
    // originX: 
    // originY:

    // Style override in active state
    'active.font': undefined,
    'active.fontSize': undefined,
    'active.tint': undefined,
    'active.letterSpacing': undefined,
    'active.lineSpacing': undefined,

    // Style override in hover state
    'hover.font': undefined,
    'hover.fontSize': undefined,
    'hover.tint': undefined,
    'hover.letterSpacing': undefined,
    'hover.lineSpacing': undefined,

    // Style override in disable state
    'disable.font': undefined,
    'disable.fontSize': undefined,
    'disable.tint': undefined,
    'disable.letterSpacing': undefined,
    'disable.lineSpacing': undefined,
}
```

## Style of SimpleLabel

```javascript
{
    $type: 'label',

    // width: undefined,
    // height: undefined,
    // origin:
    // originX:
    // originY:

    orientation: 0,
    // rtl: false,

    background: backgroundStyle,

    icon: iconStyle,
    
    // iconMask: false,
    // squareFitIcon: false,
    // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,

    text: testStyle,
    // wrapText: false,  // false|'word'|'char',
    // adjustTextFontSize: false,
    // expandTextWidth: false,
    // expandTextHeight: false,

    action: actionStyle,

    // squareFitAction: false,
    // actionMask: false,
    // actionSize: undefined, actionWidth: undefined, actionHeight: undefined,

    space: {
        left: 0, right: 0, top: 0, bottom:0, 
        icon: 0, text: 0
    }

    align: undefined,  // 'left' | 'top' | 'right' | 'bottom' | 'center
}    
```

- `background` : 
    - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Nine-slice, or Image as background element.
    - `null` : Don't create any game object.
- `text` : 
    - [Style of Text](ui-style.md#style-of-text) : Create Text, BBCodeText, BitmapText, SimpleLabel, or TextArea as text element.
    - `null` : Don't create any game object.
- `icon`, `action` : 
    - [Style of Image](ui-style.md#style-of-image) : Create Image, Nine-slice, or Round-rectangle as image, action element.
    - `null` : Don't create any game object.

## Style of TextArea

```javascript
{
    $type: 'textarea',

    space: { left: 0, right: 0, top: 0, bottom: 0, text: 0, },
    
    // width:
    // height:
    // origin:
    // originX:
    // originY:

    background: backgroundStyle,

    text: textStyle,

    // textWidth: undefined,
    // textHeight: undefined,
    // textMask: false,
    // alwaysScrollable: false,

    slider: {
        track: backgroundStyle,

        thumb: backgroundStyle,

        // input: 'drag',
        // position: 'right',

        // hideUnscrollableSlider: false,
        // adaptThumbSize: false,
        // minThumbSize: undefined,
    },
    // slider: null,

    // scroller: {
    //     threshold: 10,
    //     slidingDeceleration: 5000,
    //     backDeceleration: 2000,
    //     pointerOutRelease: true,
    //     dragRate: 1,
    // },

    mouseWheelScroller: false,
    // mouseWheelScroller: {
    //     focus: true,
    //     speed: 0.1
    // },

    clampChildOY: false,
}
```
- `background` : 
    - [Style of Background](ui-style.md#style-of-background) : Create round-rectangle, nine-slice, or image as background element.
    - `null` : Don't create any game object.
- `text` : 
    - [Style of Text](ui-style.md#style-of-text) : Create text, BBCodeText, BitmapText, or SimpleLabel as text element.
    - `null` : Don't create any game object.
- `slider` :
    - `slider.track` : 
        - [Style of Background](ui-style.md#style-of-background) : Create round-rectangle, nine-slice, or image as track element.
        - `null` : Don't create any game object.    
    - `slider.thumb` :
        - [Style of Background](ui-style.md#style-of-background) : Create round-rectangle, nine-slice, or image as thumb element.
        - `null` : Don't create any game object.    
    - `null`, or `false` : Don't create any game object for slider.

## Style of CanvasInput

[CanvasInput](canvasinput.md#create-instance)

```javascript
{
    width: undefined, 
    height: undefined,

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
}
```
