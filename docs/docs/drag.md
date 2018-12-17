## Introduction

Drag game object.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/drag-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexdragplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/drag)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexDrag from './plugins/drag.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import DragPlugin from './plugins/drag-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexDrag',
            plugin: DragPlugin,
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
var drag = scene.plugins.get('rexDrag').add(gameObject, {
    // enable: true,
    // axis: 0,      //0|'both'|'h&v'|1|'horizontal'|'h'|2|'vertical'|'v'
    // rotation: Phaser.Math.DegToRad(45)  // axis rotation in rad
});
```

- `enable` : Set `false` to disable input events.
- `axis` :
    - `'both'`,`'h&v'`, `'x&y'`, or `0` : Dragging on all directions.
    - `'horizontal'`,`'h'`, `'x'`, or `1` : Dragging on horizontal/x axis.
    - `'vertical'`,`'v'`, `'y'`, or `2` : Dragging on vertical/y axis.
- `rotation` : Axis rotation in rad, available in horizontal or vertical axis mode.

### Events

Built-in dragging events

```javascript
gameObject.on('dragstart', function(pointer, dragX, dragY){ /*...*/ });
gameObject.on('drag', function(pointer, dragX, dragY){ /*...*/ });
gameObject.on('dragend', function(pointer, dragX, dragY, dropped){ /*...*/ });
```

### Enable

- Get
    ```javascript
    var enable = drag.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    drag.setEnable(enable);  // enable: true, or false
    ```

### Get dragging state

```javascript
var isDragging = drag.isDragging;
```

### Set rotation of axis

```javascript
drag.setAxisRotation(rad);
```

### Set axis mode

```javascript
drag.setAxisMode(axis);
```

- `axis` : 
    - `'both'`,`'h&v'`, `'x&y'`, or `0` : Dragging on all directions.
    - `'horizontal'`,`'h'`, `'x'`, or `1` : Dragging on horizontal/x axis.
    - `'vertical'`,`'v'`, `'y'`, or `2` : Dragging on vertical/y axis.

### Try drag

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/drag/try-drag.js)

Game object will be dragged if there is any point above it.

```javascript
drag.drag();
```

### Drop

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/drag/dragend.js)

Game object will be dropped(dragend) manually.

```javascript
drag.dragend();
```