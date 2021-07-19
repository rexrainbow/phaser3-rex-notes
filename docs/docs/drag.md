## Introduction

Drag game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Try dragging](https://codepen.io/rexrainbow/pen/rvbwNv)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/drag)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdragplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdragplugin.min.js', true);
    ```
- Add drag behavior
    ```javascript
    var drag = scene.plugins.get('rexdragplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DragPlugin from 'phaser3-rex-plugins/plugins/drag-plugin.js';
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
- Add drag behavior
    ```javascript
    var drag = scene.plugins.get('rexDrag').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Drag from 'phaser3-rex-plugins/plugins/drag.js';
    ```
- Add drag behavior
    ```javascript
    var drag = new Drag(gameObject, config);
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
    // drag.enable = enable;
    ```
- Toggle
    ```javascript
    drag.toggleEnable();
    ```

### Get dragging state

```javascript
var isDragging = drag.isDragging;
```

### Set rotation of axis

```javascript
drag.setAxisRotation(rad);
// drag.axisRotation = rad;
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

Game object will be dragged if there is any point above it.

```javascript
drag.drag();
```

### Drop

Game object will be dropped(dragend) manually.

```javascript
drag.dragend();
```