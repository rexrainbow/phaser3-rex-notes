## Introduction

Recorder of **T** ime-**C** ommand-**R** ecorder-**P** layer with [Arcade physics engine](arcade-world.md), to store commands with time.

- Author: Rex
- Member of scene

[Arcade physics engine](arcade-world.md) is fixed-step based, not tick time based.

This Arcade-TCRP has better result of replaying, which store step count via WORLD_STEP(`worldstep`) event.

## Live demos

- [Player](https://codepen.io/rexrainbow/pen/eYzmqYz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/arcadetcrp)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexarcadetcrpplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexarcadetcrpplugin.min.js', true);
    ```
- Create instance
    ```javascript
    var recorder = scene.plugins.get('rexarcadetcrpplugin').addRecorder(scene);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TCRPPlugin from 'phaser3-rex-plugins/plugins/arcadetcrp-plugin.js';
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
- Create instance
    ```javascript
    var recorder = scene.plugins.get('rexTCRP').addRecorder(scene);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TCRP from 'phaser3-rex-plugins/plugins/arcadetcrp.js';
    ```
- Create instance
    ```javascript
    var recorder = new TCRP.Recorder(scene);
    ```

### Create instance

```javascript
var recorder = scene.plugins.get('rexTCRP').addRecorder(scene);
```

### Start recording

```javascript
recorder.start();
// recorder.start(startAt);  // start-at in step-count
```

### Push commands

```javascript
recorder.addCommand([fnName, param0, param1, ...]);
// recorder.addCommand([command0, command1, ...]);
// recorder.addCommand([fnName, param0, param1, ...], offset);  // time-offset in step-count
```

See also [Run commands](runcommands.md)

### Get commands

```javascript
var commands = recorder.getCommands();        // Get a shallow copy of commands
// var commands = recorder.getCommands(true); // Get reference of commands
```

Format of return commands:

```javascript
[
    [time, [command]],
    [time, [command0,command1]],
    ...
]
```

- `time` : Time in step-count

### Pause, Resume, stop recording

```javascript
recorder.pause();
recorder.resume();
recorder.stop();
```

### Seek elapsed time

```javascript
recorder.seek(time);   // elapsed time in step-count
```

### State of recorder

```javascript
var isRecording = recorder.isRecording;
var now = recorder.now;
```

- `now` : Now time in step-count.

### Time-scale

- Set
    ```javascript
    recorder.setTimeScale(value);
    // recorder.timeScale = value;
    ```
    - `timeScale` : An integer equal or larger than `1`
- Get
    ```javascript
    var timeScale = recorder.timeScale;
    ```

