## Introduction

Recorder of **T** ime-**C** ommand-**R** ecorder-**P** layer, to store commands with time.

- Author: Rex
- Member of scene

## Live demos

- [Replay drawing](https://codepen.io/rexrainbow/pen/oNjeXvo)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/tcrp)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextcrpplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextcrpplugin.min.js', true);
    ```
- Create instance
    ```javascript
    var recorder = scene.plugins.get('rextcrpplugin').addRecorder(scene);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TCRPPlugin from 'phaser3-rex-plugins/plugins/tcrp-plugin.js';
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
    import TCRP from 'phaser3-rex-plugins/plugins/tcrp.js';
    ```
- Create instance
    ```javascript
    var recorder = new TCRP.Recorder(scene);
    ```

### Create instance

```javascript
var recorder = scene.plugins.get('rexTCRP').addRecorder(scene);
```

- Destroy when scene stopped

or

```javascript
var recorder = scene.plugins.get('rexTCRP').addRecorder(gameObject);
```

- Destroy when game object destroyed

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

### Clear commands

```javascript
recorder.clear();
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

- Set
    ```javascript
    recorder.setTimeScale(value);
    // recorder.timeScale = value;
    ```
- Get
    ```javascript
    var timeScale = recorder.timeScale;
    ```