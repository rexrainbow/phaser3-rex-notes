## Introduction

A behavior attached to a game object that toggles fullscreen mode when the object is clicked.

- Author: Rex
- Behavior

## Live demos

- [Full screen button]()

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-fullscreenbutton)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add fullscreen-button behavior
    ```javascript
    scene.rexUI.add.fullscreenButton(gameObject, config);
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
- Add fullscreen-button behavior
    ```javascript
    scene.rexUI.add.fullscreenButton(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { FullscreenButton } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add fullscreen-button behavior
    ```javascript    
    new FullscreenButton(gameObject, config);
    ```

### Add fullscreen-button behavior

```javascript
scene.rexUI.add.fullscreenButton(gameObject, {
    onEnter: undefined,
    onLeave: undefined,
});
```

- `onEnter` :
    - A string or `{key, frame}` : Set [texture key](gameobject.md#texture) while entering fullscreen
    - A callback : Invoking while entering fullscreen
        ```javascript
        function(gameObject) {
            // ...
        }
        ```
- `onLeave` :
    - A string or `{key, frame}` : Set [texture key](gameobject.md#texture) while leaving fullscreen
    - A callback : Invoking while leaving fullscreen
        ```javascript
        function(gameObject) {
            // ...
        }
        ```

### Custom class

- Define class
    ```javascript
    class MyFullscreenButton extends RexPlugins.UI.FullscreenButton {
        constructor(gameObject, config) {
            super(gameObject, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    new MyFullscreenButton(gameObject, config);
    ```

### Other properties

See [Click/button behavior](button.md)