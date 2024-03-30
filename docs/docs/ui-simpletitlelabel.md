## Introduction

Using plain object to create [title-label](ui-titlelabel.md).

- Author: Rex
- Game object

## Live demos

- [Style](https://codepen.io/rexrainbow/pen/KKYXJaz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-simpletitlelabel)

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
    import { SimpleTitleLabel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add label object
    ```javascript    
    var label = new SimpleTitleLabel(scene, style);
    // var label = new SimpleTitleLabel(scene, style, creators);
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

    layoutMode: 0,

    // rtl: false,

    background: backgroundStyle,
    // background: null,

    innerBackground: backgroundStyle,
    // innerBackground: null,

    icon: iconStyle,
    // icon: null,
    
    // iconMask: false,
    // squareFitIcon: false,
    // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,

    title: textStyle,
    // title: null,
    // wrapTitle: false,
    // expandTitleWidth: false,
    // expandTitleHeight: false,

    text: testStyle,
    // text: null,
    // wrapText: false,
    // expandTextWidth: false,
    // expandTextHeight: false,

    separator: separatorStyle,
    // separator: null,

    action: actionStyle,
    // action: null,

    // squareFitAction: false,
    // actionMask: false,
    // actionSize: undefined, actionWidth: undefined, actionHeight: undefined,

    space: {
        left: 0, right: 0, top: 0, bottom:0, 
        icon: 0, text: 0
    }

    align: {
        title: 'left',
        text: 'left',
    },

    space: {
        left: 0, right: 0, top: 0, bottom: 0,
        innerLeft: 0, innerRight: 0, innerTop: 0, innerBottom: 0,

        title: 0, titleLeft: 0, titleRight: 0,
        icon: 0, iconTop: 0, iconBottom: 0,
        text: 0, textLeft: 0, textRight: 0,
        separator: 0, separatorLeft: 0, separatorRight: 0,
        actionTop: 0, actionBottom: 0,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

- `background`, `innerBackground` : 
    - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Nine-slice, or Image as background element.
    - `null` : Don't create any game object.
- `title` : 
    - [Style of Text](ui-style.md#style-of-text) : Create Text, BBCodeText, BitmapText, SimpleTitleLabel, or TextArea as title element.
    - `null` : Don't create any game object.
- `text` : 
    - [Style of Text](ui-style.md#style-of-text) : Create Text, BBCodeText, BitmapText, SimpleTitleLabel, or TextArea as text element.
    - `null` : Don't create any game object.
- `separator` : 
    - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Nine-slice, or Image as separator element.
    - `null` : Don't create any game object.
- `icon`, `action` : 
    - [Style of Image](ui-style.md#style-of-image) : Create Image, Nine-slice, or Round-rectangle as image, action element.
    - `null` : Don't create any game object.
- `wrapTitle` : Enable WrapExpandText feature.
    - `false`, `0` : No WrapExpandText feature. Default behavior.
    - `true`, `1`, `'word'` : Word WrapExpandText.
    - `2`, `'char'` : Character WrapExpandText.
- `wrapText` : Enable WrapExpandText feature.
    - `false`, `0` : No WrapExpandText feature. Default behavior.
    - `true`, `1`, `'word'` : Word WrapExpandText.
    - `2`, `'char'` : Character WrapExpandText.


### Custom class

- Define class
    ```javascript
    class MyLabel extends RexPlugins.UI.SimpleTitleLabel {
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

See [title-label](ui-titlelabel.md#reset-display-content)

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

See [title-label](ui-titlelabel.md#get-element)

### Other properties

See [title-label](ui-titlelabel.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).