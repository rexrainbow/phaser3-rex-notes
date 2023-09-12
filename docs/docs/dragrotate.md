## Introduction

Get dragging angle around a specific point.

- Author: Rex
- Member of scene

## Live demos

- [Spin-button](https://codepen.io/rexrainbow/pen/NJKywR)
- [Origin game object](https://codepen.io/rexrainbow/pen/zYywmVX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/dragrotate)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdragrotateplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdragrotateplugin.min.js', true);
    ```
- Add drag-rotate input
    ```javascript
    var dragRotate = scene.plugins.get('rexdragrotateplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DragRotatePlugin from 'phaser3-rex-plugins/plugins/dragrotate-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexDragRotate',
                plugin: DragRotatePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add drag-rotate input
    ```javascript
    var dragRotate = scene.plugins.get('rexDragRotate').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import DragRotate from 'phaser3-rex-plugins/plugins/dragrotate.js';
    ```
- Add drag-rotate input
    ```javascript
    var dragRotate = new DragRotate(scene, config);
    ```

### Create instance

```javascript
var dragRotate = scene.plugins.get('rexDragRotate').add(scene, {
    origin: undefined,
    x: 0,
    y: 0,
    
    maxRadius: undefined
    minRadius: 0,

    // enable: true,
});
```

- `origin` : Use game object's position as origin point.
    - `undefined` : Use fixed origin position.
- `x`, `y` : Fixed orgin point, in world position.
- `maxRadius`, `minRadius` : Dragging is valid when distance between touch pointer and origin position is larger then `minRadius` and less then `maxRadius`.
- `enable` : Set `false` to disable input events.

### Enable

- Get
    ```javascript
    var enable = dragRotate.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    dragRotate.setEnable(enable);  // enable: true, or false
    // dragRotate.enable = enable;
    ```
- Toggle
    ```javascript
    dragRotate.toggleEnable();
    ```

### Origin point

- Use game object's position as origin point.
    ```javascript
    dragRotate.setOrigin(gameObject);
    ```
- Fixed orgin point
    - Get
        ```javascript
        var x = dragRotate.x;
        var y = dragRotate.y;
        ```
    - Set
        ```javascript
        dragRotate.setOrigin(x, y);
        ```
        or
        ```javascript
        dragRotate.setOrigin(pointer); // pointer: {x, y}
        ```

!!! note
    Parameter `(x,y)` is world position, not camera position.

### Radius

- Get
    ```javascript
    var maxRadius = dragRotate.maxRadius;
    var minRadius = dragRotate.minRadius;
    ```
- Set
    ```javascript
    dragRotate.setRadius(maxRadius, minRadius);
    ```

### Get dragging state

```javascript
var state = dragRotate.state;
```

- `0` : No touch pointer
- `1` : Catch touch pointer
    - Fire `'dragstart'` event when catching touch pointers.
    - Fire `'drag'` event when any catched touch pointer moved.
    - Fire `'dragend'` event when releasing catched touch pointer.

### Is drag

```javascript
var isDrag = dragRotate.isDrag;
```

Return `true` if `(dragRotate.state === 1)` and catched touch pointer just moved.

### Drag cancel

```javascript
dragRotate.dragCancel();
```

### Events

#### On dragging

- On dragging
    ```javascript
    dragRotate.on('drag', function(dragRotate) {
        // gameObject.rotation += dragRotate.deltaRotation;
    }, scope);
    ```
    - `dragRotate.deltaRotation` : Dragging angle around origin position, in radians.
        - Add to `gameObject.rotation` to spin target game object.
            ```javascript
            gameObject.rotation += dragRotate.deltaRotation;
            ```
    - `dragRotate.deltaAngle` : Dragging angle around origin position, in degrees.
        - Add to `gameObject.angle` to spin target game object.
            ```javascript
            gameObject.angle += dragRotate.deltAangle;
            ```    
    - `dragRotate.cw` : Return `true` if dragging is dragrotate-wise.
    - `dragRotate.ccw` : Return `true` if dragging is counter-dragrotate-wise.

#### On drag start, on drag end

- On drag touch pointer start, fired when catching touch pointer.
    ```javascript
    dragRotate.on('dragstart', function(dragRotate) {

    }, scope);
    ```
- On drag touch pointer end, fired when releasing the catched touch pointer.
    ```javascript
    dragRotate.on('dragend', function(dragRotate) {

    }, scope);
    ```

### Catched touch pointer

- [Pointer](touchevents.md#properties-of-point), available when state is `1`
    ```javascript
    var pointer = dragRotate.pointer;
    ```
    - World position of pointer
        ```javascript
        var x = pointer.worldX;
        var y = pointer.worldY;
        ```