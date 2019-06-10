## Introduction

Get time from previous closing application to now.

- Author: Rex
- Standalone object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/awaytime-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexawaytimeplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/awaytime)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexAwayTime from './plugins/awaytime.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import AwayTimePlugin from './plugins/awaytime-plugin.js';

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
