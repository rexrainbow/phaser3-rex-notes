## Introduction

Play youtube video on iframe.

- Author: Rex
- [DOM Game object](domelement.md)

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/youtubeplayer-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexyoutubeplayerplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/youtubeplayer.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/youtubeplayer)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    parent: divId,
    dom: {
        createContainer: true
    },
    plugins: {
        global: [{
            key: 'rexYoutubePlayerPlugin',
            plugin: YoutubePlayerPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

- Set `parent` to divId
- Set `dom.createContainer` to `true`.

### Add youtube player object

- Youtube player on DOM
    ```javascript
    var player = scene.add.rexYoutubePlayer(x, y, width, height, config);
    // var player = scene.add.rexYoutubePlayer(x, y, config);
    // var player = scene.add.rexYoutubePlayer(config);
    ```

Default configuration

```javascript
{
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

    videoId: '',
    autoPlay: true,
    controls: false,
    keyboardControl: true,
    modestBranding: false,
    loop: false,
}
```

- `x`, `y` : Position
- `width`, `height` : Size of element
- `videoId` : The YouTube video ID that identifies the video that the player will load.
- `autoPlay` : Automatically start to play when the player loads.
- `controls` : Whether the video player controls are displayed.
- `keyboardControl` : Set `false` to disable keyboard controls.
- `modestBranding` : Set `false` to prevent the YouTube logo from displaying in the control bar.
- `loop` : Play video when ended.

### Custom class

- Define class
    ```javascript
    class MyYoutubePlayer extends YoutubePlayer {  // or YoutubePlayerCanvas
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config) {
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {
        //     super.preUpdate(time, delta)
        // }
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var player = new MyYoutubePlayer(scene, x, y, width, height, config);
    ```

### Load

```javascript
player.load(videoId);
// player.load(videoId, autoPlay);
```

### Play

```javascript
player.play();
```

### Pause

```javascript
player.pause();
```

### Playback time

- Get
    ```javascript
    var playbackTime = player.playbackTime; // time in seconds
    ```
    ```javascript
    var t = player.t; // t: 0~1
    ```
- Set
    ```javascript
    player.setPlaybackTime(time); // time in seconds
    // player.playbackTime = time;
    ```
    ```javascript
    player.setT(t); // t: 0~1
    // player.t = t;
    ```

### Duration

```javascript
var duration = player.duration;  // time in seconds
```

### Volume

- Get
    ```javascript
    var volume = player.volume;  // volume: 0~1
    ```
- Set
    ```javascript
    player.setVolume(volume);  // volume: 0~1
    // player.volume = volume;
    ```

#### Mute

- Get
    ```javascript
    var muted = player.muted;  // muted: true/false
    ```
- Set
    ```javascript
    player.setMute(muted);  // muted: true/false
    // player.muted = muted;
    ```

### Loop

- Get
    ```javascript
    var loop = player.loop;  // loop: true/false
    ```
- Set
    ```javascript
    player.setLoop(loop);  // loop: true/false
    // player.loop = loop;
    ```

### Resize

```javascript
player.resize(width, height);
```

### Status

- Is playing
    ```javascript
    var isPlaying = player.isPlaying;
    ```
- Is paused
    ```javascript
    var isPaused = player.isPaused;
    ```
- Has end
    ```javascript
    var hasEnded = player.hasEnded;
    ```
- Video state
    ```javascript
    var videoState = player.videoState;
    ```
    or
    ```javascript
    var videoStateString = player.videoStateString;
    ```    
    - `-1` : `unstarted`
    - `0` : `ended`
    - `1` : `playing`
    - `2` : `paused`
    - `3` : `buffering`
    - `5` : `cued`

### Events

- Youtube player api ready
    ```javascript
    player.on('ready', function(player){ }, scope);
    ```
- State change
    ```javascript
    player.on('statechange', function(player){ }, scope);
    ```
    - State : `player.videoState`
- Unstarted
    ```javascript
    player.on('unstarted', function(player){ }, scope);
    ```
- Playing
    ```javascript
    player.on('playing', function(player){ }, scope);
    ```
- Pause
    ```javascript
    player.on('pause', function(player){ }, scope);
    ```
- Ended
    ```javascript
    player.on('ended', function(player){ }, scope);
    ```
- Buffering
    ```javascript
    player.on('buffering', function(player){ }, scope);
    ```
- Video cued
    ```javascript
    player.on('cued', function(player){ }, scope);
    ```
- Error
    ```javascript
    player.on('error', function(player, errorMessage){ }, scope);
    ```

!!! warning "No `Playback time changed` event"
    Get playback time every tick might cause playing video lagging.