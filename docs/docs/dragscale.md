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
var dragscale = scene.plugins.get('rexDragScale').add(gameObject, {
    // enable: true,
    // bounds: undefined,
});
```

- `enable` : Set `false` to disable input events.
- `bounds` : A [rectangle object](geom-rectangle.md)ㄝ or `undefined` (to use game window as rectangle object), for detecting the position of cursor.

### Enable

- Get
    ```javascript
    var enable = dragscale.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    dragscale.setEnable(enable);  // enable: true, or false
    ```

### Get dragging state

```javascript
var state = dragscale.state;
```

- `0` : No touch pointer
- `1` : Catch 1 touch pointer
- `2` : Catch 2 touch pointers
    - Fire `'dragstart'` event when catching 2 touch pointers.
    - Fire `'drag'` event when any catched touch pointer moved.
    - Fire `'dragend'` event when releasing any catched touch pointer.

### Events

- On drag start, fired when catching 2 touch pointers.
    ```javascript
    dragscale.on('dragscale', function(dragscale) {

    }, scope);
    ```
- On dragging, fired when any catched touch pointer moved.
    ```javascript
    dragscale.on('dragscale', function(dragscale) {
        // var scaleFactor = dragscale.scaleFactor;
        // gameObject.scaleX *= scaleFactor;
        // gameObject.scaleY *= scaleFactor;
    }, scope);
    ```
- On drag end, fired when releasing any catched touch pointer.
    ```javascript
    dragscale.on('dragscale', function(dragscale) {

    }, scope);
    ```

### Scale factor

```javascript
var scaleFactor = dragscale.scaleFactor;
```

Changing ratio of distance between 2 catched touch pointers. 
(i.e current distance between 2 catched touch pointers / previous distance ).

### Catched touch pointers

- [Pointer](touchevents.md#properties-of-point) 0, available when state is `1`
    ```javascript
    var pointer0 = dragscale.pointers[0];
    ```
    - Position of pointer
        ```javascript
        var x = pointer0.x;
        var y = pointer0.y;
        ```
- [Pointer](touchevents.md#properties-of-point) 1, available when state is `2`
    ```javascript
    var pointer0 = dragscale.pointers[1];
    ```