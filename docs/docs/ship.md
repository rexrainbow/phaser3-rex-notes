## Introduction

Move game object as a [space ship](https://labs.phaser.io/view.html?src=src\physics\arcade\asteroids%20movement.js) by cursor keys.

- Author: Rex
- Arcade behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/ship-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexshipplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ship)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexShip from './plugins/ship.js';
```

### Install global plugin

Enable [arcade physics engine](arcade-world.md) and install plugin in [configuration of game](game.md#configuration)

```javascript
import ShipPlugin from './plugins/ship-plugin.js';

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
    - `wrap` : Set `true` to enable wrap mode.
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