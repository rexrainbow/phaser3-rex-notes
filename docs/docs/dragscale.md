## Introduction

Get scale factor ftom 2 dragging touch pointers.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dragscale-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexdragscaleplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/dragscale)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexDragScale from './plugins/dragscale.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import DragScalePlugin from './plugins/dragscale-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexDragScale',
            plugin: DragScalePlugin,
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
var dragScale = scene.plugins.get('rexDragScale').add(gameObject, {
    // enable: true,
    // bounds: undefined,
});
```

- `enable` : Set `false` to disable input events.
- `bounds` : A [rectangle object](geom-rectangle.md)ㄝ or `undefined` (to use game window as rectangle object), for detecting the position of cursor.

### Enable

- Get
    ```javascript
    var enable = dragScale.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    dragScale.setEnable(enable);  // enable: true, or false
    ```

### Get dragging state

```javascript
var state = dragScale.state;
```

- `0` : No touch pointer
- `1` : Catch 1 touch pointer
- `2` : Catch 2 touch pointers
    - Fire `'drag2start'` event when catching 2 touch pointers.
    - Fire `'drag2'` event when any catched touch pointer moved.
    - Fire `'drag2end'` event when releasing any catched touch pointer.    

```javascript
var isDragging = dragScale.isDragging;
```

Return `true` if `(dragScale.state === 2)`

### Events

- On drag 2 touch pointers start, fired when catching 2 touch pointers.
    ```javascript
    dragScale.on('drag2start', function(dragScale) {

    }, scope);
    ```
- On dragging 2 touch pointers, fired when any catched touch pointer moved.
    ```javascript
    dragScale.on('drag2', function(dragScale) {
        // var scaleFactor = dragScale.scaleFactor;
        // gameObject.scaleX *= scaleFactor;
        // gameObject.scaleY *= scaleFactor;
    }, scope);
    ```
- On drag 2 touch pointers end, fired when releasing any catched touch pointer.
    ```javascript
    dragScale.on('drag2end', function(dragScale) {

    }, scope);
    ```
- On dragging 1st touch pointer, fired when 1st touch pointer is moving
    ```javascript
    dragScale.on('drag1', function(dragScale) {
        // var drag1Vector = dragScale.drag1Vector; // drag1Vector: {x, y}
    }, scope);
    ```

### Scale factor

```javascript
var scaleFactor = dragScale.scaleFactor;
```

Changing ratio of distance between 2 catched touch pointers. 
(i.e current distance between 2 catched touch pointers / previous distance ).

### Drag vector of 1st touch pointer

```javascript
var drag1Vector = dragScale.drag1Vector; // {x, y}
```

### Catched touch pointers

- [Pointer](touchevents.md#properties-of-point) 0, available when state is `1`
    ```javascript
    var pointer0 = dragScale.pointers[0];
    ```
    - Position of pointer
        ```javascript
        var x = pointer0.x;
        var y = pointer0.y;
        ```
- [Pointer](touchevents.md#properties-of-point) 1, available when state is `2`
    ```javascript
    var pointer0 = dragScale.pointers[1];
    ```