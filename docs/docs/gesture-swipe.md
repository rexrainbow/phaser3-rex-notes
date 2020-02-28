## Introduction

Get swipe events of a game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Swipe](https://codepen.io/rexrainbow/pen/joWZbw)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-swipe)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexgesturesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
    ```
- Add swipe input
    ```javascript
    var swipe = scene.rexGestures.add.swipe(config);
    // var swipe = scene.rexGestures.add.swipe(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexGestures',
                plugin: GesturesPlugin,
                mapping: 'rexGestures'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add swipe input
    ```javascript
    var swipe = scene.rexGestures.add.swipe(config);
    // var swipe = scene.rexGestures.add.swipe(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Swipe } from 'phaser3-rex-plugins/plugins/gestures.js';
    ```
- Add swipe input
    ```javascript
    var swipe = new Swipe(scene, config);
    // var swipe = new Swipe(gameObject, config);
    ```

### Create instance

- Pan input
    ```javascript
    var swipe = scene.rexGestures.add.swipe({
        // enable: true,
    
        // threshold: 10,
        // velocityThreshold: 1000,
        // dir: '8dir',
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
- Pan behavior of game object
    ```javascript
    var swipe = scene.rexGestures.add.swipe(gameObject, {
        // enable: true,
    
        // threshold: 10,
        // velocityThreshold: 1000,
        // direction: '8dir',
    });
    ```

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
- `swipe.worldX`, `swipe.worldY` : World position of swiping start.
- `swipe.x`, `swipe.y` : Scene position of swiping start.
- `swipe.dragVelocity` : Velocity of dragging.
