## Introduction

Rotate game object towards target position with a steady speed.

- Author: Rex
- Behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/rotateto)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexrotatetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexrotatetoplugin.min.js', true);
    ```
- Add rotate-to behavior
    ```javascript
    var rotateTo = scene.plugins.get('rexrotatetoplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RotateToPlugin from 'phaser3-rex-plugins/plugins/rotateto-plugin.js';
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
- Add rotate-to behavior
    ```javascript
    var rotateTo = scene.plugins.get('rexRotateTo').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RotateTo from 'phaser3-rex-plugins/plugins/rotateto.js';
    ```
- Add rotate-to behavior
    ```javascript
    var rotateTo = new RotateTo(gameObject, config);
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
    - `speed` : Turn speed, degrees in second

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
    - `speed` : Turn speed, degrees in second

### Enable

- Enable (default)
    ```javascript
    rotateTo.setEnable();
    ```
    or
    ```javascript
    rotateTo.enable = true;
    ```
- Disable
    ```javascript
    rotateTo.setEnable(false);
    ```
    or
    ```javascript
    rotateTo.enable = false;
    ```

### Pause, Resume, stop rotating

```javascript
rotateTo.pause();
rotateTo.resume();
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
    rotateTo.on('complete', function(gameObject, rotateTo){});
    ```

### Status

- Is moving
    ```javascript
    var isRunning = rotateTo.isRunning;
    ```
