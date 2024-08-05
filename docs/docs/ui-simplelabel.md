## Introduction

Using plain object to create [label](ui-label.md).

- Author: Rex
- Game object

## Live demos

- [Style](https://codepen.io/rexrainbow/pen/vYaPwwq)
- [Bitmaptext](https://codepen.io/rexrainbow/pen/jOpoqzP)
- [Nine-slice background](https://codepen.io/rexrainbow/pen/BaqwOqX)
- [Bar-rectangle background](https://codepen.io/rexrainbow/pen/xxNvEba)
- [Wrap text](https://codepen.io/rexrainbow/pen/xxJoJLW)
- [TextArea](https://codepen.io/rexrainbow/pen/OJGxroa)
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
    // origin: 0.5
    // originX:
    // originY:

    orientation: 0,
    // rtl: false,

    background: backgroundStyle,
    // background: null,

    icon: iconStyle,
    // icon: null,
    
    // iconMask: false,
    // squareFitIcon: false,
    // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,

    text: textStyle,
    // text: null,

    // wrapText: false,
    // adjustTextFontSize: false,
    // expandTextWidth: false,
    // expandTextHeight: false,

    action: actionStyle,
    // action: null,

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
});
```

- `background` : 
    - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Bar-rectangle, Nine-slice, or Image as background element.
    - `null` : Don't create any game object.
- `text` : 
    - [Style of Text](ui-style.md#style-of-text) : Create Text, BBCodeText, BitmapText, SimpleLabel, or TextArea as text element.
    - `null` : Don't create any game object.
- `icon`, `action` : 
    - [Style of Image](ui-style.md#style-of-image) : Create Image, Nine-slice, or Round-rectangle as image, action element.
    - `null` : Don't create any game object.

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

Override/restore properties of elements.

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