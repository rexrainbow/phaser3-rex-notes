## Introduction

Rotate game object continually with a steady speed.

- Author: Rex
- Behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/rotate)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexrotateplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexrotateplugin.min.js', true);
    ```
- Add rotate behavior
    ```javascript
    var rotate = scene.plugins.get('rexrotateplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RotatePlugin from 'phaser3-rex-plugins/plugins/rotate-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRotate',
                plugin: RotatePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add rotate behavior
    ```javascript
    var rotate = scene.plugins.get('rexRotate').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Rotate from 'phaser3-rex-plugins/plugins/rotate.js';
    ```
- Add rotate behavior
    ```javascript
    var rotate = new Rotate(gameObject, config);
    ```

### Create instance

```javascript
var rotate = scene.plugins.get('rexRotate').add(gameObject, {
    // speed: 180,
    // enable: true,
    // timeScale: 1,
});
```

- `speed` : Turn speed, degrees in second

### Enable

- Enable (default)
    ```javascript
    rotate.setEnable();
    ```
    or
    ```javascript
    rotate.enable = true;
    ```
- Disable
    ```javascript
    rotate.setEnable(false);
    ```
    or
    ```javascript
    rotate.enable = false;
    ```

### Set speed

```javascript
rotate.setSpeed(speed);
// rotate.speed = speed;
```

- `speed` : Turn speed, degrees in second

### Status

- Is rotating
    ```javascript
    var enable = rotate.enable;
    // var isRunning = rotate.isRunning;
    ```
