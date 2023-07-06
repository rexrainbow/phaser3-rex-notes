## Introduction

Using plain object to create [text game object](text.md), with active, hover, disable styles.

- Author: Rex
- Game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-statestext)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add text object
    ```javascript
    var txt = scene.rexUI.add.statesText(config);
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
- Add text object
    ```javascript
    var txt = scene.rexUI.add.statesText(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { StatesText } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add sizer object
    ```javascript
    var txt = new StatesText(scene, config);
    scene.add.existing(txt);
    ```

### Create text object

```javascript
var txt = scene.rexUI.add.statesText({
    x: 0,
    y: 0,

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
});
```

- `width`, `height` : Size of rectangle.
    - `undefined` : Set ot `undefined` to draw a circle.
- `key`, `frame` : Texture.
- `'active.fontFamily'`, `'active.fontSize'`, `'active.fontStyle'`, `'active.backgroundColor'`, `'active.color'`,  `'active.fill'`, `'active.stroke'`, `'active.strokeThickness'` ... ect : Override these properties in [active state](ui-statestext.md#active-state)
- `'hover.fontFamily'`, `'hover.fontSize'`, `'hover.fontStyle'`, `'hover.backgroundColor'`, `'hover.color'`,  `'hover.fill'`, `'hover.stroke'`, `'hover.strokeThickness'` ... ect : Override these properties in [hover state](ui-statestext.md#hover-state)
- `'disable.fontFamily'`, `'disable.fontSize'`, `'disable.fontStyle'`, `'disable.backgroundColor'`, `'disable.color'`,  `'disable.fill'`, `'disable.stroke'`, `'disable.strokeThickness'` ... ect : Override these properties in [disable state](ui-statestext.md#disable-state)

### Custom class

- Define class
    ```javascript
    class MyStatesText extends RexPlugins.UI.StatesText {
        constructor(scene, config) {
            super(scene, config);
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
    var txt = new MyStatesText(scene, config);
    ```

### Set state

#### Active state

- Enable active state
    ```javascript
    txt.setActiveState();
    // txt.setActiveState(true);
    ```
    - Override properties declared in config with prefix `'active.'` parameters.    
- Disable active state
    ```javascript
    txt.setActiveState(false);
    ```
    - Restore properties.

#### Hover state

- Enable active state
    ```javascript
    txt.setHoverState();
    // txt.setHoverState(true);
    ```
    - Override properties declared in config with prefix `'hover.'` parameters
- Disable active state
    ```javascript
    txt.setHoverState(false);
    ```
    - Restore properties.

#### Disable state

- Enable disable state
    ```javascript
    txt.setDisableState();
    // txt.setDisableState(true);
    ```
    - Override properties declared in config with prefix `'disable.'` parameters
- Disable active state
    ```javascript
    txt.setDisableState(false);
    ```
    - Restore properties.

### Other properties

See [Text](text.md), [game object](gameobject.md)
