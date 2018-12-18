## Introduction

Get scale factor ftom 2 dragging touch pointers.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/pinch-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexpinchplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/pinch)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexPinch from './plugins/pinch.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import PinchPlugin from './plugins/pinch-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexPinch',
            plugin: PinchPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var pinch = scene.plugins.get('rexPinch').add(gameObject, {
    // enable: true,
    // bounds: undefined,
});
```

- `enable` : Set `false` to disable input events.
- `bounds` : A [rectangle object](geom-rectangle.md)ㄝ or `undefined` (to use game window as rectangle object), for detecting the position of cursor.

### Enable

- Get
    ```javascript
    var enable = pinch.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    pinch.setEnable(enable);  // enable: true, or false
    ```

### Get dragging state

```javascript
var state = pinch.state;
```

- `0` : No touch pointer
- `1` : Catch 1 touch pointer
- `2` : Catch 2 touch pointers
    - Fire `'pinchstart'` event when catching 2 touch pointers.
    - Fire `'pinch'` event when any catched touch pointer moved.
    - Fire `'pinchend'` event when releasing any catched touch pointer.

### Is 1st drag

```javascript
var isDrag = pinch.isDrag;
```

Return `true` if `(pinch.state === 1)` and 1st touch pointer just moved.

### Is pinch

```javascript
var isPinch = pinch.isPinch;
```

Return `true` if `(pinch.state === 2)` and any touch pointer just moved.

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
        ```
- [Pointer](touchevents.md#properties-of-point) 1, available when state is `2`
    ```javascript
    var pointer0 = pinch.pointers[1];
    ```