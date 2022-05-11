## Introduction

Start and counting timer by real-time timestamp.

!!! attention
    Timers here do not support pause, or timescale features.

- Author: Rex
- Member of scene, or game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/realtimetimers)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexrealtimetimersplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexrealtimetimersplugin.min.js', true);
    ```
- Add real-time timers object
    ```javascript
    var realTimeTimers = scene.plugins.get('rexrealtimetimersplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RealTimeTimersPlugin from 'phaser3-rex-plugins/plugins/realtimetimers-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRealTimeTimers',
                plugin: RealTimeTimersPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add real-time timers object
    ```javascript
    var realTimeTimers = scene.plugins.get('rexRealTimeTimers').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RealTimeTimers from 'phaser3-rex-plugins/plugins/realtimetimers.js';
    ```
- Add real-time timers object
    ```javascript
    var realTimeTimers = new RealTimeTimers(config);
    ```

### Create instance

```javascript
var realTimeTimers = scene.plugins.get('rexRealTimeTimers').add({
    // startTimestamp: new Date().getTime(),
    // getTimestampCallback: functio() { return timestamp; }
});
```

- `startTimestamp` : Start time. 
    - Default value is current timestamp `new Date().getTime()`.
- `getTimestampCallback` : Custom callback of get current timestamp, optional.

### Add a timer

```javascript
realTimeTimers.addTimer(name, period);
// realTimeTimers.addTimer(name, period, currentTimestamp);
```

- `name` : Any name string of this timer. 
- `period` : Will expire after period time, in millisecond.
- `currentTimestamp` : Start this time in current time, optional. Will get current timestamp by default.

### Expire timers

- Get expired timers
    ```javascript
    var timers = realTimeTimers.getExpiredTimers();
    // var timers = realTimeTimers.getExpiredTimers(currentTimestamp);
    ```
    - `timers` : Array of expired timers. Each timer include these properties - 
        ```javascript
        {
            name: name,
            start: timestamp,
            period: time
        }
        ```
- Pop(get and remove) expired timers
    ```javascript
    var timers = realTimeTimers.popExpiredTimers();
    // var timers = realTimeTimers.popExpiredTimers(currentTimestamp);
    ```
- Get progress of timer
    ```javascript
    var result = realTimeTimers.getTimersProgress()
    // var result = realTimeTimers.getTimersProgress(currentTimestamp);
    ```
    - `result` : Array of timer's progress. Include these properties -
        ```javascript
        {
            name: name,
            period: time,
            elapsed: time,
            progress: t    // elapsed/period
        }
        ```

### Get timers

- Get all timers
    ```javascript
    var timers = realtimetimers.getTimers();
    ```
- Get timers by name.
    ```javascript
    var timers = realtimetimers.getTimers(name);
    ```

### Remove timers

- Remove timers by name
    ```javascript
    realtimetimers.removeTimers(name);
    ```
- Remove timer object
    ```javascript
    realtimetimers.removeTimers(timer);
    ```
    - `timer` : A timer object, or an array of timer objects.
- Remove all timers
    ```javascript
    realtimetimers.clearTimers();
    ```

### States

- Get states in plain object
    ```javascript
    var states = realtimetimers.toJSON();
    ```
- Get states in JSON string. Can store this JSON string into webstorage or server.
    ```javascript
    var s = JSON.stringify(realtimetimers);
    ```
- Set states by plain object
    ```javascript
    realtimetimers.resetFromJSON(states)
    ```

### Events

- On add a timer
    ```javascript
    realtimetimers.on('add', function(timer, timers){ })
    ```
    - `timer` : Added timer.
        ```javascript
        {
            name: name,
            start: timestamp,
            period: time
        }
        ```
    - `timers` : Total timers after adding.
- On remove a timer
    ```javascript
    realtimetimers.on('remove', function(timer, timers){ })
    ```
    - `timer` : Removed timer.
        ```javascript
        {
            name: name,
            start: timestamp,
            period: time
        }
        ```
    - `timers` : Total timers after removing.
- On timers updated (add or remove).
    ```javascript
    realtimetimers.on('update', function(timers){ 
        var s = JSON.stringify(realtimetimers);
        // Store current states to webstorage or server here.
    })
    ```
    - `timers` : Total timers after updating.