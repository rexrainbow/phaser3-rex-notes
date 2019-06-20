## Introduction

Get pan events of a game object.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gestures-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgesturesplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-pan)

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
var pan = scene.rexGestures.add.pan(gameObject, {
    // enable: true,

    // threshold: 10,
});
```

- `enable` : Set `false` to disable input events.
- `threshold` : Minimal movement when pointer is down.

### Enable

- Get
    ```javascript
    var enable = pan.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    pan.setEnable(enable);  // enable: true, or false
    ```

### Events

#### Pan

```javascript
pan.on('pan', function(pan){
}, scope);
```

- `pan.dx`, `pan.dy` : Vector from previous pointer to current pointer.
- `pan.worldX`, `pan.worldY` : World position of current pointer.
- `pan.x`, `pan.y` : Scene position of current pointer.

#### Pan start

```javascript
pan.on('panstart', function(pan){
}, scope);
```

- `pan.startWorldX`, `pan.startWorldY` : World position of pan-start pointer.
- `pan.startX`, `pan.startY` : Scene position of pan-start pointer.

#### Pan end

```javascript
pan.on('panend', function(pan){
}, scope);
```

- `pan.endWorldX`, `pan.endWorldY` : World position of pan-end pointer.
- `pan.endX`, `pan.endY` : Scene position of pan-end pointer.
