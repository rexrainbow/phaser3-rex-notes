## Introduction

Using plain object to create [label](ui-label.md).

- Author: Rex
- Game object

## Live demos

- [Style](https://codepen.io/rexrainbow/pen/vYaPwwq)
- [Bitmaptext](https://codepen.io/rexrainbow/pen/jOpoqzP)
- [Nine-slice background](https://codepen.io/rexrainbow/pen/BaqwOqX)
- [Wrap text](https://codepen.io/rexrainbow/pen/xxJoJLW)
- [Buttons](https://codepen.io/rexrainbow/pen/YzOxKRM)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-simplelabel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add label object
    ```javascript
    var label = scene.rexUI.add.simpleLabel(style).resetDisplayContent(config);
    //var label = scene.rexUI.add.simpleLabel(style, creators).resetDisplayContent(config);
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
- Add label object
    ```javascript
    var label = scene.rexUI.add.simpleLabel(style).resetDisplayContent(config);
    //var label = scene.rexUI.add.simpleLabel(style, creators).resetDisplayContent(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { SimpleLabel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add label object
    ```javascript    
    var label = new SimpleLabel(scene, style);
    // var label = new SimpleLabel(scene, style, creators);
    scene.add.existing(label);
    label.resetDisplayContent(config)
    ```

### Add label object

```javascript
var label = scene.rexUI.add.simpleLabel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
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

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
}, creators);
```

- `background`, `icon`, `action` : Create round-rectangle, nine-slice, or image game object, see [Style of Background, Icon, Action](#style-of-background-icon-action).
- `text` : Create text, BBCodeText, BitmapText, or Label game object, see [Style of Text](#style-of-text).
- `wrapText` : Enable WrapExpandText feature.
    - `false`, `0` : No WrapExpandText feature. Default behavior.
    - `true`, `1`, `'word'` : Word WrapExpandText.
    - `2`, `'char'` : Character WrapExpandText.
- `creators` : A series of callback to create background, text, icon, action icon game object.
    - `creators.background` : Callback to create background. Default behavior is creating a [states round rectangle](ui-statesroundrectangle.md).
        ```javascript
        function(scene, config)  {
            return gameObject;
        }
        ```
    - `creators.text` : Callback to create text. Default behavior is creating a [bbcodetext](bbcodetext.md).
        ```javascript
        function(scene, config)  {
            return gameObject;
        }
        ```
    - `creators.icon` : Callback to create icon. Default behavior is creating a [image](image.md).
        ```javascript
        function(scene, config)  {
            return gameObject;
        }
        ```
    - `creators.action` : Callback for creating action-icon. Default behavior is creating a [image](image.md).
        ```javascript
        function(scene, config)  {
            return gameObject;
        }
        ```

#### Style of Background, Icon, Action

- Create [States-round-rectangle](ui-statesroundrectangle.md), if style hs `color`, or `strokeColor` key. Default type of Background.
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
- Create [States-image](ui-statesimage.md), if style has `key` key. Default type of Icon, Action
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

#### Style of Text

- [States-Text](ui-statestext.md#create-text-object), default type of Text.
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
- [BBCodetext](bbcodetext.md#add-text-object), if set `$type` to `'bbcodetext'`.
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
- Style of statesBitmapText, if set `$type` to `'bitmaptext'`.
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
- Style of simpleLabel, if set `$type` to `'label'`.
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

### Custom class

- Define class
    ```javascript
    class MyLabel extends RexPlugins.UI.SimpleLabel {
        constructor(scene, config, creators) {
            super(scene, config, creators);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var label = new MyLabel(scene, config, creators);
    ```

### Reset display content

See [label](ui-label.md#reset-display-content)

### Layout children

Arrange position of all elements.

```javascript
label.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Set state

Override/restore properties of background game object.

!!! note 
    Assume that background, icon, text, action game objects are [states round rectangle game object](ui-statesroundrectangle.md).)

#### Active state

- Enable active state
    ```javascript
    label.setActiveState();
    // label.setActiveState(true);
    ```
    - Override properties of background declared in config with prefix `'active.'` parameters.    
- Disable active state
    ```javascript
    label.setActiveState(false);
    ```
    - Restore properties of background.

#### Hover state

- Enable active state
    ```javascript
    label.setHoverState();
    // label.setHoverState(true);
    ```
    - Override properties of background declared in config with prefix `'hover.'` parameters
- Disable active state
    ```javascript
    label.setHoverState(false);
    ```
    - Restore properties of background.

#### Disable state

- Enable disable state
    ```javascript
    label.setDisableState();
    // label.setDisableState(true);
    ```
    - Override properties of background declared in config with prefix `'disable.'` parameters
- Disable disable state
    ```javascript
    label.setDisableState(false);
    ```
    - Restore properties of background.

### Get element

See [label](ui-label.md)

### Other properties

See [label](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).