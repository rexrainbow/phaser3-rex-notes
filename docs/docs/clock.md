## Introduction

A clock to count elapsed time.

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/clock)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexclockplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclockplugin.min.js', true);
    ```
- Add clock object
    ```javascript
    var clock = scene.plugins.get('rexclockplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ClockPlugin from 'phaser3-rex-plugins/plugins/clock-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexClock',
                plugin: ClockPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add clock object
    ```javascript
    var clock = scene.plugins.get('rexClock').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Clock from 'phaser3-rex-plugins/plugins/clock.js';
    ```
- Add clock object
    ```javascript
    var clock = new Clock(scene, config);
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

### Force ticking

```javascript
clock.tick(0);
// clock.tick(delta);
```

### Get elapsed time

```javascript
var now = clock.now;  // Elapsed time in ms
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

- Get
    ```javascript
    var timeScale = clock.timeScale;
    ```
- Set
    ```javascript
    clock.setTimeScale(timeScale);
    // clock.timeScale = timeScale;
    ```

### Events

- On ticking
    ```javascript
    clock.on('update', function(now, delta){ })
    ```
    - `now` : Elapsed time in ms.
    - `delta` : Delta time in ms.
