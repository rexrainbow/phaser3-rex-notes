## Introduction

Move game object by cursor keys, with a constant speed.

- Author: Rex
- Arcade behavior of game object

## Live demos

- [Virtual-joyStick + Eight-direction](https://codepen.io/rexrainbow/pen/KxWpWa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/eightdirection)

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
    scene.load.plugin('rexeightdirectionplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexeightdirectionplugin.min.js', true);
    ```
- Add eight-direction behavior
    ```javascript
    var eightDirection = scene.plugins.get('rexeightdirectionplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import EightDirectionPlugin from 'phaser3-rex-plugins/plugins/eightdirection-plugin.js';
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
                key: 'rexEightDirection',
                plugin: EightDirectionPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add eight-direction behavior
    ```javascript
    var eightDirection = scene.plugins.get('rexEightDirection').add(gameObject, config);
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
    import EightDirection from 'phaser3-rex-plugins/plugins/eightdirection.js';
    ```
- Add eight-direction behavior
    ```javascript
    var eightDirection = new EightDirection(gameObject, config);
    ```

### Create instance

```javascript
var eightDirection = scene.plugins.get('rexEightDirection').add(gameObject, {
    speed: 200,
    // dir: '8dir',     // 0|'up&down'|1|'left&right'|2|'4dir'|3|'8dir'
    // rotateToDirection: false,
    // wrap: false,
    // padding: 0,
    // enable: true,
    // cursorKeys: scene.input.keyboard.createCursorKeys()
});
```

- `speed` : moving speed, pixels in second.
- `dir` :
    - `'up&down'`, or `0` :Aaccept up or down cursor keys only.
    - `'left&right'`, or `1` : Aaccept left or right cursor keys only.
    - `'4dir'`, or `2` : Aaccept up, down, left or right cursor keys.
    - `'8dir'`, or `3` : Aaccept up, up-left, up-right, down, down-left, down-right, left, or right cursor keys.
- `rotateToDirection` : Set true to change angle towards moving direction.
- [Wrap](arcade-world.md#wrap)
    - `wrap` : Set `true` to enable wrap mode. Default value is `false`.
    - `padding`
- `enable` : set `false` to disable moving.
- `cursorKeys` : CursorKey object, using [keyboard's cursorKeys](keyboardevents.md#get-state-of-cursorkeys) by default.

### Set speed

```javascript
eightDirection.setSpeed(speed);
// eightDirection.speed = speed;
```

### Set rotate-to-direction

```javascript
eightDirection.setRotateToDirection(rotateToDirection);
```

- `rotateToDirection` : Set true to change angle towards moving direction

### Set direction mode

```javascript
eightDirection.setDirMode(dir);
```

- `dir` :
    - `'up&down'`, or `0` :Aaccept up or down cursor keys only.
    - `'left&right'`, or `1` : Aaccept left or right cursor keys only.
    - `'4dir'`, or `2` : Aaccept up, down, left or right cursor keys.
    - `'8dir'`, or `3` : Aaccept up, up-left, up-right, down, down-left, down-right, left, or right cursor keys.

### Set wrap mode

```javascript
ship.setWrapMode(wrap, padding);
```

- `wrap` : Set `true` to enable wrap mode.