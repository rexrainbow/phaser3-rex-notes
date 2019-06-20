## Introduction

Get press events of a game object.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gestures-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgesturesplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-press)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import GesturesPlugin from './plugins/gestures-plugin.js';

var config = {
    // ...
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var press = scene.rexGestures.add.press(gameObject, {
    // enable: true,

    // time: 251,
    // threshold: 9,
});
```

- `enable` : Set `false` to disable input events.
- `time` : Minimal time of the pointer to be pressed.
- `threshold` : Minimal movement when pointer is down.

### Enable

- Get
    ```javascript
    var enable = press.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    press.setEnable(enable);  // enable: true, or false
    ```

### Events

#### Pressing start

```javascript
press.on('pressstart', function(press){
}, scope);
```

- `press.gameObject` : Parent gameobject of this press behavior.
- `press.worldX`, `press.worldY` : World position of pressing start.
- `press.x`, `press.y` : Scene position of pressing start.

#### Pressing end

```javascript
press.on('pressend', function(press){
}, scope);
```
