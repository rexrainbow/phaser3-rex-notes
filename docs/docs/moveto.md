## Introduction

Move game object towards target position with a steady speed.

- Author: Rex
- Behavior of game object

## Live demos

- [Move-to](https://codepen.io/rexrainbow/pen/YOPONx)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/moveto)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);
    ```
- Add move-to behavior
    ```javascript
    var moveTo = scene.plugins.get('rexmovetoplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin.js';
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
- Add move-to behavior
    ```javascript
    var moveTo = scene.plugins.get('rexMoveTo').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';
    ```
- Add move-to behavior
    ```javascript
    var moveTo = new MoveTo(gameObject, config);
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

- Move to target position
    ```javascript
    moveTo.moveTo(x, y);
    ```
    or
    ```javascript
    moveTo.moveTo({
        x: 0,
        y: 0,
        // speed: 0
    });
    ```
    - `x` , `y` : Target position    
- Move from start position to current position
    ```javascript
    moveTo.moveFrom(x, y);
    ```
    or
    ```javascript
    moveTo.moveFrom({
        x: 0,
        y: 0,
        // speed: 0
    });
    ```
    - `x` , `y` : Start position
- Move toward angle
    ```javascript
    moveTo.moveToward(angle, distance);
    ```
    - `angle` : Angle in radian.

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
