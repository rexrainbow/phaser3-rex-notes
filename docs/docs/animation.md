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

#### Remove animation

```javascript
scene.anims.remove(key);
```

#### Play animation

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

#### Pause all animations

```javascript
scene.anims.pauseAll();
```

#### Resume all animations

```javascript
scene.anims.resumeAll();
```

#### Reverse animation

```javascript
scene.anims.reverse(key);
```

#### Has animation

```javascript
var exists = scene.anims.exists(key);
```

#### Export/load

- Export JSON
    ```javascript
    var json = scene.anims.toJSON();
    ```
- Load from JSON
    ```javascript
    scene.anims.fromJSON(json);
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

#### Events

- On start
    ```javascript
    anim.on('start', function(currentAnim, currentFrame, sprite){});
    ```
- On restart
    ```javascript
    anim.on('restart', function(currentAnim, currentFrame, sprite){});
    ```
- On complete
    ```javascript
    anim.on('complete', function(currentAnim, currentFrame, sprite){});
    ```
- On repeat
    ```javascript
    anim.on('repeat', function(currentAnim, currentFrame, sprite){});
    ```