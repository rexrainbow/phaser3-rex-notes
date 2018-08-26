## Introduction

Move game object towards target position with a constant speed.

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
    // speed: 0,
    // rotateToTarget: false,
    // rotationOffset: 0,
    // angleOffset: 0
});
```

- `speed` : moving speed, pixels in second
- `rotateToTarget` : Set true to change angle towards path
- `rotationOffset` : Rotation offset in radian, or `angleOffset` in degrees

### Start moving

```javascript
moveTo.moveTo(x, y);
// moveTo.moveTo(x, y, speed);
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

### Stop moving

```javascript
moveTo.stop();
```

### Set speed

```javascript
moveTo.setSpeed(speed);
// moveTo.speed = speed;
```

### Set rotate-to-target

```javascript
moveTo.setRotateToTarget(rotateToTarget, rotationOffset);
```

- `rotateToTarget` : Set true to change angle towards target
- `rotationOffset` : Rotation offset in radian

### Events

- On reached target
    ```javascript
    moveTo.on('complete', function(moveTo, gameObject){});
    ```

### Status

- Is moving
    ```javascript
    var isMoving = moveTo.isMoving;
    ```
