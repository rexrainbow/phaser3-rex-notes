## Introduction

Shake position of game object.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/shakeposition-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexshakepositionplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shake)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexShake from './plugins/shakeposition.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import ShakePlugin from './plugins/shakeposition-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexShake',
            plugin: ShakePlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var shake = scene.plugins.get('rexShake').add(gameObject, {
    // mode: 1, // 0|'effect'|1|'behavior'
    // duration: 500,
    // magnitude: 10,
    // magnitudeMode: 1, // 0|'constant'|1|'decay'
});
```

- `mode` :
    - `'effect'`, or `0` : Shake position in `'poststep'` game event, and restore in `'step'` game event.
    - `'behavior'`, or `1` : Shake position in `'preupdate'` scene event.
- `duration` : Duration of shaking, in millisecond.
- `magnitude` : The strength of the shake, in pixels.
- `magnitudeMode` :
    - `'constant'`, or `0` : Constant strength of the shake.
    - `'decay'`, or `1` : Decay the strength of the shake.

### Start shaking

```javascript
shake.shake();
// shake.shake(duration, magnitude);
```

or

```javascript
shake.shake({
    duration: 500,
    magnitude: 10
});
```

### Stop shakeing

```javascript
shake.stop();
```

### Enable

- Enable/resume (default)
    ```javascript
    shake.setEnable();
    ```
    or
    ```javascript
    shake.enable = true;
    ```
- Disable/pause
    ```javascript
    shake.setEnable(false);
    ```
    or
    ```javascript
    shake.enable = false;
    ```

### Set updating mode

```javascript
shake.setMode(mode);
```

- `mode` :
    - `'effect'`, or `0` : Shake position in post-update stage, and restore in pre-update stage.
    - `'behavior'`, or `1` : Shake position in pre-update stage.

### Set duration

```javascript
shake.setDuration(duration);
// shake.duration = duration;
```

### Set magnitude

```javascript
shake.setMagnitude(magnitude);
shake.magnitude = magnitude;
```

- `magnitude` : The strength of the shake, in pixels.

### Set magnitude mode

```javascript
shake.setMagnitudeMode(magnitudeMode);
// shake.magnitudeMode = magnitudeMode;
```

- `magnitudeMode` :
    - `'constant'`, or `0` : Constant strength of the shake.
    - `'decay'`, or `1` : Decay the strength of the shake.

### Events

- On reached target
    ```javascript
    shake.on('complete', function(shake, gameObject){});
    ```

### Status

- Is shakeing
    ```javascript
    var isRunning = shake.isRunning;
    ```
