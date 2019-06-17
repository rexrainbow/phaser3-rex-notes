## Introduction

Display of both static and animated images, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

Texture for static image

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Load atlas

Atlas for animation images

```javascript
scene.load.atlas(key, textureURL, atlasURL);
```

Reference: [load atlas](loader.md#texture-atlas)

### Add sprite object

```javascript
var sprite = scene.add.sprite(x, y, key);
```

Add sprite from JSON

```javascript
var sprite = scene.make.sprite({
    x: 0,
    y: 0,
    key: '',

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true,
    // scale : {
    //    x: 1,
    //    y: 1
    //},

    // anims: {
        // key: ,
        // repeat: ,
        // ...
    // },

    add: true
});
```

- `key` :
    - A string
    - An array of string to pick one element at random
- `x`, `y`, `scale.x`, `scale.y` :
    - A number
    - A callback to get return value
        ```javascript
        function() { return 0; }
        ```
    - Random integer between min and max
        ```javascript
        { randInt: [min, max] }
        ```
    - Random float between min and max
        ```javascript
        { randFloat: [min, max] }
        ```

### Custom class

- Define class
    ```javascript
    class MySprite extends Phaser.GameObjects.Sprite {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
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
    var sprite = new MySprite(scene, x, y, key);
    ```

### Other properties

See [game object](gameobject.md)

### Animation

#### Create animation

See [Add animation section](animation.md#add-animation).

#### Load animation

```javascript
sprite.anims.load(key);
// sprite.anims.load(key, startFrame);
```

#### Play animation

- Play
    ```javascript
    sprite.play(key);
    // sprite.play(key, ignoreIfPlaying, startFrame);
    ```
    or
    ```javascript
    sprite.anims.play(key);
    // sprite.anims.play(key, ignoreIfPlaying, startFrame);
    ```
    - Set current frame
        ```javascript
        sprite.anims.setCurrentFrame(frame);
        ```
    - Set playback progress
        ```javascript
        sprite.anims.setProgress(t); // t: 0~1
        ```
- Play in reverse
    ```javascript
    sprite.anims.playReverse(key);
    // sprite.playReverse(key, ignoreIfPlaying, startFrame);
    ```
    - Reverse the Animation that is already playing
        ```javascript
        sprite.anims.reverse(key);
        ```
- Chain next animation
    ```javascript
    sprite.anims.chain(key);
    ```
    - Reset
        ```javascript
        sprite.anims.chain();
        ```
- Set to next frame
    ```javascript
    sprite.anims.nextFrame();
    ```
- Set to previous frame
    ```javascript
    sprite.anims.previousFrame();
    ```
- Time scale
    ```javascript
    sprite.anims.setTimeScale(value);
    ```

#### Pause

```javascript
sprite.anims.pause();
// sprite.anims.pause(atFrame);
```

#### Resume

```javascript
sprite.anims.resume();
// sprite.anims.resume(fromFrame);
```

#### Stop

```javascript
sprite.anims.stop();
```
or
```javascript
sprite.anims.stopAfterDelay(delay);
```
or
```javascript
sprite.anims.stopOnFrame(frame);
```

#### Restart

```javascript
sprite.anims.restart();
// sprite.anims.restart(includeDelay);
```

#### Repeat

- Set repeat
    ```javascript
    sprite.anims.setRepeat(value);
    ```
- Set yoyo
    ```javascript
    sprite.anims.setYoyo(value);
    ```
- Stop repeat
    ```javascript
    sprite.anims.stopOnRepeat();
    ```
- Set repeat delay
    ```javascript
    sprite.anims.setRepeatDelay();
    ```

#### Properties

- Is playing
    ```javascript
    var isPlaying = sprite.anims.isPlaying;
    ```
- Is paused
    ```javascript
    var isPaused = sprite.anims.isPaused;
    ```
- Total frames count
    ```javascript
    var frameCount = sprite.anims.getTotalFrames();
    ```
- Time scale
    ```javascript
    var timescale = sprite.anims.getTimeScale();
    ```
- Progress
    - Progress ignoring repeats and yoyos
        ```javascript
        var progress = sprite.anims.getProgress();
        ```
- Repeat
    - Repeat count
        ```javascript
        var repeatCount = sprite.anims.getRepeat();
        ```
    - Yoyo
        ```javascript
        var repeatDelay = sprite.anims.getYoyo();
        ```
    - Repeat delay
        ```javascript
        var repeatDelay = sprite.anims.getRepeatDelay();
        ```
- Current animation
    ```javascript
    var currentAnim = sprite.anims.currentAnim;
    ```
- Current frame
    ```javascript
    var currentAnim = sprite.anims.currentFrame;
    ```

#### Events

- On start
    ```javascript
    sprite.on('animationstart', function(currentAnim, currentFrame, sprite){});
    ```
    ```javascript
    sprite.on('animationstart-' + key, function(currentAnim, currentFrame, sprite){});
    ```
- On restart
    ```javascript
    sprite.on('animationrestart', function(currentAnim, currentFrame, sprite){});
    ```
    ```javascript
    sprite.on('animationrestart-' + key, function(currentAnim, currentFrame, sprite){});
    ```
- On complete
    ```javascript
    sprite.on('animationcomplete', function(currentAnim, currentFramee, sprite){});
    ```
    ```javascript
    sprite.on('animationcomplete-' + key, function(currentAnim, currentFramee, sprite){});
    ```
- On update
    ```javascript
    sprite.on('animationupdate', function(currentAnim, currentFrame, sprite){});
    ```
    ```javascript
    sprite.on('animationupdate-' + key, function(currentAnim, currentFrame, sprite){});
    ```
- On repeat
    ```javascript
    sprite.on('animationrepeat', function(currentAnim, currentFrame, sprite){});
    ```
    ```javascript
    sprite.on('animationrepeat-' + key, function(currentAnim, currentFrame, sprite){});
    ```