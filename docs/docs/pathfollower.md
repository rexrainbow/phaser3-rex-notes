## Introduction

Set position of game object on a [path](path.md).

- Author: Rex
- Behavior of game object

## Live demos

- [Path follower](https://codepen.io/rexrainbow/pen/GXKPKB)
- [Spaced points](https://codepen.io/rexrainbow/pen/Jjraeag)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/pathfollower)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexpathfollowerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js', true);
    ```
- Add path-follower behavior
    ```javascript
    var pathFollower = scene.plugins.get('rexpathfollowerplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PathFollowerPlugin from 'phaser3-rex-plugins/plugins/pathfollower-plugin.js';
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
- Add path-follower behavior
    ```javascript
    var pathFollower = scene.plugins.get('rexPathFollower').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import PathFollower from 'phaser3-rex-plugins/plugins/pathfollower.js';
    ```
- Add path-follower behavior
    ```javascript
    var pathFollower = new PathFollower(gameObject, config);
    ```

### Create instance

```javascript
// var path = scene.add.path();
var pathFollower = scene.plugins.get('rexPathFollower').add(gameObject, {
    // path: path,          // path object
    // t: 0,                // t: 0~1
    // rotateToPath: false,
    // rotationOffset: 0,
    // angleOffset: 0,

    // spacedPoints: false,
    // spacedPoints: {
    //     divisions: undefined,
    //     stepRate: 10,
    // }

});
```

- `path` : [Path](path.md) object
- `t` : Initial value of property `t` (0~1)
- `rotateToPath`: Set true to change angle towards path
- `rotationOffset` : Rotation offset in radian, or `angleOffset` in degrees
- `spacedPoints` :
    - `false`, or `undefined` : Get point by `path.getPoint(t)`
    - `spacedPoints.divisions`, `spacedPoints.stepRate` : 
        1. Get points by `path.getSpacedPoints(divisions, stepRate)`
        2. Get point from linear interpolation of points in step1.

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

- `rotateToPath` : Set `true` to change angle towards path
- `rotationOffset` : Rotation offset in radian