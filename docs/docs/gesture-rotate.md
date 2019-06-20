## Introduction

Get spin angle from 2 dragging touch pointers.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gestures-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgesturesplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-rotate)

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
var rotate = scene.rexGestures.add.rotate({
    // enable: true,
    // bounds: undefined,

    // threshold: 0,
});
```

- `enable` : Set `false` to disable input events.
- `bounds` : A [rectangle object](geom-rectangle.md) or `undefined` (to use game window as rectangle object), for detecting the position of cursor.
- `threshold` : Fire rotate events after dragging distances of catched pointers are larger than this threshold.

### Enable

- Get
    ```javascript
    var enable = rotate.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    rotate.setEnable(enable);  // enable: true, or false
    ```

### Events

#### On dragging

- On dragging 1st touch pointer, fired when 1st touch pointer is moving
    ```javascript
    rotate.on('drag1', function(rotate) {
        // var drag1Vector = rotate.drag1Vector; // drag1Vector: {x, y}
    }, scope);
    ```
    - `rotate.drag1Vector` : Drag vector from prevoius touch position to current touch position of 1st catched touch pointer.
- On dragging 2 touch pointers, fired when any catched touch pointer moved.
    ```javascript
    rotate.on('rotate', function(rotate) {
        // rotate.spinObject(gameObejects);
        // var angle = rotate.rotation;
    }, scope);
    ```
    - `rotate.spinObject(gameObejects)` : Drag and spin an array of game object, or a game object around current center of 2 dragging pointers.
    - `rotate.rotation` : Return spin angle of 2 dragging pointers, in radius.

#### On drag start, on drag end

- On drag 1 touch pointer start, fired when catching 1st touch pointer.
    ```javascript
    rotate.on('drag1start', function(rotate) {

    }, scope);
    ```
- On drag 1 touch pointer end, fired when releasing the last one catched touch pointer.
    ```javascript
    rotate.on('drag1end', function(rotate) {

    }, scope);
    ```
- On drag 2 touch pointers start, fired when catching 2 touch pointers.
    ```javascript
    rotate.on('rotatestart', function(rotate) {

    }, scope);
    ```
- On drag 2 touch pointers end, fired when releasing any catched touch pointer.
    ```javascript
    rotate.on('rotateend', function(rotate) {

    }, scope);
    ```

### Spin game object

```javascript
rotate.spinObject(gameObejects);
```

Drag and spin game objects around current center of 2 dragging pointers. Uses this function under `'rotate'` event.

- `gameObejects` : An array of game object, or a game object.

### Spin angle

```javascript
var angle = rotate.rotation;
```

Spin angle of 2 dragging pointers, in radius.

### Drag vector of 1st touch pointer

```javascript
var drag1Vector = rotate.drag1Vector; // {x, y}
```

### Catched touch pointers

- [Pointer](touchevents.md#properties-of-point) 0, available when state is `1`
    ```javascript
    var pointer0 = rotate.pointers[0];
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
    var pointer0 = rotate.pointers[1];
    ```
