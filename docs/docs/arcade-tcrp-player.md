## Introduction

Player of **T** ime-**C** ommand-**R** ecorder-**P** layer with [Arcade physics engine](arcade-world.md), to run commands on time.

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
    var player = scene.plugins.get('rexarcadetcrpplugin').addPlayer(scene, config);
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
    var player = scene.plugins.get('rexTCRP').addPlayer(scene, config);
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
    var player = new TCRP.Player(scene, config);
    ```

### Create instance

```javascript
var player = scene.plugins.get('rexTCRP').addPlayer(scene, {
    // commands: [],       // [[time, command], [time, command], ...]
    // timeScale: 1,
    // scope: undefined
});
```

- `commands` : see [next section](tcrp-player.md#load-commands)
- `timeScale` : An integer equal or larger than `1`

### Load commands

```javascript
player.load(commands, scope);
```

- Commands : see also [Run commands](runcommands.md)
    ```javascript
    [
        [time, command],
        [time, command],
        ...
    ]
    ```
    - Format of each row :
        ```javascript
        [time, fnName, param0, param1, ...]
        // [time, callback, param0, param1, ...]
        ```
        ```javascript
        [time, [fnName, param0, param1, ...]]
        // [time, [callback, param0, param1, ...]]
        ```
        ```javascript
        [time, [command0, command1, ...]]
        ```
    - `time` : Time in step-count

### Start playing

```javascript
player.start();
// player.start(startAt);  // Start-at time in step-count
```

### Events

- Complete
    ```javascript
    player.on('complete', function(player){});
    ```
- Run command
    ```javascript
    player.on('runcommand', function(commands, scope){});
    ```

### Pause, Resume, stop playing

```javascript
player.pause();
player.resume();
player.stop();
```

### Seek elapsed time

```javascript
player.seek(time);   // Elapsed time in step-count
```

### State of player

```javascript
var isPlaying = player.isPlaying;
var completed = player.completed;
var now = player.now;
```

### Time-scale

- Set
    ```javascript
    player.setTimeScale(value);
    // player.timeScale = value;
    ```
    - `timeScale` : An integer equal or larger than `1`
- Get
    ```javascript
    var timeScale = player.timeScale;
    ```