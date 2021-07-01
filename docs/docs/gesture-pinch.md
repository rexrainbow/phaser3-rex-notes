## Introduction

Get scale factor from 2 dragging touch pointers.

- Author: Rex
- Member of scene

## Live demos

[Pinch-zoom](https://codepen.io/rexrainbow/pen/BvyVOL)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-pinch)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexgesturesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
    ```
- Add pinch input
    ```javascript
    var pinch = scene.rexGestures.add.pinch(config);
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
- Add pinch input
    ```javascript
    var pinch = scene.rexGestures.add.pinch(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Pinch } from 'phaser3-rex-plugins/plugins/gestures.js';
    ```
- Add pinch input
    ```javascript
    var pinch = new Pinch(scene, config);
    ```

### Create instance

```javascript
var pinch = scene.rexGestures.add.pinch({
    // enable: true,
    // bounds: undefined,

    // threshold: 0,
});
```

- `enable` : Set `false` to disable input events.
- `bounds` : A [rectangle object](geom-rectangle.md) or `undefined` (to use game window as rectangle object), for detecting the position of cursor.
- `threshold` : Fire pinch events after dragging distances of catched pointers are larger than this threshold.

### Enable

- Get
    ```javascript
    var enable = pinch.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    pinch.setEnable(enable);  // enable: true, or false
    // pinch.enable = enable;
    ```
- Toggle
    ```javascript
    pinch.toggleEnable();
    ```

### Events

#### On dragging

- On dragging 1st touch pointer, fired when 1st touch pointer is moving
    ```javascript
    pinch.on('drag1', function(pinch) {
        // var drag1Vector = pinch.drag1Vector; // drag1Vector: {x, y}
    }, scope);
    ```
    - `pinch.drag1Vector` : Drag vector from prevoius touch position to current touch position of 1st catched touch pointer.
- On dragging 2 touch pointers, fired when any catched touch pointer moved.
    ```javascript
    pinch.on('pinch', function(pinch) {
        // var scaleFactor = pinch.scaleFactor;
        // gameObject.scaleX *= scaleFactor;
        // gameObject.scaleY *= scaleFactor;
    }, scope);
    ```
    - `pinch.scaleFactor` : Rate of distance change between 2 catched touch pointers.

#### On drag start, on drag end

- On drag 1 touch pointer start, fired when catching 1st touch pointer.
    ```javascript
    pinch.on('drag1start', function(pinch) {

    }, scope);
    ```
- On drag 1 touch pointer end, fired when releasing the last one catched touch pointer.
    ```javascript
    pinch.on('drag1end', function(pinch) {

    }, scope);
    ```
- On drag 2 touch pointers start, fired when catching 2 touch pointers.
    ```javascript
    pinch.on('pinchstart', function(pinch) {

    }, scope);
    ```
- On drag 2 touch pointers end, fired when releasing any catched touch pointer.
    ```javascript
    pinch.on('pinchend', function(pinch) {

    }, scope);
    ```

### Scale factor

```javascript
var scaleFactor = pinch.scaleFactor;
```

Rate of distance change between 2 catched touch pointers. 
(i.e current distance between 2 catched touch pointers / previous distance ).

### Drag vector of 1st touch pointer

```javascript
var drag1Vector = pinch.drag1Vector; // {x, y}
```

### Catched touch pointers

- [Pointer](touchevents.md#properties-of-point) 0, available when state is `1`
    ```javascript
    var pointer0 = pinch.pointers[0];
    ```
    - Position of pointer
        ```javascript
        var x = pointer0.x;
        var y = pointer0.y;
        var worldX = pointer0.worldX;
        var worldY = pointer0.worldY;
        ```
- [Pointer](touchevents.md#properties-of-point) 1, available when state is `2`
    ```javascript
    var pointer0 = pinch.pointers[1];
    ```

### Is pinched

```javascript
var isPinched = pinch.isPinched;
```

Return `true` if pinched.

### Other properties

- Drag threshold
    - Get
        ```javascript
        var dragThreshold = pinch.dragThreshold;
        ```
    - Set
        ```javascript
        pinch.setDragThreshold(dragThreshold);
        // pinch.dragThreshold = dragThreshold;
        ```
- Detect bounds
    - Get
        ```javascript
        var bounds = pinch.bounds;
        ```
    - Set
        ```javascript
        pinch.setDetectBounds(bounds);
        // pinch.bounds = bounds;
        ```
