## Introduction

A Plane is a kind of [Mesh game object](mesh.md) with one-sided grid of cells. which 
can have a texture that is either repeated (tiled) across each cell, or applied to the full Plane.

- Author: Richard Davey

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add plane object

```javascript
var plane = scene.add.plane(x, y, key);
// var plane = scene.add.plane(x, y, key, frame);
// var plane = scene.add.plane(x, y, texture, frame, width, height, tile);
```

- `x`, `y` : Position
- `key`, `frame` : Texture key of 
- `width`, `height` : The width/height of this Plane, **in cells**, not pixels.
- `tile` : Is the texture tiled? I.e. repeated across each cell.


Add plane from JSON

```javascript
var plane = scene.make.plane({
    x: 0,
    y: 0,
    key: '',
    // frame: '',
    // width: 8,
    // height: 8,
    // tile: false,
    // checkerboard: null,
    // checkerboard: { color1, color2, alpha1, alpha2, height }

    // angle: 0,
    // alpha: 1,
    // scale : {
    //    x: 1,
    //    y: 1
    //},
    // origin: {x: 0.5, y: 0.5},

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyPlane extends Phaser.GameObjects.Plane {
        constructor(scene, x, y, texture, frame, width, height, tile) {
            super(scene, x, y, texture, frame, width, height, tile);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var plane = new MyPlane(scene, x, y, texture, frame, width, height, tile);
    ```

### Texture

See [game object - texture](gameobject.md#texture)

### Animation

See [Sprite's animation section](sprite.md#animation).

#### Play animation

- Play
    ```javascript
    plane.play(key);
    // plane.play(key, ignoreIfPlaying);
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
    plane.playReverse(key);
    // plane.playReverse(key, ignoreIfPlaying);
    ```
    - `key` : Animation key string, or animation config
- Play after delay
    ```javascript
    plane.playAfterDelay(key, delay);
    ```
    - `key` : Animation key string, or animation config
- Play after repeat
    ```javascript
    plane.playAfterRepeat(key, repeatCount);
    ```
    - `key` : Animation key string, or animation config

#### Stop

- Immediately stop
    ```javascript
    plane.stop();
    ```
- Stop after delay
    ```javascript
    plane.stopAfterDelay(delay);
    ```
- Stop at frame
    ```javascript
    plane.stopOnFrame(frame);
    ```
    - `frame` : Frame object in current animation.
        ```javascript
        var currentAnim = plane.anims.currentAnim;
        var frame = currentAnim.getFrameAt(index);
        ```
- Stop after repeat
    ```javascript
    plane.stopAfterRepeat(repeatCount);
    ```

#### Properties

- Has started
    ```javascript
    var hasStarted = plane.anims.hasStarted;
    ```
- Is playing
    ```javascript
    var isPlaying = plane.anims.isPlaying;
    ```
- Is paused
    ```javascript
    var isPaused = plane.anims.isPaused;
    ```
- Total frames count
    ```javascript
    var frameCount = plane.anims.getTotalFrames();
    ```
- Delay
    ```javascript
    var delay = plane.anims.delay;
    ```
- Repeat
    - Total repeat count
        ```javascript
        var repeatCount = plane.anims.repeat;
        ```
    - Repeat counter
        ```javascript
        var repeatCount = plane.anims.repeatCounter;
        ```
    - Repeat delay
        ```javascript
        var repeatDelay = plane.anims.repeatDelay;
        ```
    - Yoyo
        ```javascript
        var repeatDelay = plane.anims.yoyo;
        ```
- Current animation key
    ```javascript
    var key = plane.anims.getName();
    ```
    - `key` : Return `''` if not playing any animation.
- Current frame name
    ```javascript
    var frameName = plane.anims.getFrameName();
    ```
    - `frameName` : Return `''` if not playing any animation.
- Current animation
    ```javascript
    var currentAnim = plane.anims.currentAnim;
    ```
- Current frame
    ```javascript
    var currentFrame = plane.anims.currentFrame;
    ```

### Interactive

To test if pointer is at any face of this mesh game object.

```javascript
plane.setInteractive();
```

### Other properties

See [Mesh game object](mesh.md), [game object](gameobject.md)

### Checkerboard

Creates a checkerboard style texture, 
based on the given colors and alpha values and applies it to this Plane, 
replacing any current texture it may have.

- Create
    ```javascript
    plane.createCheckerboard(color1, color2, alpha1, alpha2, height)
    ```
- Remove
    ```javascript
    plane.removeCheckerboard();
    ```

### Other properties

See [Mesh game object](mesh.md), [game object](gameobject.md)

### Create mask

```javascript
var mask = plane.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Support [postFX effects](shader-builtin.md)

!!! note
    No preFX effect support
