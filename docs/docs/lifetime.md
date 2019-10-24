## Introduction

Destroy game object when time-out.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/lifetime-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexlifetimeplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/lifetime)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexLifeTime from './plugins/lifeTime.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import LifeTimePlugin from './plugins/lifeTime-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexLifeTime',
            plugin: LifeTimePlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var lifeTime = scene.plugins.get('rexLifeTime').add(gameObject, {
    lifeTime: 1000,
    // destroy: true,
    // start: true
});
```

- `lifeTime` : Life time in ms.
- `destroy` : Set `true` to destroy game object when time-out.
- `start`: Set `true` to starting counting now.

### Events

- On time-out
    ```javascript
    lifeTime.on('complete', function(gameObject, lifeTime){});
    // lifeTime.once('complete', function(gameObject, lifeTime){});
    ```

### Life-time

- Set
    ```javascript
    lifeTime.setLifeTime(time);
    ```
- Add to
    ```javascript
    lifeTime.addToLifeTime(time);
    ```
- Get life-time
    ```javascript
    var time = lifeTime.lifeTime;
    ```
- Get remainder time
    ```javascript
    var time = lifeTime.remainder;
    ```
- Is alive
    ```javascript
    var isAlive = lifeTime.isAlive;
    ```

### Start/Stop/Pause/Resume

- Start
    ```javascript
    lifeTime.start();
    ```
- Stop
    ```javascript
    lifeTime.stop();
    ```
- Pause
    ```javascript
    lifeTime.pause();
    ```
- Resume
    ```javascript
    lifeTime.resume();
    ```