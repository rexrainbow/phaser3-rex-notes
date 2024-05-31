## Introduction

Create arcade body, and inject arcade object methods.

- Author: Rex
- Arcade behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/build-arcade-object)

### Install plugin

#### Load minify file

- Enable [arcade physics engine](arcade-world.md) in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        // ...
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true
            }
        }
    }
    var game = new Phaser.Game(config);
    ```
- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbuildarcadeobjectplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuildarcadeobjectplugin.min.js', true);
    ```
- Inject arcade object methods
    ```javascript
    var gameObject = scene.plugins.get('rexbuildarcadeobjectplugin').build(gameObject);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BuildArcadeObjectPlugin from 'phaser3-rex-plugins/plugins/buildarcadeobject-plugin.js';
    var config = {
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true
            }
        },
        // ...
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
- Inject arcade object methods
    ```javascript
    var gameObject = scene.plugins.get('rexBuildArcadeObject').build(gameObject);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable [arcade physics engine](arcade-world.md) in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        // ...
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true
            }
        }
    }
    var game = new Phaser.Game(config);
    ```
- Import class
    ```javascript
    import BuildArcadeObject from 'phaser3-rex-plugins/plugins/buildarcadeobject.js';
    ```
- Inject arcade object methods
    ```javascript
    var gameObject = BuildArcadeObject(gameObject);
    ```

### Inject arcade object methods

- Inject arcade method to game object
    ```javascript
    scene.plugins.get('rexBuildArcadeObject').injectMethods(gameObject);
    // scene.physics.add.existing(gameObject);        // Dynamic arcade body
    // scene.physics.add.existing(gameObject, true);  // Static arcade body
    ```
- Inject arcade method to game object class
    ```javascript
    scene.plugins.get('rexBuildArcadeObject').injectMethods(GameObjectClass.prototype);
    ```
- Inject arcade method to root of all game object class
    ```javascript
    scene.plugins.get('rexBuildArcadeObject').injectMethodsToRootClass();
    ```
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
