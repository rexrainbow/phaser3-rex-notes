## Introduction

Move game object by cursor keys, with a constant speed.

- Author: Rex
- Arcade behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/eightdirection-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexeightdirectionplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/eightdirection)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexEightDirection from './plugins/eightdirection.js';
```

### Install global plugin

Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)

```javascript
import EightDirectionPlugin from './plugins/eightdirection-plugin.js';

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

### Create instance

```javascript
var eightDirection = scene.plugins.get('rexEightDirection').add(gameObject, {
    speed: 200,
    // dir: '8dir',     // 0|'up&down'|1|'left&right'|2|'4dir'|3|'8dir'
    // rotateToDirection: false,
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
