## Introduction

Get pan events of a game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Pan & rotate](https://codepen.io/rexrainbow/pen/PvNEPy)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-pan)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexgesturesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
    ```
- Add pan input
    ```javascript
    var pan = scene.rexGestures.add.pan(config);
    // var pan = scene.rexGestures.add.pan(gameObject, config);
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
- Add pan input
    ```javascript
    var pan = scene.rexGestures.add.pan(config);
    // var pan = scene.rexGestures.add.pan(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Pan } from 'phaser3-rex-plugins/plugins/gestures.js';
    ```
- Add pan input
    ```javascript
    var pan = new Pan(scene, config);
    // var pan = new Pan(gameObject, config);
    ```

### Create instance

- Pan input
    ```javascript
    var pan = scene.rexGestures.add.pan({
        // enable: true,
        // bounds: undefined,
    
        // threshold: 10,
    });
    ```
    - `enable` : Set `false` to disable input events.
    - `bounds` : Touch detecting area [rectangle](geom-rectangle.md), if game obect is not given.
        - `undefined` : Ignore this feature, default behavior.
    - `threshold` : Minimal movement when pointer is down.
- Pan behavior of game object
    ```javascript
    var pan = scene.rexGestures.add.pan(gameObject, {
        // enable: true,
    
        // threshold: 10,
    });
    ```

### Enable

- Get
    ```javascript
    var enable = pan.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    pan.setEnable(enable);  // enable: true, or false
    // pan.enable = enable;
    ```
- Toggle
    ```javascript
    pan.toggleEnable();
    ```

### Events

#### Pan

```javascript
pan.on('pan', function(pan, gameObject, lastPointer){
}, scope);
```

- `pan.dx`, `pan.dy` : Vector from previous pointer to current pointer.
- `pan.worldX`, `pan.worldY` : World position of current pointer.
- `pan.x`, `pan.y` : Scene position of current pointer.
- `gameObject`, `pan.gameObject` : Parent gameobject of this pan behavior.
- `lastPointer` : Last touch pointer.

#### Pan start

```javascript
pan.on('panstart', function(pan, gameObject, lastPointer){
}, scope);
```

- `pan.startWorldX`, `pan.startWorldY` : World position of pan-start pointer.
- `pan.startX`, `pan.startY` : Scene position of pan-start pointer.
- `gameObject`, `pan.gameObject` : Parent gameobject of this pan behavior.
- `lastPointer` : Last touch pointer.

#### Pan end

```javascript
pan.on('panend', function(pan, gameObject, lastPointer){
}, scope);
```

- `pan.endWorldX`, `pan.endWorldY` : World position of pan-end pointer.
- `pan.endX`, `pan.endY` : Scene position of pan-end pointer.
- `gameObject`, `pan.gameObject` : Parent gameobject of this pan behavior.
- `lastPointer` : Last touch pointer.

### Is panned

```javascript
var isPanned = pan.isPanned;
```

Return `true` if panned.

### Other properties

- Drag threshold
    - Get
        ```javascript
        var dragThreshold = pan.dragThreshold;
        ```
    - Set
        ```javascript
        pan.setDragThreshold(dragThreshold);
        // pan.dragThreshold = dragThreshold;
        ```
- Detect bounds
    - Get
        ```javascript
        var bounds = pan.bounds;
        ```
    - Set
        ```javascript
        pan.setDetectBounds(bounds);
        // pan.bounds = bounds;
        ```