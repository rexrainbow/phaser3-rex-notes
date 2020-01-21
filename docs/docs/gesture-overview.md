## Install plugin

### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexgesturesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
    ```
- Object factories : `scene.rexGestures.add.xxx(config)`

### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexGestures',
                plugin: GesturesPlugin,
                mapping: 'rexGestures'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Object factories : `scene.rexGestures.add.xxx(config)`

## List of gesture plugins

### One pointer gesture

- [Tap](gesture-tap.md)
- [Press](gesture-press.md)
- [Swipe](gesture-swipe.md)
- [Pan](gesture-pan.md)

### Two pointers gesture

- [Pinch](gesture-pinch.md)
- [Rotate](gesture-rotate.md)