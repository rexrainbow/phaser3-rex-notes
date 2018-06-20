## Introduction

Simulate curosr keys according touch events.

- Author: Rex
- Behavior of game object

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/touchcursor-plugin.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/touchcursor)

### Create instance

```javascript
var dragCursor = new DragCursorPlugin(scene, {
    dir: '8dir',    // 0|'up&down'|1|'left&right|2|'4dir'|3|'8dir'
    distanceMin: 30        
});
```

Properties

- mode : 
    - `'up&down'`, or `0` : simulate up or down cursor keys only.
    - `'left&right'`, or `1` : simulate left or right cursor keys only.
    - `'4dir'`, or `2` : simulate up, down, left or right cursor keys.
    - `'8dir'`, or `3` : simulate up, up-left, up-right, down, down-left, down-right, left, or right cursor keys.
- distanceMin : cursor keys will be pressed when dragging distance is larger then this value.

### Get state of cursor keys

```javascript
var cursorKeys = dragCursor.createCursorKeys();

var isLeftKeyDown = cursorKeys.left.isDown;
var isRightKeyDown = cursorKeys.right.isDown;
var isUpKeyDown = cursorKeys.up.isDown;
var isDownKeyDown = cursorKeys.down.isDown;
```

### Get dragging point

```javascript
var dragStartX = dragCursor.start.x;
var dragStartY = dragCursor.start.y;
var dragEndX = dragCursor.end.x;
var dragEndY = dragCursor.end.y;
```

### Assign origin point

Origin point is the dragging start point, or assign origin point when creating instance.

```javascript
var dragCursor = new DragCursorPlugin(scene, {
    // ...
    origin: {       // assign origin point to (400,300)
        x: 400,
        y: 300
    }
});
```

Or assign origin point by `setOrigin(x, y)` function.

```javascript
dragCursor.setOrigin(400, 300);  // assign origin point to (400,300)
```