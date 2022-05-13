## Introduction

Play animation on [perspective-image](perspective-image.md).

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Play animation](https://codepen.io/rexrainbow/pen/JjyxKLX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-sprite)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add sprite object
    ```javascript
    var sprite = scene.add.rexPerspectiveSprite(x, y, texture, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPerspectiveImagePlugin',
                plugin: PerspectiveImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add sprite object
    ```javascript
    var sprite = scene.add.rexPerspectiveSprite(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { PerspectiveSprite } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add sprite object
    ```javascript    
    var sprite = new PerspectiveSprite(scene, x, y, texture, frame, config);
    scene.add.existing(sprite);
    ```

### Create instance

```javascript
var sprite = scene.add.rexPerspectiveSprite(x, y, texture, frame, {
    // width: undefined,
    // height: undefined,
    // hideCCW: true,
    // gridWidth: 32,
    // girdHeight: 32
});
```

or 

```javascript
var sprite = scene.add.rexPerspectiveImage({
    // x: 0,
    // y: 0,
    key,
    // frame: null,
    // width: undefined,
    // height: undefined,
    // hideCCW: true,
    // gridWidth: 32,
    // girdHeight: 32
});
```

Add perspectiveimage from JSON

```javascript
var perspectiveimage = scene.make.rexPerspectiveImage({
    x: 0,
    y: 0,
    
    key: null,
    frame: null,

    // width: undefined,
    // height: undefined,
    // hideCCW: false,
    // gridWidth: 32,
    // girdHeight: 32,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyPerspectiveSprite extends PerspectiveSprite {
        constructor(scene, x, y, texture, frame, config) {
            super(scene, x, y, texture, frame, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {
        //     super.preUpdate(time, delta);
        // }
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var sprite = new MyPerspectiveSprite(scene, x, y, texture, frame, config);
    ```

### Play animation

- Play
    ```javascript
    sprite.play(key);
    // sprite.play(key, ignoreIfPlaying);
    ```
    - `key` : Animation key string, or animation config
        - String key of animation
        - Animation config, to override default config
            ```javascript
            {
                key,
                frameRate,
                duration,
                delay,
                repeat,
                repeatDelay,
                yoyo,
                showOnStart,
                hideOnComplete,
                startFrame,
                timeScale
            }
            ```
- Play in reverse
    ```javascript
    sprite.playReverse(key);
    // sprite.playReverse(key, ignoreIfPlaying);
    ```
    - `key` : Animation key string, or animation config
- Play after delay
    ```javascript
    sprite.playAfterDelay(key, delay);
    ```
    - `key` : Animation key string, or animation config
- Play after repeat
    ```javascript
    sprite.playAfterRepeat(key, repeatCount);
    ```
    - `key` : Animation key string, or animation config

#### Chain

- Chain next animation
    ```javascript
    sprite.chain(key);
    ```
    - `key` : Animation key string, or animation config
- Chain next and next animation
    ```javascript
    sprite.chain(key0).chain(key1);
    ```
    - `key0`, `key1` : Animation key string, or animation config

#### Stop

- Immediately stop
    ```javascript
    sprite.stop();
    ```
- Stop after delay
    ```javascript
    sprite.stopAfterDelay(delay);
    ```
- Stop at frame
    ```javascript
    sprite.stopOnFrame(frame);
    ```
    - `frame` : Frame object in current animation.
        ```javascript
        var currentAnim = sprite.anims.currentAnim;
        var frame = currentAnim.getFrameAt(index);
        ```
- Stop after repeat
    ```javascript
    sprite.stopAfterRepeat(repeatCount);
    ```

#### Restart

```javascript
sprite.anims.restart();
// sprite.anims.restart(includeDelay, resetRepeats);
```

### Other properties

See [Perspective image](perspective-image.md) game object.