## Introduction

Using plain object to create [image game object](image.md), with active, hover, disable styles.

- Author: Rex
- Game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-statesimage)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add image object
    ```javascript
    var image = scene.rexUI.add.statesImage(config);
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
- Add image object
    ```javascript
    var image = scene.rexUI.add.statesImage(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { StatesImage } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add sizer object
    ```javascript
    var image = new StatesImage(scene, config);
    scene.add.existing(image);
    ```

### Create image object

```javascript
var image = scene.rexUI.add.statesImage({
    x: 0,
    y: 0,
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

});
```

- `width`, `height` : Size of rectangle.
    - `undefined` : Set ot `undefined` to draw a circle.
- `key`, `frame` : Texture.
- `effects` : [Add effect properties](effect-properties.md)
    - `true` : Add all effect properties.
    - `false` : Don't add any effect property.
    - [A plain object](effect-properties.md#attach-properties) : Add specific effect properties.
- `'active.key'`, `'active.frame'`, `'active.tint'`, `'active.alpha'`, `'active.scale'`, ... ect : Override these properties in [active state](ui-statesimage.md#active-state)
- `'active.glowColor`, .... etc : Override these [effect properties](effect-properties.md#effect-properties) in [active state](ui-statesimage.md#active-state)
- `'hover.key'`, `'hover.frame'`, `'hover.tint'`, `'hover.alpha'`, `'hover.scale'`, ... ect : Override these properties in [hover state](ui-statesimage.md#hover-state)
- `'hover.glowColor`, .... etc : Override these [effect properties](effect-properties.md#effect-properties) in [hover state](ui-statesimage.md#hover-state)
- `'disable.key'`, `'disable.frame'`, `'disable.tint'`, `'disable.alpha'`, `'disable.scale'`, ... ect : Override these properties in [disable state](ui-statesimage.md#disable-state)
- `'disable.glowColor`, .... etc : Override these [effect properties](effect-properties.md#effect-properties) in [disable state](ui-statesimage.md#disable-state)

### Custom class

- Define class
    ```javascript
    class MyStatesImage extends RexPlugins.UI.StatesImage {
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
    var image = new MyStatesImage(scene, config);
    ```

### Set state

#### Active state

- Enable active state
    ```javascript
    image.setActiveState();
    // image.setActiveState(true);
    ```
    - Override properties declared in config with prefix `'active.'` parameters.    
- Disable active state
    ```javascript
    image.setActiveState(false);
    ```
    - Restore properties.

#### Hover state

- Enable active state
    ```javascript
    image.setHoverState();
    // image.setHoverState(true);
    ```
    - Override properties declared in config with prefix `'hover.'` parameters
- Disable active state
    ```javascript
    image.setHoverState(false);
    ```
    - Restore properties.

#### Disable state

- Enable disable state
    ```javascript
    image.setDisableState();
    // image.setDisableState(true);
    ```
    - Override properties declared in config with prefix `'disable.'` parameters
- Disable active state
    ```javascript
    image.setDisableState(false);
    ```
    - Restore properties.

### Other properties

See [Image](image.md), [game object](gameobject.md)
