## Introduction

A Video Game Object.

- Author: Richard Davey

## Usage

### Load video

```javascript
scene.load.video(key, url, loadEvent, asBlob, noAudio);
```

Reference: [load video](loader.md#video)

### Add video object

```javascript
var video = scene.add.rexVideoCanvas(x, y, key);
// var video = scene.add.rexVideoCanvas(x, y);
```

- `key` : Optional key of the Video this Game Object will play, as stored in the Video Cache.

### Play

```javascript
video.play();
// video.play(loop, markerIn, markerOut);
```

- `loop` : Should the video loop automatically when it reaches the end? **Not all browsers support _seamless_ video looping for all encoding formats**.
- `markerIn`, `markerOut` : Optional in/out marker time, in *seconds*, for playback of a sequence of the video.

### Play from URL

1. Add video object
    ```javascript
    var video = scene.add.rexVideoCanvas(x, y);
    ```
2. Play video from URL
    ```javascript
    video.loadURL(url);
    // video.loadURL(url, loadEvent, noAudio);
    ```
    - `loadEvent` : The load event to listen for when *not* loading as a blob.
        - `'loadeddata'` : Data for the current frame is available. Default value.
        - `'canplay'` : The video is ready to start playing.
        - `'canplaythrough'` : The video can be played all the way through, without stopping.
    - `noAudio` : Does the video have an audio track? If not you can enable auto-playing on it. Default value is `false`.

### Pause

- Pause
    ```javascript
    video.setPaused();
    // video.setPaused(true);
    ```
- Resume
    ```javascript
    video.setPaused(false);
    ```

### Stop

Stops the video playing and clears all internal event listeners.

```javascript
video.stop();
```

### Is playing

- Is playing
    ```javascript
    var isPlaying = video.isPlaying();  // (not PAUSE) and (not not ENDED)
    ```
- Is paused
    ```javascript
    var isPaused = video.isPaused();
    ```

### Playback time

- Get
    ```javascript
    var playbackTime = video.getCurrentTime();
    ```
    or
    ```javascript
    var t = video.getProgress(); // t: 0~1
    ```
- Set
    - Set to
        ```javascript
        video.setCurrentTime(playbackTime);  // time in seconds
        ```
        or
        ```javascript
        video.seekTo(t); // t: 0~1
        ```
        - Is seeking
            ```javascript
            var isSeeking = video.isSeeking();
            ```
    - Forward
        ```javascript
        video.setCurrentTime('+' + time);  // time in seconds
        // video.setCurrentTime('+2');
        ```
    - Backeard
        ```javascript
        video.setCurrentTime('-' + time);  // time in seconds
        // video.setCurrentTime('-2');
        ```

### Playback rate

- Get
    ```javascript
    var rate = video.getPlaybackRate();
    ```
- Set
    ```javascript
    video.setPlaybackRate(rate);
    ```

### Duration

```javascript
var duration = video.getDuration();  // time in seconds
```

### Volume

- Get
    ```javascript
    var volume = video.getVolume();  // volume: 0~1
    ```
- Set
    ```javascript
    video.setVolume(volume);  // volume: 0~1
    ```

### Mute

- Get
    ```javascript
    var muted = video.isMuted();  // muted: true/false
    ```
- Set
    ```javascript
    video.setMute(muted);  // muted: true/false
    ```

### Loop

- Get
    ```javascript
    var loop = video.getLoop();  // loop: true/false
    ```
- Set
    ```javascript
    video.setLoop(loop);  // loop: true/false
    ```

### Video key

- Get
    ```javascript
    var key = video.getVideoKey();
    ```
- Change video key (video source)
    ```javascript
    video.changeSource(key);
    // video.changeSource(key, autoplay, loop, markerIn, markerOut);
    ```
    - `autoplay` : Should the video start playing immediately, once the swap is complete?
    - `loop` : Should the video loop automatically when it reaches the end? **Not all browsers support _seamless_ video looping for all encoding formats**.
    - `markerIn`, `markerOut` : Optional in/out marker time, in *seconds*, for playback of a sequence of the video.

### Marks

- Add mark
    ```javascript
    video.addMarker(key, markerIn, markerOut);
    ```
    - `key` : A unique name to give this marker.
    - `markerIn`, `markerOut` : The time, in seconds, representing the start/end of this marker.
- Play mark
    ```javascript
    video.playMarker(key, loop);
    ```
- Remove mark
    ```javascript
    video.removeMarker(key);
    ```

### Snapshot

```javascript
var canvasTexture = video.saveSnapshotTexture(key);
```

or

```javascript
var canvasTexture = video.snapshot();
// var canvasTexture = video.snapshot(width, height);
```

or

```javascript
var canvasTexture = video.snapshotArea(x, y, srcWidth, srcHeight);
// var canvasTexture = video.snapshotArea(x, y, srcWidth, srcHeight, destWidth, destHeight);
```

- `x`, `y` : The horizontal/vertical location of the top-left of the area to grab from.
- `srcWidth`, `srcHeight` : The width/height of area to grab from the video.
- `destWidth`, `destHeight` : The destination width/height of the grab, allowing you to resize it.
- `canvasTexture` : [Canvas texture object](canvas-texture.md).
    - Get key of texture
        ```javascript
        var key = canvasTexture.key;
        ```

### Save texture

The saved texture is automatically updated as the video plays. If you pause this video, or change its source, then the saved texture updates instantly.

```javascript
var texture = video.saveTexture(key);
// var texture = video.saveTexture(key, flipY);
```

- `flipY` : Set to `true` if use it as the input for a Shader.

### Events

- A Video is unlocked by a user gesture.
    ```javascript
    video.on('unlocked', function(video, error){

    }, scope);
    ```
- A Video tries to play a source that does not exist, or is the wrong file type.
    ```javascript
    video.on('error', function(video, error){

    }, scope);
    ```
- A Video has exhausted its allocated time while trying to connect to a video source to start playback.
    ```javascript
    video.on('timeout', function(video){

    }, scope);
    ```
- A Video begins playback.
    ```javascript
    video.on('play', function(video){

    }, scope);
    ```
- A Video finishes playback by reaching the end of its duration, or `markerOut`.
    ```javascript
    video.on('complete', function(video){

    }, scope);
    ```
- A Video that is currently playing has looped.
    ```javascript
    video.on('loop', function(video){

    }, scope);
    ```
- A Video _begins_ seeking to a new point in its timeline.
    ```javascript
    video.on('seeking', function(video){

    }, scope);
    ```
- A Video completes seeking to a new point in its timeline.
    ```javascript
    video.on('seeked', function(video){

    }, scope);
    ```
- Enough of the video source has been loaded, that the browser is able to render a frame from it.
    ```javascript
    video.on('created', function(video, width, height){

    }, scope);
    ```
- A Video is stopped from playback via a call to the `Video.stop` method,
    ```javascript
    video.on('stop', function(video){

    }, scope);
    ```
