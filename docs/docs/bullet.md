## Introduction

Move game object toward current angle of game object, with a constant speed.

- Author: Rex
- Arcade behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bullet)

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
    scene.load.plugin('rexbulletplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbulletplugin.min.js', true);
    ```
- Add bullet behavior
    ```javascript
    var bullet = scene.plugins.get('rexbulletplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BulletPlugin from 'phaser3-rex-plugins/plugins/bullet-plugin.js';
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
- Add bullet behavior
    ```javascript
    var bullet = scene.plugins.get('rexBullet').add(gameObject, config);
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
    import Bullet from 'phaser3-rex-plugins/plugins/bullet.js';
    ```
- Add bullet behavior
    ```javascript
    var bullet = new Bullet(gameObject, config);
    ```

### Create instance

```javascript
var bullet = scene.plugins.get('rexBullet').add(gameObject, {
    speed: 200,
    // wrap: false,
    // padding: 0,
    // enable: true
});
```

- `speed` : moving speed, pixels in second.
- [Wrap](arcade-world.md#wrap)
    - `wrap` : Set `true` to enable wrap mode. Default value is `false`.
    - `padding`
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

### Set wrap mode

```javascript
ship.setWrapMode(wrap, padding);
```

- `wrap` : Set `true` to enable wrap mode.