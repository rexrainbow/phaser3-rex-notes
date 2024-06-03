## Introduction

Map cursor-at-(left/right/top/botttom-)bound to (left/right/up/down) cursor key state.

- Author: Rex
- Member of scene

## Live demos

- [Custom bounds](https://codepen.io/rexrainbow/pen/bGyqeNp)
- [Camera scrolling](https://codepen.io/rexrainbow/pen/mQQrMv)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/cursoratbound)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcursoratboundsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcursoratboundsplugin.min.js', true);
    ```
- Add cursor-at-bound object
    ```javascript
    var cursorAtBound = scene.plugins.get('rexcursoratboundsplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CursorAtBoundsPlugin from 'phaser3-rex-plugins/plugins/cursoratboundss-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCursorAtBounds',
                plugin: CursorAtBoundsPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add cursor-at-bound object
    ```javascript
    var cursorAtBound = scene.plugins.get('rexCursorAtBounds').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CursorAtBounds from 'phaser3-rex-plugins/plugins/cursoratboundss.js';
    ```
- Add cursor-at-bound object
    ```javascript
    var cursorAtBound = new CursorAtBounds(scene, config);
    ```

### Create instance

```javascript
var cursorAtBound = scene.plugins.get('rexCursorAtBounds').add(scene, {
    // enable: true,
    // bounds: undefined,
    // sensitiveDistance: 20,
    // pointerOutGameRelease: true,
    // pointerOutBoundsRelease: false,
});
```

- `bounds` : A [rectangle object](geom-rectangle.md) for detecting the position of cursor.
    - `undefined` : Current viewport. Will update bounds when window resizing.
- `sensitiveDistance` : A sensitive distance in pixels.
- `pointerOutGameRelease` : 
    - `true` : All cursor keys are released when pointer is out of game window. Default behavior.
    - `false` : Don't change status of cursor keys when pointer is out of game window.
- `pointerOutBoundsRelease`
    - `true` : All cursor keys are released when pointer is out of bounds.
    - `false` : Continue cursor key detection when pointer is out of bounds. Default behavior.

Map position of cursor to state of cursor key

- *left* cursor key is pressed :
    - Position x is between *left bound* and *left bound + sensitive distance*
    - Position x at left side of *left bound*, if `pointerOutBoundsRelease` is `false`
- *Right* cursor key is pressed :
    - Position x is between *right bound* and *right bound - sensitive distance* 
    - Position x at right side of *right bound*, if `pointerOutBoundsRelease` is `false`
- *Up* cursor key is pressed :
    - Position y is between *top bound* and *top bound + sensitive distance*
    - Position y at up side of *top bound*, if `pointerOutBoundsRelease` is `false`
- *Down* cursor key is pressed :
    - Position y is between *bottom bound* and *bottom bound - sensitive distance*
    - Position y at down side of *bottom bound*, if `pointerOutBoundsRelease` is `false`

### State of cursor keys

```javascript
var cursorKeys = cursorAtBound.createCursorKeys();

var leftKeyDown = cursorKeys.left.isDown;
var rightKeyDown = cursorKeys.right.isDown;
var upKeyDown = cursorKeys.up.isDown;
var downKeyDown = cursorKeys.down.isDown;
```

Or

```javascript
var leftKeyDown = cursorAtBound.left;
var rightKeyDown = cursorAtBound.right;
var upKeyDown = cursorAtBound.up;
var downKeyDown = cursorAtBound.down;
var noKeyDown = cursorAtBound.noKey;
```

### Destroy

```javascript
cursorAtBound.destroy();
```

### Enable

- Get
    ```javascript
    var enable = joystick.enable;
    ```
- Set
    ```javascript
    joystick.setEnable(enable);  // enable: true, or false
    //joystick.enable = enable;
    ```
- Toggle
    ```javascript
    joystick.toggleEnable();
    ```

### Bounds

- Get
    ```javascript
    var bounds = cursorAtBound.bounds;
    ```
    - `bounds` : A [rectangle object](geom-rectangle.md)
- Set
    ```javascript
    cursorAtBound.setBounds(bounds);
    ```
    or
    ```javascript
    cursorAtBound.bounds = bounds;;
    ```
    - `bounds` : A [rectangle object](geom-rectangle.md)

### Sensitive distance

- Get
    ```javascript
    var distance = cursorAtBound.sensitiveDistance;
    ```
- Set
    ```javascript
    cursorAtBound.setSensitiveDistance(distance);
    ```
    or
    ```javascript
    cursorAtBound.sensitiveDistance = distance;
    ```