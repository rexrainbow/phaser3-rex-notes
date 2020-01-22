## Introduction

Predict the intersection position of two game objects with constant moving speed.

- Author: Rex
- Behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/interception)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexinterceptionplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinterceptionplugin.min.js', true);
    ```
- Add interception behavior
    ```javascript
    var interception = scene.plugins.get('rexinterceptionplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import InterceptionPlugin from 'phaser3-rex-plugins/plugins/interception-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexInterception',
                plugin: InterceptionPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add interception behavior
    ```javascript
    var interception = scene.plugins.get('rexInterception').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Interception from 'phaser3-rex-plugins/plugins/interception.js';
    ```
- Add interception behavior
    ```javascript
    var interception = new Interception(gameObject, config);
    ```

### Create instance

```javascript
var interception = scene.plugins.get('rexInterception').add(gameObject, {
    // target: undefined,
    // enable: true
});
```

- `target` : Game object.
- `enable` : Set `true` to enable predicting.

### Target

- Set
    ```javascript
    interception.setTarget(gameObject);
    ```
    or
    ```javascript
    interception.target = gameObject;
    ```
- Disalbe
    ```javascript
    interception.setTarget(undefined);
    ```
    or
    ```javascript
    interception.target = undefined;
    ```
- Get
    ```javascript
    var target = interception.target;
    ```

### Enable predicting

- Enable
    ```javascript
    interception.setEnable();
    ```
- Disable, uses target position as predicted position
    ```javascript
    interception.setEnable(false);
    ```

### Predicted result

- Predicted position
    ```javascript
    var position = interception.predictedPosition; // {x, y}
    ```
- Angle to predicted position
    ```javascript
    var rotation = interception.predictedAngle; // Angle in radian
    ```