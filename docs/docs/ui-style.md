# Style

## Introduction

Style in plain object for creating image, or text.

## Style of Background

Create round-rectangle, nine-slice, or image for background.

- Create [Round-rectangle](shape-roundrectangle.md), if style hs `color`, or `strokeColor` key. Default type of Background.
    ```javascript
    {
        // $type: 'roundRectangle',

        // width: 0,
        // height: 0,

        color: 0xffffff,
        // alpha: 1,
        strokeColor: 0xffffff,
        // strokeAlpha: 1,
        // strokeWidth: 2,
        // radius: 0,
        
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
- Create [Nine-slice](nineslice.md), if style has `leftWidth` key.
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
- Create [Nine-patch](ninepatch.md), if style has `leftWidth` and `stretchMode` key.
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
- Create [image](image.md), if style has `key` key.
    ```javascript
    {
        // $type: 'image',

        key:
        // frame:
        // tint: 0xffffff,
        // alpha: 1,
        // scale: 1,
    
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

## Style of Image

Create image, nine-slice, or round-rectangle for image.

- Create [image](image.md), if style has `key` key. Default type of Background.
    ```javascript
    {
        // $type: 'image',

        key:
        // frame:
        // tint: 0xffffff,
        // alpha: 1,
        // scale: 1,
    
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
- Create [Nine-slice](nineslice.md), if style has `leftWidth` key.
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
- Create [Nine-patch](ninepatch.md), if style has `leftWidth` and `stretchMode` key.
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

- Create [Round-rectangle](shape-roundrectangle.md), if style hs `color`, or `strokeColor` key.
    ```javascript
    {
        // $type: 'roundRectangle',

        // width: 0,
        // height: 0,

        color: 0xffffff,
        // alpha: 1,
        strokeColor: 0xffffff,
        // strokeAlpha: 1,
        // strokeWidth: 2,
        // radius: 0,
        
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


## Style of Text

Create text, BBCodeText, BitmapText, or SimpleLabel for text.

- [Text](text.md), default type of Text.
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
- [BBCodetext](bbcodetext.md), if set `$type` to `'bbcodetext'`.
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
    }
   ```
- Style of [bitmapText](bitmaptext.md), if set `$type` to `'bitmaptext'`.
    ```javascript
    {
        // $type: 'bitmaptext',  // or 'bitmap'

        font: '',
        fontSize: undefined,
        align: undefined,
        tint: undefined,
        letterSpacing: undefined,
        lineSpacing: undefined,

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
- Style of [simpleLabel](ui-simplelabel.md), if set `$type` to `'label'`.
    ```javascript
    {
        $type: 'label',

        // width: undefined,
        // height: undefined,
    
        orientation: 0,
        // rtl: false,
    
        background: backgroundStyle,
    
        icon: iconStyle,
        
        // iconMask: false,
        // squareFitIcon: false,
        // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,
    
        text: testStyle,
        // wrapText: false,
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