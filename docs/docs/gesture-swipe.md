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

- Swipe input
    ```javascript
    var swipe = scene.rexGestures.add.swipe({
        // enable: true,
        // bounds: undefined,
    
        // threshold: 10,
        // velocityThreshold: 1000,
        // dir: '8dir',
    });
    ```
    - `enable` : Set `false` to disable input events.
    - `bounds` : Touch detecting area [rectangle](geom-rectangle.md), if game obect is not given.
        - `undefined` : Ignore this feature, default behavior.
    - `time` : Max time of the pointer to be down.
    - `threshold` : Minimal movement when pointer is down.
    - `velocityThreshold` : Minimal dragging speed.
    - `dir` : 
        - `'up&down'`, or `0` : Get `up` or `down` state only.
        - `'left&right'`, or `1` : Get `left` or `right` state only.
        - `'4dir'`, or `2` : Get `up`, `down`, `left` or `right` state.
        - `'8dir'`, or `3` : Get `up`, `up`/`left`, `up`/`right`, `down`, `down`/`left`, `down`/`right`, `left`, or `right` state.
- Swipe behavior of game object
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
    // swipe.enable = enable;
    ```
- Toggle
    ```javascript
    swipe.toggleEnable();
    ```

### Events

#### Swipe

```javascript
swipe.on('swipe', function(swipe, gameObject, lastPointer){
}, scope);
```

- `swipe.left`, `swipe.right`, `swipe.up`, `swipe.down` : Swipe direction states.
- `swipe.worldX`, `swipe.worldY` : World position of swiping start.
- `swipe.x`, `swipe.y` : Scene position of swiping start.
- `swipe.dragVelocity` : Velocity of dragging.
- `gameObject`, `swipe.gameObject` : Parent gameobject of this pan behavior.
- `lastPointer` : Last touch pointer.

### Is swiped

```javascript
var isSwiped = swipe.isSwiped;
```

Return `true` if panning.

### Other properties

- Drag threshold
    - Get
        ```javascript
        var dragThreshold = swipe.dragThreshold;
        ```
    - Set
        ```javascript
        swipe.setDragThreshold(dragThreshold);
        // swipe.dragThreshold = dragThreshold;
        ```
- Velocity threshold
    - Get
        ```javascript
        var velocityThreshold = swipe.velocityThreshold;
        ```
    - Set
        ```javascript
        swipe.setVelocityThreshold(velocityThreshold);
        // swipe.velocityThreshold = velocityThreshold;
        ```
- Direction mode
    - Get
        ```javascript
        var dirMode = swipe.dirMode;  // 0,1,2,3
        ```
    - Set
        ```javascript
        swipe.setDirectionMode(dirMode);  // 0,1,2,3,'up&down','left&right','4dir','8dir'
        // swipe.dirMode = dirMode;  // 0,1,2,3
        ```   
- Detect bounds
    - Get
        ```javascript
        var bounds = swipe.bounds;
        ```
    - Set
        ```javascript
        swipe.setDetectBounds(bounds);
        // swipe.bounds = bounds;
        ```