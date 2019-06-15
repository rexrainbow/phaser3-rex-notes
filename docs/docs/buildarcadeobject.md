## Introduction

Create arcade body, and inject arcade object methods.

- Author: Rex
- Arcade behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/buildarcadeobject-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexbuildarcadeobjectplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/build-arcade-object)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexBuildArcadeObject from './plugins/buildarcadeobject.js';
```

### Install global plugin

Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)

```javascript
import BuildArcadeObjectPlugin from './plugins/buildarcadeobject-plugin.js';

var config = {
    // ...
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    plugins: {
        global: [{
            key: 'rexBuildArcadeObject',
            plugin: BuildArcadeObjectPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Inject arcade object methods

- Create dynamic arcade body
    ```javascript
    var gameObject = scene.plugins.get('rexBuildArcadeObject').build(gameObject);
    // var gameObjects = scene.plugins.get('rexBuildArcadeObject').build(gameObjects);
    ```
- Create static arcade body
    ```javascript
    var gameObject = scene.plugins.get('rexBuildArcadeObject').build(gameObject, true);
    // var gameObjects = scene.plugins.get('rexBuildArcadeObject').build(gameObjects, true);
    ```
