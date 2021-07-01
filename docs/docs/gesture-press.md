## Introduction

Get press events of a game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Press object](https://codepen.io/rexrainbow/pen/pmrPzW)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-press)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexgesturesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
    ```
- Add press input
    ```javascript
    var press = scene.rexGestures.add.press(config);
    // var press = scene.rexGestures.add.press(gameObject, config);
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
- Add press input
    ```javascript
    var press = scene.rexGestures.add.press(config);
    // var press = scene.rexGestures.add.press(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Press } from 'phaser3-rex-plugins/plugins/gestures.js';
    ```
- Add press input
    ```javascript
    var press = new Press(scene, config);
    // var press = new Press(gameObject, config);
    ```

### Create instance

- Press input
    ```javascript
    var press = scene.rexGestures.add.press({
        // enable: true,
        // bounds: undefined,
    
        // time: 251,
        // threshold: 9,
    });
    ```
    - `enable` : Set `false` to disable input events.
    - `bounds` : Touch detecting area [rectangle](geom-rectangle.md), if game obect is not given.
        - `undefined` : Ignore this feature, default behavior.
    - `time` : Minimal time of the pointer to be pressed.
    - `threshold` : Minimal movement when pointer is down.
- Press behavior of game object
    ```javascript
    var press = scene.rexGestures.add.press(gameObject, {
        // enable: true,
    
        // time: 251,
        // threshold: 9,
    });
    ```

### Enable

- Get
    ```javascript
    var enable = press.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    press.setEnable(enable);  // enable: true, or false
    // press.enable = enable;
    ```
- Toggle
    ```javascript
    press.toggleEnable();
    ```

### Events

#### Pressing start

```javascript
press.on('pressstart', function(press, gameObject, lastPointer){
}, scope);
```

- `press.gameObject` : Parent gameobject of this press behavior.
- `press.worldX`, `press.worldY` : World position of pressing start.
- `press.x`, `press.y` : Scene position of pressing start.
- `gameObject`, `press.gameObject` : Parent gameobject of this press behavior.
- `lastPointer` : Last touch pointer.

#### Pressing end

```javascript
press.on('pressend', function(press, gameObject, lastPointer){
}, scope);
```

### Is pressed

```javascript
var isPressed = press.isPressed;
```

Return `true` if pressed.

### Other properties

- Hold time
    - Get
        ```javascript
        var holdTime = press.holdTime;
        ```
    - Set
        ```javascript
        press.setHoldTime(holdTime);
        // press.holdTime = holdTime;
        ```
- Drag threshold
    - Get
        ```javascript
        var dragThreshold = press.dragThreshold;
        ```
    - Set
        ```javascript
        press.setDragThreshold(dragThreshold);
        // press.dragThreshold = dragThreshold;
        ```
- Detect bounds
    - Get
        ```javascript
        var bounds = press.bounds;
        ```
    - Set
        ```javascript
        press.setDetectBounds(bounds);
        // press.bounds = bounds;
        ```