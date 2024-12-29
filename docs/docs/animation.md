## Introduction

Animation and animations manager.

- Author: Phaser Team

## Usage

### Animation manager

#### Add animation

```javascript
var animationConfig = {
    key: '',

    frames: [],

    sortFrames: true,
    defaultTextureKey: null,
    skipMissedFrames: true,
    randomFrame: false,

    // time
    delay: 0,
    duration: null,
    frameRate: null,
    timeScale: 1,

    // repeat
    repeat: 0,              // set to (-1) to repeat forever
    repeatDelay: 0,
    yoyo: false,

    // visible
    showBeforeDelay: false,
    showOnStart: false,
    hideOnComplete: false
};

scene.anims.create(animationConfig);
```

- `key` : Unique key of this animation data
- `frames` : An array of `{key, frame}`
    - Properties
        ```javascript
        {
            key: '',
            frame: '', // string, or number
            duration: 0
        }
        ```
        - `duration` : The duration, in ms, of this frame of the animation.
    - A string : Texture key.
    - Every frame in the atlas
        ```javascript
        scene.anims.generateFrameNames(key);
        ```
    - Frame sequence indexing from start to end
        ```javascript
        var config = ;
        scene.anims.generateFrameNames(key,
        {
            prefix: '',
            start: 0,
            end: 0,
            suffix: '',
            zeroPad: 0,
            // outputArray: [], // Append frames into this array
        });
        ```
        - `prefix + Pad(i, zeroPad, '0', 1) + suffix`, i: start ~ end
    - Custom frame sequence
        ```javascript
        var config = ;
        scene.anims.generateFrameNames(key,
        {
            prefix: '',
            suffix: '',
            zeroPad: 0,
            frames: [ ... ]
            // outputArray: [], // Append frames into this array
        });
        ```
        - `prefix + Pad(frames[i], zeroPad, '0', 1) + suffix`
- `sortFrames` : Frame names numerically sorted. Default value is `true`.
- `defaultTextureKey` : The key of the texture all frames of the animation will use. Can be overridden on a per frame basis.
- `skipMissedFrames` : Skip frames if the time lags, or always advanced anyway? Default value is `true`.
- `randomFrame` : Start playback of this animation from a randomly selected frame? Default value is `false`.
- `delay` : Delay before starting playback. Value given in milliseconds.
- `duration` : How long the animation should play for in milliseconds. If not given its derived from `frameRate`.
- `frameRate` : The frame rate of playback in frames per second. Default value is `24`.
- `timeScale` : The time scale to be applied to playback of this animation. Default value is `1`.
- `repeat` : Number of times to repeat the animation. Default value is `0`.
    - `-1` : Infinity
- `repeatDelay` : Delay before the animation repeats. Value given in milliseconds.
- `yoyo` : Should the animation yoyo? (reverse back down to the start) before repeating? Default value is `false`.
- `showBeforeDelay` :  If this animation has a delay, should it show the first frame immediately (`true`), or only after the delay (`false`)
- `showOnStart` : Should `sprite.visible = true` when the animation starts to play? This happens _after_ any delay, if set. Default value is `false`.
- `hideOnComplete` : Should sprite.visible = false when the animation finishes? Default value is `false`.

##### Add from Aseprite

[Aseprite](tools.md#aseprite)

```javascript
scene.anims.createFromAseprite(key);
// scene.anims.createFromAseprite(key, tags, target);
```

- `key` : The key of the loaded Aseprite atlas.
- `tags` :
    - `undefined` : Load all tags.
    - Array of string tag : Load these tags.
- `target` : Create the animations on this target Sprite. 
    - `undefined` : Created globally in this Animation Manager. Default behavior.

#### Remove animation

```javascript
scene.anims.remove(key);
```

#### Delay between two animations

- Add
    ```javascript
    scene.anims.addMix(animA, animB, delay);
    ```
    - `animA`, `animB` : String key of an animation, or an instance of animation.
- Remove
    ```javascript
    scene.anims.removeMix(animA, animB);
    // scene.anims.removeMix(animA);
    ```
- Get
    ```javascript
    var delay = scene.anims.getMix(animA, animB);
    ```

#### Play animation

- Play
    ```javascript
    scene.anims.play(key, children);
    ```
- Stagger play (delay play)
    ```javascript
    scene.anims.staggerPlay(key, children, stagger, staggerFirst);
    ```
    - `children` : An array of Game Objects to play the animation on
    - `stagger` : The amount of time, in milliseconds, to offset each play time by
    - `staggerFirst` : Set `true` to apply delay on 1st child

#### Pause all animations

```javascript
scene.anims.pauseAll();
```

#### Resume all animations

```javascript
scene.anims.resumeAll();
```

#### Global time scale

- Get
    ```javascript
    var timeScale = scene.anims.globalTimeScale;
    ```
- Set
    ```javascript
    scene.anims.globalTimeScale = timeScale;
    ```

#### Has animation

```javascript
var hasAnim = scene.anims.exists(key);
```

#### Export/load

- Export JSON
    ```javascript
    var json = scene.anims.toJSON();
    ```
- Load from JSON
    ```javascript
    scene.anims.fromJSON(json);
    // scene.anims.fromJSON(json, clearCurrentAnimations);
    ```
    - Load JSON in preload stage
        ```javascript
       scene.load.json(key, url);
       ```
    - Load animation in preload stage
        ```javascript
        scene.load.animation(key, url);
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

### Animation object

```javascript
var anim = scene.anims.get(key);
```

#### Add frame

- Append frames
    ```javascript
    anim.addFrame(frame);
    ```
    - `frame` : `scene.anims.generateFrameNames(key, config)`
- Insert frames at index
    ```javascript
    anim.addFrameAt(index, frame);
    ```
    - `frame` : `scene.anims.generateFrameNames(key, config)`

#### Remove frame

- Remove frame at
    ```javascript
    anim.removeFrameAt(index);
    ```
- Remove frame
    ```javascript
    anim.removeFrame(frame);
    ```

#### Get frame

- Has frame index
    ```javascript
    var HasFrameAt = anim.checkFrame(index);
    ```
- Get frame at index
    ```javascript
    var frame = anim.getFrameAt(index);
    ```
- Get last frame
    ```javascript
    var frame = anim.getLastFrame();
    ```

#### Export

- Export JSON
    ```javascript
    var json = anim.toJSON();
    ```
    or
    ```javascript
    var jsonString = JSON.stringify(anim);
    ```