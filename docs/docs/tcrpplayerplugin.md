## Introduction

Player of **T** ime-**C** ommand-**R** ecorder-**P** layer, to run commands on time.

- Author: Rex
- Member of scene

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/tcrp/PlayerPlugin.js)

## Usage

### Create instance

```javascript
var player = new PlayerPlugin(scene, {
    // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
    // dtMode: 0,          // 'abs'|'absolute'|0|'inc'|'increment'|1
    // commands: [],       // [[dt, command], [dt, command], ...]
    // scope: undefined
});
```

Properties

- timeUnit: see [next section](tcrpplayerplugin.md#load-commands)
- dtMode: see [next section](tcrpplayerplugin.md#load-commands)
- commands: see [next section](tcrpplayerplugin.md#load-commands)

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
        [dt, command],
        [dt, command],
        ...
    ]
    ```
    - Format of each row :
        ```javascript
        [dt, fnName, param0, param1, ...]
        ```
        ```javascript
        [dt, [fnName, param0, param1, ...]]
        ```
        ```javascript
        [dt, [command0, command1, ...]]
        ```
- timeUnit: time-unit of dt
    - `'ms'`, or `0` : dt in millisecond
    - `'s'`, `'sec'`, or 1 : dt in second
- dtMode: mode of counting dt
    - `'abs'`, `'absolute'`, or `0` : timeout = dt
    - `'inc'`, `'increment'`, `1` : timeout = dt + previous-timeout

### Start playing

```javascript
player.start();
// player.start(startAt);  // start-at time in ms
```

### Events

- Complete
    ```javascript
    player.on('complete', function(){});
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
player.seek(time);   // elapsed time in ms
```

### State of player

```javascript
var isPlaying = player.isPlaying;
var isComplete = player.isComplate;
var now = player.now;
```

### Time-scale

```javascript
var timeScale = player.timeScale;
player.timeScale = 0.5;
```