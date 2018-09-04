## Introduction

Rotate game object towards target position with a steady speed.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/rotateto-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexrotatetoplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/rotateto)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexRotateTo from './plugins/rotateto.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import RotateToPlugin from './plugins/rotateto-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexRotateTo',
            plugin: RotateToPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var rotateTo = scene.plugins.get('rexRotateTo').add(gameObject, {
    // speed: 180
});
```

- `speed` : Turn speed, degrees in second

### Start moving

#### Rotate game object towards position

- Shortest angle
    ```javascript
    rotateTo.rotateTowardsPosition(x, y);
    ```
    - `x` , `y` : Target position
- Clockwise/counter-clockwise
    ```javascript
    rotateTo.rotateTowardsPosition(x, y, dir);
    // rotateTo.rotateTowardsPosition(x, y, dir, speed);
    ```
    - `dir` :
        - `0` : Shortest angle
        - `1`, or `'cw'` : Clockwise
        - `2`, or `'ccw'` : Counter-clockwise

#### Rotate game object to angle

- Shortest angle
    ```javascript
    rotateTo.rotateTo(angle);
    ```
    - `angle` : Target angle in degrees
- Clockwise/counter-clockwise
    ```javascript
    rotateTo.rotateTo(angle, dir);
    // rotateTo.rotateTo(angle, dir, speed);
    ```
    - `dir` :
        - `0` : Shortest angle
        - `1`, or `cw` : Clockwise
        - `2`, or `ccw` : Counter-clockwise

### Stop moving

```javascript
rotateTo.stop();
```

### Set speed

```javascript
rotateTo.setSpeed(speed);
// rotateTo.speed = speed;
```

- `speed` : Turn speed, degrees in second

### Events

- On reached target
    ```javascript
    rotateTo.on('complete', function(rotateTo, gameObject){});
    ```

### Status

- Is moving
    ```javascript
    var isMoving = rotateTo.isMoving;
    ```
