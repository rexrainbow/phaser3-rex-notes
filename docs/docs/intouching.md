## Introduction

Fires 'intouch' event every tick when pressing on a game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Cooldown](https://codepen.io/rexrainbow/pen/zYpvPwj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/intouching)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexintouchingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexintouchingplugin.min.js', true);
    ```
- Add intouching behavior
    ```javascript
    var intouching = scene.plugins.get('rexintouchingplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import InTouchingPlugin from 'phaser3-rex-plugins/plugins/intouching-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexInTouchingn',
                plugin: InTouchingPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add intouching behavior
    ```javascript
    var intouching = scene.plugins.get('rexInTouchingn').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import InTouching from 'phaser3-rex-plugins/plugins/intouching.js';
    ```
- Add intouching behavior
    ```javascript
    var intouching = new InTouching(gameObject, config);
    ```

### Create instance

```javascript
var intouching = scene.plugins.get('rexInTouching').add(gameObject, {
    // enable: true,
    // cooldown: undefined
});
```

- `enable` : Clickable.
- `cooldown` : Fire 'intouch' event every tick, or periodically.
    - `undefined` : Fire 'intouch' event every tick.

### Events

- In-touching
    ```javascript
    intouching.on('intouch', function (intouching, gameObject, pointer) {
        // ...
    }, scope);
    ```

### Enable

- Get
    ```javascript
    var enabled = intouching.enable;  // enabled: true, or false
    ```
- Set
    ```javascript
    intouching.setEnable(enabled);  // enabled: true, or false
    // intouching.enable = enabled;
    ```
- Toggle
    ```javascript
    intouching.toggleEnable();
    ```

### Cooldown

- Get
    ```javascript
    var cooldownTime = intouching.cooldownTime;
    ```
- Set
    ```javascript
    intouching.setCooldown(time);
    ```
    or
    ```javascript
    intouching.cooldownTime = cooldownTime;
    ```
