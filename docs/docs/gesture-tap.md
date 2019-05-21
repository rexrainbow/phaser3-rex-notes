## Introduction

Get tap/multi-taps events of a game object.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gestures-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgesturesplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gesture-tap)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import GesturesPlugin from './plugins/gestures-plugin.js';

var config = {
    // ...
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var tap = scene.rexGestures.add.tap(gameObject, {
    // enable: true,

    // time: 250,
    // tapInterval: 200,
    // threshold: 9,
    // tapOffset: 10,

    // taps: undefined,
    // minTaps: undefined,
    // maxTaps: undefined,
});
```

- `enable` : Set `false` to disable input events.
- `time` : Max time of the pointer to be down.
- `tapInterval` : Max time between the multi-tap taps.
- `threshold` : Minimal movement when pointer is down.
- `tapOffset` : A multi-tap can be a bit off the initial position.
- `taps` : Fire `tap` event only when taps count reaches this value.
    - `undefined` : Fire `tap` event only when tapped end. i.e pointer-up time exceeds `tapInterval`.
- `minTaps` : Fire `tap` event only when taps count is larger than this value.
    - `undefined` : Don't check taps count.
- `maxTaps` : Fire `tap` event only when taps count is less than this value.
    - `undefined` : Don't check taps count.

### Enable

- Get
    ```javascript
    var enable = tap.enable;  // enable: true, or false
    ```
- Set
    ```javascript
    tap.setEnable(enable);  // enable: true, or false
    ```

### Events

#### Tap

```javascript
tap.on('tap', function(tap){
}, scope);
```

- `tap.tapsCount` : Taps count.
- `tap.gameObject` : Parent gameobject of this tap behavior.
- `tap.worldX`, `tap.worldY` : World position of first tapping.
- `tap.x`, `tap.y` : Scene position of first tapping.


```javascript
tap.on(tapsCount + 'tap', function(tap){
}, scope);
```

- `tapsCount + 'tap'` : `1tap`, `2tap`, `3tap`, etc ...

#### Tapping start

Each pointer-down will increase taps count and fire `tappingstart` event.

```javascript
tap.on('tappingstart', function(tap){
}, scope);
```

### Is tap

```javascript
var isTapped = tap.isTapped;
```

Return `true` if tapped end.
