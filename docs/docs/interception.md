## Introduction

Predict the intersection position of two game objects with constant moving speed.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/interception-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexinterceptionplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/interception)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexInterception from './plugins/interception.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import InterceptionPlugin from './plugins/interception-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexInterception',
            plugin: InterceptionPlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
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