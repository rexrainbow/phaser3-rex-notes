## Introduction

Display of both static and animated images, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Load texture

Texutre for static image

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
    }
    ```
- Create instance
    ```javascript
    var sprite = new MySprite(scene, x, y, key);
    ```

### Other properties

See [game object](gameobject.md)

### Animation

#### Create animation

```javascript
var config = {
    key: '',
    frames: [],
    defaultTextureKey: null,

    // time
    delay: 0,
    frameRate: null,
    duration: null,
    skipMissedFrames: true,

    // repeat
    repeat: 0,              // set to (-1) to repeat forever
    repeatDelay: 0,
    yoyo: false,

    // visible
    showOnStart: false,
    hideOnComplete: false
};
scene.anims.create(config);
```

- `frames` : An array of frames' name
    ```javascript
    scene.anims.generateFrameNames(key);
    ```
    or
    ```javascript
    var config = {
        prefix: '',
        start: 0,
        end: 0,
        suffix: '',
        zeroPad: 0,
        outputArray: [],
        frames: false
    };
    scene.anims.generateFrameNames(key, config);
    ```

#### Control animation

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
- Play in reverse
    ```javascript
    sprite.anims.playReverse(key);
    // sprite.playReverse(key, ignoreIfPlaying, startFrame);
    ```
- Time scale
    ```javascript
    sprite.anims.setTimeScale(value);
    ```
- Pause
    ```javascript
    sprite.anims.pause();
    // sprite.anims.pause(atFrame);
    ```
- Resume
    ```javascript
    sprite.anims.resume();
    // sprite.anims.resume(fromFrame);
    ```
- Stop
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
- Restart
    ```javascript
    sprite.anims.restart();
    // sprite.anims.restart(includeDelay);
    ```
- Repeat
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
    sprite.on('animationstart', function(currentAnim, currentFrame){});
    ```
- On complete
    ```javascript
    sprite.on('animationcomplete', function(currentAnim, currentFrame){});
    ```
- On update
    ```javascript
    sprite.on('animationupdate', function(currentAnim, currentFrame){});
    ```

### Animation manager

- Play animation of sprites
    - Play
        ```javascript
        scene.anims.play(key, children);
        ```
    - Stagger play (delay play)
        ```javascript
        scene.anims.staggerPlay(key, children, stagger);
        ```
        - `children` : An array of Game Objects to play the animation on
        - `stagger` : The amount of time, in milliseconds, to offset each play time by
- Remove animations
    ```javascript
    scene.anims.remove(key);
    ```
- Pause all animations
    ```javascript
    scene.anims.pauseAll();
    ```
- Resume all animations
    ```javascript
    scene.anims.resumeAll();
    ```

#### Events

- On add animation
   ```javascript
   scene.anims.on('add', function(key, anim) {});
   ```
- On remove animation
   ```javascript
   scene.anims.on('remove', function(key, anim) {});
   ```
- On pause all animations
   ```javascript
   scene.anims.on('pauseall', function() {});
   ```
- On resume all animations
   ```javascript
   scene.anims.on('resumeall', function() {});
   ```