## Introduction

Get swipe events of a game object.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gestures-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgesturesplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-swipe)

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
var swipe = scene.rexGestures.add.swipe(gameObject, {
    // enable: true,

    // threshold: 10,
    // velocityThreshold: 1000,
    // direction: '8dir',
});
```

- `enable` : Set `false` to disable input events.
- `time` : Max time of the pointer to be down.
- `threshold` : Minimal movement when pointer is down.
- `velocityThreshold` : Minimal dragging speed.
- `dir` : 
    - `'up&down'`, or `0` : Get `up` or `down` state only.
    - `'left&right'`, or `1` : Get `left` or `right` state only.
    - `'4dir'`, or `2` : Get `up`, `down`, `left` or `right` state.
    - `'8dir'`, or `3` : Get `up`, `up`/`left`, `up`/`right`, `down`, `down`/`left`, `down`/`right`, `left`, or `right` state.

### Enable

- Get
    ```javascript
    var enable = swipe.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    swipe.setEnable(enable);  // enable: true, or false
    ```

### Events

#### Swipe

```javascript
swipe.on('swipe', function(swipe){
}, scope);
```

- `swipe.left`, `swipe.right`, `swipe.up`, `swipe.down` : Swipe direction states.
- `swipe.dragVelocity` : Velocity of dragging.
