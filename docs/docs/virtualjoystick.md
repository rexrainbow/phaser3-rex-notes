## Introduction

Simulate curosr keys according touch events.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/virtualjoystick-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexvirtualjoystickplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/virtualjoystick)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexVirtualJoyStick from './plugins/virtualjoystick.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import VirtualJoyStickPlugin from './plugins/virtualjoystick-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexVirtualJoyStick',
            plugin: VirtualJoyStickPlugin,
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
var joystick = scene.plugins.get('rexVirtualJoyStick').add(scene, {
    x: x,
    y: y,
    radius: radius,
    base: baseGameObject,
    thumb: thumbGameObject,
    // dir: '8dir',
    // forceMin: 16,
    // fixed: true,
    // enable: true
});
```

- `base` : Base game object.
    - Create a circle shape object if no base game object passed.
- `thumb` : Thumb game object.
    - Create a circle shape object if no thumb game object passed.
- `x`, `y` : Position of base game object
- `radius` : Circle hit-area of base game object
- `dir` : 
    - `'up&down'`, or `0` : Simulate up or down cursor keys only.
    - `'left&right'`, or `1` : Simulate left or right cursor keys only.
    - `'4dir'`, or `2` : Simulate up, down, left or right cursor keys.
    - `'8dir'`, or `3` : Simulate up, up-left, up-right, down, down-left, down-right, left, or right cursor keys.
- `forceMin` : Cursor keys will be pressed when *force* is larger then this value.
    - `force` : Distance between position of base game object to touch pointer
- `fixed` : Set `true` to fix to camera, i.e set `scrollFactor` to `0` for base and thumb game object.
- `enable` : Set `false` to disable cursor keys simulation

### State of cursor keys

```javascript
var cursorKeys = joystick.createCursorKeys();

var leftKeyDown = cursorKeys.left.isDown;
var rightKeyDown = cursorKeys.right.isDown;
var upKeyDown = cursorKeys.up.isDown;
var downKeyDown = cursorKeys.down.isDown;
```

Or

```javascript
var leftKeyDown = joystick.left;
var rightKeyDown = joystick.right;
var upKeyDown = joystick.up;
var downKeyDown = joystick.down;
var noKeyDown = joystick.noKey;
```

### Force & Angle

Force : Distance between position of base game object to touch pointer.

```javascript
var force = joystick.force;
var forceX = joystick.forceX;
var forceY = joystick.forceY;

var angle = joystick.angle;  // degree between -180 to 180
var rotation = joystick.rotation; // radians
```

### Visible

Visible of base game object.

- Get : Return visible of base game object
    ```javascript
    var visible = joystick.visible;
    ```
- Set : Set visible to base game object and thumb game object
    ```javascript
    joystick.visible = visible;
    joystick.setVisible(visible);
    joystick.toggleVisible();
    ```
    Joystick will be disabled when invisible.

### Enable

- Get
    ```javascript
    var enable = joystick.enable;
    ```
- Set
    ```javascript
    joystick.enable = enable;
    joystick.setEnable(enable);
    joystick.toggleEnable();
    ```

### Position

Position of base game object.

- Get
    ```javascript
    var x = joystick.x;
    var y = joystick.y;
    ```
- Set
    ```javascript
    joystick.x = x;
    joystick.y = y;
    joystick.setPosition(x ,y);
    ```

### Scroll factor

- Fix to camera
    ```javascript
    joystick.setScrollFactor(0);
    ```

### Touch pointer

- Position
    ```javascript
    var x = joystick.pointerX;
    var y = joystick.pointerY;
    ```
- Pointer
    ```javascript
    var pointer = joystick.pointer;
    ```

### Destroy

Destroy base & thumb game object.

```javascript
joystick.destroy();
```

### Events

- On joystick updated :
   ```javascript
   joystick.on('update', function(){});
   ```