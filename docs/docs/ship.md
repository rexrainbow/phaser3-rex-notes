## Introduction

Move game object as a [space ship](https://labs.phaser.io/view.html?src=src\physics\arcade\asteroids%20movement.js) by cursor keys.

- Author: Rex
- Arcade behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ship)

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
    scene.load.plugin('rexshipplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshipplugin.min.js', true);
    ```
- Add ship behavior
    ```javascript
    var ship = scene.plugins.get('rexshipplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ShipPlugin from 'phaser3-rex-plugins/plugins/ship-plugin.js';
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
                key: 'rexShip',
                plugin: ShipPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add ship behavior
    ```javascript
    var ship = scene.plugins.get('rexShip').add(gameObject, config);
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
    import Ship from 'phaser3-rex-plugins/plugins/ship.js';
    ```
- Add ship behavior
    ```javascript
    var ship = new Ship(gameObject, config);
    ```

### Create instance

```javascript
var ship = scene.plugins.get('rexShip').add(gameObject, {
    // maxSpeed: 200,
    // acceleration: 200,
    // drag: 0.99,
    // turnSpeed: 300,
    // wrap: true,
    // padding: 0,
    // enable: true,
    // cursorKeys: scene.input.keyboard.createCursorKeys()
});
```

- Movement
    - [`maxSpeed`](arcade-body.md#max-speed)
    - [`acceleration`](arcade-body.md#acceleration)
    - [`drag`](arcade-body.md#drag)
- Rotation
    - [`turnSpeed`](arcade-body.md#angular-velocity) : Angular velocity
- [Wrap](arcade-world.md#wrap)
    - `wrap` : Set `true` to enable wrap mode. Default value is `true`.
    - `padding`
- `enable` : set `false` to disable moving.
- `cursorKeys` : CursorKey object, using [keyboard's cursorKeys](keyboardevents.md#get-state-of-cursorkeys) by default.

### Set max speed

```javascript
ship.setMaxSpeed(speed);
```

### Set acceleration

```javascript
ship.setAcceleration(acc);
```

### Set drag

```javascript
ship.setDrag(drag);
```

### Set turn speed

```javascript
ship.setTurnSpeed(angularVelocity);
```

### Set wrap mode

```javascript
ship.setWrapMode(wrap, padding);
```

- `wrap` : Set `true` to enable wrap mode.