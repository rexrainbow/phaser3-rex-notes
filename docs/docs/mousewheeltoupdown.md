## Introduction

Map mouse-wheeling to (up/down) cursor key state.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/mousewheeltoupdown-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexmousewheeltoupdownplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/mouse-wheel-to-up-down)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexMouseWheelToUpDown from './plugins/mousewheeltoupdown.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import MouseWheelToUpDownPlugin from './plugins/mousewheeltoupdown-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexMouseWheelToUpDown',
            plugin: MouseWheelToUpDownPlugin,
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
var mouseWheelToUpDown = scene.plugins.get('rexMouseWheelToUpDown').add(scene);
```

### State of cursor keys

```javascript
var cursorKeys = mouseWheelToUpDown.createCursorKeys();

var upKeyDown = cursorKeys.up.isDown;
var downKeyDown = cursorKeys.down.isDown;
```

Or

```javascript
var upKeyDown = mouseWheelToUpDown.up;
var downKeyDown = mouseWheelToUpDown.down;
var noKeyDown = mouseWheelToUpDown.noKey;
```

### Destroy

```javascript
mouseWheelToUpDown.destroy();
```