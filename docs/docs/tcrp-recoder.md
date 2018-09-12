## Introduction

Recorder of **T** ime-**C** ommand-**R** ecorder-**P** layer, to store commands with time.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/tcrp-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rextcrpplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/tcrp)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexTCRP from './plugins/tcrp.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import TCRPPlugin from './plugins/tcrp-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexTCRP',
            plugin: TCRPPlugin,
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
var recorder = scene.plugins.get('rexTextTyping').addRecorder(scene);
```

### Start recording

```javascript
recorder.start();
// recorder.start(startAt);  // start-at time in ms
```

### Push commands

```javascript
recorder.addCommand([fnName, param0, param1, ...]);
// recorder.addCommand([command0, command1, ...]);
// recorder.addCommand([fnName, param0, param1, ...], offset);  // time-offset in ms
```

See also [Run commands](runcommands.md)

### Get commands

```javascript
var commands = recorder.getCommands();        // get a shallow copy of commands
// var commands = recorder.getCommands(true); // get reference of commands
```

Format of return commands:

```javascript
[
    [dt, [command]],
    [dt, [command0,command1]],
    ...
]
```

### Pause, Resume, stop recording

```javascript
recorder.pause();
recorder.resume();
recorder.stop();
```

### Seek elapsed time

```javascript
recorder.seek(time);   // elapsed time in ms
```

### State of recorder

```javascript
var isRecording = recorder.isRecording;
var now = recorder.now;
```

### Time-scale

```javascript
var timeScale = recorder.timeScale;
recorder.timeScale = 0.5;
```