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
```

### Play

```javascript
video.play();
// video.play(loop, markerIn, markerOut);
```

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
video.snapshot();
// video.snapshot(width, height);
```

or

```javascript
video.snapshotArea(x, y, srcWidth, srcHeight);
// video.snapshotArea(x, y, srcWidth, srcHeight, destWidth, destHeight);
```

- `x`, `y` : The horizontal/vertical location of the top-left of the area to grab from.
- `srcWidth`, `srcHeight` : The width/height of area to grab from the video.
- `destWidth`, `destHeight` : The destination width/height of the grab, allowing you to resize it.