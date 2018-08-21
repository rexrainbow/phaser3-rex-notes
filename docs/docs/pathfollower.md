## Introduction

Set position of game object on a [path](path.md).

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/pathfollower-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexpathfollowerplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/pathfollower)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexPathFollower from './plugins/pathfollower.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import PathFollowerPlugin from './plugins/pathfollower-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexPathFollower',
            plugin: PathFollowerPlugin,
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
// var path = scene.add.path();
var pathFollower = scene.plugins.get('rexPathFollower').add(gameObject, {
    // path: path,          // path object
    // t: 0,                // t: 0~1
    // rotateToPath: false,
    // rotationOffset: 0,
    // angleOffset: 0
});
```

- `path` : [Path](path.md) object
- `t` : Initial value of property `t` (0~1)
- `rotateToPath`: Set true to change angle towards path
- `rotationOffset` : Rotation offset in radian, or `angleOffset` in degrees

### Move along path

Set `pathFollower.t` (0~1) to move along path

```javascript
pathFollower.t = t;  // t: 0~1
// pathFollower.setT(t);
```

or [tween](tween.md) `pathFollower.t`

```javascript
var tween = scene.tweens.add({
    targets: pathFollower,
    t: 1,
    ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 1000,
    repeat: 0,
    yoyo: false
});
```

### Set path

```javascript
pathFollower.setPath(path);
```

### Set rotate-to-path

```javascript
pathFollower.setRotateToPath(rotateToPath, rotationOffset);
```

- `rotateToPath` : Set true to change angle towards path
- `rotationOffset` : Rotation offset in radian