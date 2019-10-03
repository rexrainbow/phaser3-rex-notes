## Introduction

Fires 'click' event when touch releasd after pressed.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/button-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexbuttonplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/button)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexButton from './plugins/button.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import ButtonPlugin from './plugins/button-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexButton',
            plugin: ButtonPlugin,
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
var button = scene.plugins.get('rexButton').add(gameObject, {
    // enable: true,
    // mode: 1,            // 0|'press'|1|'release'
    // clickInterval: 100  // ms
});
```

- `enable` : drag-able
- `mode` :
    - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
    - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
- `clickInterval` : Interval between 2 'click' events, in ms.

### Events

```javascript
button.on('click', function (button, gameObject, pointer, event) {
    // ...
}, scope);
```

- Cancel remaining touched events : `event.stopPropagation()`

### Enable

- Get
    ```javascript
    var enable = drag.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    drag.setEnable(enable);  // enable: true, or false
    ```

### Set mode

```javascript
button.setMode(mode);
```

- `mode` :
    - `'press'`, or `0` : Fire 'click' event when touch pressed.
    - `'release'`, or `1` : Fire 'click' event when touch released after pressed.

### Set click interval

```javascript
button.setClickInterval(interval);  // interval in ms
```