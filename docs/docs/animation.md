## Introduction

Animation and animations manager.

- Author: Richard Davey

## Usage

### Animation manager

#### Add animation

```javascript
scene.anims.create({
    key: '',
    frames: [],
    skipMissedFrames: true,
    defaultTextureKey: null,
    startFrame: 0,

    // time
    delay: 0,
    frameRate: null,
    duration: null,
    timeScale: 1,

    // repeat
    repeat: 0,              // set to (-1) to repeat forever
    repeatDelay: 0,
    yoyo: false,

    // visible
    showOnStart: false,
    hideOnComplete: false
});
```

- `frames` : An array of `{key, frame}`
    - Properties
        ```javascript
        {
            key: '',
            frame: '', // string, or number
            duration: 0,
            visible: true
        }
        ```
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

##### Add from Aseprite

[Aseprite](tools.md#aseprite)

```javascript
scene.anims.createFromAseprite(key);
// scene.anims.createFromAseprite(key, tags);
```

- `key` : The key of the loaded Aseprite atlas.
- `tags` :
    - `undefined` : Load all tags.
    - Array of string tag : Load these tags.

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