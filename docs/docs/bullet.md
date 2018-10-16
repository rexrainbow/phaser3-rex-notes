## Introduction

Move game object toward current angle of game object, with a constant speed.

- Author: Rex
- Arcade behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/bullet-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexbulletplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bullet)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexBullet from './plugins/bullet.js';
```

### Install global plugin

Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)

```javascript
import BulletPlugin from './plugins/bullet-plugin.js';

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
            key: 'rexBullet',
            plugin: BulletPlugin,
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
var bullet = scene.plugins.get('rexBullet').add(gameObject, {
    speed: 200,
    // enable: true
});
```

- `speed` : moving speed, pixels in second.
- `enable` : set `false` to disable moving.

### Speed

- Set
    ```javascript
    bullet.setSpeed(speed);
    // bullet.speed = speed;
    ```
- Get
    ```javascript
    var speed = bullet.speed;
    ```