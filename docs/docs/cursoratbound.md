## Introduction

Map cursor-at-(left/right/top/botttom-)bound to (left/right/up/down) cursor key state.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/cursoratbound-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexcursoratboundplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/cursor-at-bound)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexCursorAtBound from './plugins/cursoratbound.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import CursorAtBoundPlugin from './plugins/cursoratbound-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCursorAtBound',
            plugin: CursorAtBoundPlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var cursorAtBound = scene.plugins.get('rexCursorAtBound').add(scene, {
    // bounds: undefined,
    // sensitiveDistance: 20,
});
```

- `bounds` : A [rectangle object](geom-rectangle.md)ㄝ or `undefined` (to use game window as rectangle object), for detecting the position of cursor.
- `sensitiveDistance` : A sensitive distance in pixels.

Map position of cursor to state of cursor key

- Position x is between *left bound* and *left bound + sensitive distance* : *left* cursor key is pressed.
- Position x is between *right bound* and *right bound - sensitive distance* : *Right* cursor key is pressed.
- Position y is between *top bound* and *top bound + sensitive distance* : *Up* cursor key is pressed.
- Position y is between *bottom bound* and *bottom bound - sensitive distance* : *Down* cursor key is pressed.

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