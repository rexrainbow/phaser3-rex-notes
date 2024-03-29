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

- `background` : Create round-rectangle, nine-slice, or image for background. See [Style of Background](ui-style.md#style-of-background)
- `text` : Create text, BBCodeText, BitmapText, or SimpleLabel for text. See [Style of Text](ui-style.md#style-of-text)
- `icon`, `action` : Create image, nine-slice, or round-rectangle for image. See [Style of Image](ui-style.md#style-of-image)
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