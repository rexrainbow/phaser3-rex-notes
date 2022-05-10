## Introduction

Get time from previous closing application to now.

- Author: Rex
- Standalone object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/awaytime)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexawaytimeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexawaytimeplugin.min.js', true);
    ```
- Get away-time
    ```javascript
    var awayTime = scene.plugins.get('rexawaytimeplugin').awayTime;
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import AwayTimePlugin from 'phaser3-rex-plugins/plugins/awaytime-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexAwayTime',
                plugin: AwayTimePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Get away-time
    ```javascript
    var awayTime = scene.plugins.get('rexAwayTime').awayTime;
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import AwayTime from 'phaser3-rex-plugins/plugins/awaytime.js';
    ```
- Get away-time
    ```javascript
    var awayTime = (new AwayTime()).awayTime;
    ```

### Default away-timer

#### Get away-time

```javascript
var awayTime = scene.plugins.get('rexAwayTime').awayTime;
// var awayTime = scene.plugins.get('rexAwayTime').setKey(key).setPeriod(time).awayTime;
```

- `awayTime` : Time in millisecond.
- `key` : Save curent time-stamp in key of [localstorage](localstorage.md). Default value is `'away'`.
- `time` : Period of saving current time-stamp. Default value is `1000`.

!!! note
    This action also starts saving current time-stamp periodically into localstorage.

#### Set key

```javascript
scene.plugins.get('rexAwayTime').setKey(key);
```

- `key` : Save curent time-stamp in key of [localstorage](localstorage.md)

#### Set period

```javascript
scene.plugins.get('rexAwayTime').setPeriod(time);
```

- `time` : Period of saving current time-stamp.

### Add away timer object

```javascript
var awayTimer = scene.plugins.get('rexAwayTime').add({
    key: 'away',
    period: 1000
})
```

#### Get away-time

```javascript
var awayTime = awayTimer.awayTime;
```

Will also start timer.

#### Stop timer

```javascript
awayTimer.stop();
```