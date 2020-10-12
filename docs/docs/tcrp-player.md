## Introduction

Player of **T** ime-**C** ommand-**R** ecorder-**P** layer, to run commands on time.

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
    var player = scene.plugins.get('rextcrpplugin').addPlayer(scene, config);
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
    var player = scene.plugins.get('rexTCRP').addPlayer(scene, config);
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
    var player = new TCRP.Player(scene, config);
    ```

### Create instance

```javascript
var player = scene.plugins.get('rexTCRP').addPlayer(scene, {
    // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
    // dtMode: 0,          // 'abs'|'absolute'|0|'inc'|'increment'|1
    // commands: [],       // [[time, command], [time, command], ...]
    // timeScale: 1,
    // scope: undefined
});
```

- `timeUnit` : see [next section](tcrp-player.md#load-commands)
- `dtMode` : see [next section](tcrp-player.md#load-commands)
- `commands` : see [next section](tcrp-player.md#load-commands)
- `timeScale`

### Load commands

```javascript
player.load(commands, scope, {
    // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
    // dtMode: 0           // 'abs'|'absolute'|0|'inc'|'increment'|1
});
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
- timeUnit: time-unit of *time*
    - `'ms'`, or `0` : *time* in millisecond
    - `'s'`, `'sec'`, or 1 : *time* in second
- dtMode: mode of counting time
    - `'abs'`, `'absolute'`, or `0` : timeout = *time*
    - `'inc'`, `'increment'`, `1` : timeout = *time* + previous-*time*

### Start playing

```javascript
player.start();
// player.start(startAt);  // Start-at time in ms
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
player.seek(time);   // Elapsed time in ms
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
- Get
    ```javascript
    var timeScale = player.timeScale;
    ```