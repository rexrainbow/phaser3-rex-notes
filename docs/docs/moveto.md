## Introduction

Move game object towards target position with a steady speed.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/moveto-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexmovetoplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/moveto)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexMoveTo from './plugins/moveto.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import MoveToPlugin from './plugins/moveto-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexMoveTo',
            plugin: MoveToPlugin,
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
var moveTo = scene.plugins.get('rexMoveTo').add(gameObject, {
    // speed: 400,
    // rotateToTarget: false
});
```

- `speed` : Moving speed, pixels in second.
- `rotateToTarget` : Set true to change angle towards path.

### Start moving

```javascript
moveTo.moveTo(x, y);
```

- `x` , `y` : Target position

or

```javascript
var config = {
    x: 0,
    y: 0,
    // speed: 0
}
moveTo.moveTo(config);
```

### Enable

- Enable (default)
    ```javascript
    moveTo.setEnable();
    ```
    or
    ```javascript
    moveTo.enable = true;
    ```
- Disable
    ```javascript
    moveTo.setEnable(false);
    ```
    or
    ```javascript
    moveTo.enable = false;
    ```

### Pause, Resume, stop moving

```javascript
moveTo.pause();
moveTo.resume();
moveTo.stop();
```

### Set speed

```javascript
moveTo.setSpeed(speed);
// moveTo.speed = speed;
```

### Set rotate-to-target

```javascript
moveTo.setRotateToTarget(rotateToTarget);
```

- `rotateToTarget` : Set true to change angle towards target

### Events

- On reached target
    ```javascript
    moveTo.on('complete', function(gameObject, moveTo){});
    // moveTo.once('complete', function(gameObject, moveTo){});
    ```

### Status

- Is moving
    ```javascript
    var isRunning = moveTo.isRunning;
    ```
