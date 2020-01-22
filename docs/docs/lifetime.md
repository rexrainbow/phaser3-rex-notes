## Introduction

Destroy game object when time-out.

- Author: Rex
- Behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/lifetime)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlifetimeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlifetimeplugin.min.js', true);
    ```
- Add life-time behavior
    ```javascript
    var lifeTime = scene.plugins.get('rexlifetimeplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LifeTimePlugin from 'phaser3-rex-plugins/plugins/lifetime-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLifeTime',
                plugin: LifeTimePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add life-time behavior
    ```javascript
    var lifeTime = scene.plugins.get('rexLifeTime').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LifeTime from 'phaser3-rex-plugins/plugins/lifetime.js';
    ```
- Add life-time behavior
    ```javascript
    var lifeTime = new LifeTime(gameObject, config);
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