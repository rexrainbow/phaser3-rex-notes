## Introduction

Flashing (set invisible then visible) game object.

- Author: Rex
- Behavior of game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/flash)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexflashplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexflashplugin.min.js', true);
    ```
- Add flash behavior
    ```javascript
    var flash = scene.plugins.get('rexflashplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FlashPlugin from 'phaser3-rex-plugins/plugins/flash-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexFlash',
                plugin: FlashPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add flash behavior
    ```javascript
    var flash = scene.plugins.get('rexFlash').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Flash from 'phaser3-rex-plugins/plugins/flash.js';
    ```
- Add flash behavior
    ```javascript
    var flash = new Flash(gameObject, config);
    ```

### Create instance

```javascript
var flash = scene.plugins.get('rexFlash').add(gameObject, {
    // duration: 500,
    // repeat: 2
});
```

- `duration` : Duration of invisible(50%) and visible(50%), in millisecond.
- `repeat` : The number of times the flashing will repeat itself (a value of 1 means the flash will play twice, as it repeated once)

### Start flashing

```javascript
flash.flash();
// flash.flash(duration, repeat);
```

or

```javascript
flash.flash({
    duration: 500,
    repeat: 2
});
```

### Stop flashing

```javascript
flash.stop();
```

### Enable

- Enable/resume (default)
    ```javascript
    flash.setEnable();
    ```
    or
    ```javascript
    flash.enable = true;
    ```
- Disable/pause
    ```javascript
    flash.setEnable(false);
    ```
    or
    ```javascript
    flash.enable = false;
    ```

### Set duration

```javascript
flash.setDuration(duration);
// flash.duration = duration;
```

### Set repeat

```javascript
flash.setRepeat(repeat);
// flash.repeat = repeat;
```

### Events

- On reached target
    ```javascript
    flash.on('complete', function(flash, gameObject){});
    ```

### Status

- Is flashing
    ```javascript
    var isRunning = flash.isRunning;
    ```
