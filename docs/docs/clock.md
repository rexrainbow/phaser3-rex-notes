## Introduction

A clock to count elapsed time.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/clock-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexclockplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/clock)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexClock from './plugins/clock.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import ClockPlugin from './plugins/clock-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexClock',
            plugin: ClockPlugin,
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
var clock = scene.plugins.get('rexClock').add(scene, {
    // timeScale: 1
});
```

- `timeScale` : time-scale for counting elapsed time.

### Start counting

```javascript
clock.start();
// clock.start(startAt);  // start-at time in ms
```

### Get elapsed time

```javascript
var now = clock.now;  // elapsed time in ms
```

### Pause, Resume, stop counting

```javascript
clock.pause();
clock.resume();
clock.stop();
```

### Seek elapsed time

```javascript
clock.seek(time);   // elapsed time in ms
```

### State of counting

```javascript
var isRunning = clock.isRunning;
```

### Time-scale

```javascript
var timeScale = clock.timeScale;
clock.timeScale = 0.5;
```