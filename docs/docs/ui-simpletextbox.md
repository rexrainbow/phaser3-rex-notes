## Introduction

Using plain object to create [textBox](ui-textbox.md).

- Author: Rex
- Game object

## Live demos

- [Inner sizer](https://codepen.io/rexrainbow/pen/OJGxdzJ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-simpletextbox)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add textBox object
    ```javascript
    var textBox = scene.rexUI.add.simpleTextBox(style).resetDisplayContent(config);
    //var textBox = scene.rexUI.add.simpleTextBox(style, creators).resetDisplayContent(config);
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
- Add textBox object
    ```javascript
    var textBox = scene.rexUI.add.simpleTextBox(style).resetDisplayContent(config);
    //var textBox = scene.rexUI.add.simpleTextBox(style, creators).resetDisplayContent(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { SimpleTextBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add textBox object
    ```javascript    
    var textBox = new SimpleTextBox(scene, style);
    // var textBox = new SimpleTextBox(scene, style, creators);
    scene.add.existing(textBox);
    textBox.resetDisplayContent(config)
    ```

### Add textBox object

```javascript
var textBox = scene.rexUI.add.simpleTextBox({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

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

    // page: { 
    //    maxLines: undefined,
    //    pageBreak: '\f\n',
    // },
    // typing: { 
    //    wrap: false,
    //    speed: 333,    
    // },

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
    - [Style of Text](ui-style.md#style-of-text) : Create Text, BBCodeText, BitmapText, SimpleLabel, or TextArea as title element.        
    - `null` : Don't create any game object.
- `text` : 
    - [Style of Text](ui-style.md#style-of-text) : Create Text, BBCodeText, BitmapText as text element.
        - Don't use SimpleLabel, or TextArea as text element.
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
    class MyTextBox extends RexPlugins.UI.SimpleTextBox {
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
    var textBox = new MyTextBox(scene, config, creators);
    ```

### Reset display content

See [title-label](ui-titlelabel.md#reset-display-content)

### Layout children

Arrange position of all elements.

```javascript
textBox.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Typing

See [textBox](ui-textbox.md#typing)

### Get element

See [textBox](ui-textbox.md#get-element)

### Events

See [textBox](ui-textbox.md#events)

### Other properties

See [textBox](ui-textbox.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).