## Introduction

Play video on [DOM](https://www.w3schools.com/html/html5_video.asp), or on canvas.

- Author: Rex
- [DOM Game object](domelement.md), or [Canvas Game object](canvas.md)

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/video-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexvideoplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/video.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/video)

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
            key: 'rexVideoPlugin',
            plugin: VideoPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

- To play video on DOM
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.

### Add video object

- Video on DOM
    ```javascript
    var video = scene.add.rexVideo(x, y, width, height, config);
    // var video = scene.add.rexVideo(x, y, config);
    // var video = scene.add.rexVideo(config);
    ```
- Video on canvas
    ```javascript
    var video = scene.add.rexVideoCanvas(x, y, width, height, config);
    // var video = scene.add.rexVideoCanvas(x, y, config);
    // var video = scene.add.rexVideoCanvas(config);
    ```

Default configuration

```javascript
{
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

    // Element properties
    src: url,
    // src: {
    //     webm: webmFileURL,
    //     ogg: oggFileURL,
    //     mp4: mp4FileURL,
    //     h264: h264FileURL,
    // }
    id: undefined,
    autoPlay: true,
    controls: false,
    loop: false,
    muted: false,
    playsInline: true,
    crossOrigin: 'anonymous',
}
```

- `x`, `y` : Position
- `width`, `height` : Size of element
- Element properties
    - `src` : Specifies the URL of the video file.
        - A string : url of the video file.
        - A plain object : `{ videoType: fileURL }`
            1. Get `webmFileURL` if browser supports webm video format.
            1. Get `oggFileURL` if browser supports ogg video format.
            1. Get `mp4FileURL` if browser supports mp4 video format.
            1. Get `h264FileURL` if browser supports h264 video format.
    - `id` : `id` element property.
    - `autoPlay` : `autoplay` element property.
    - `controls` : `controls` element property.
    - `loop` : `loop` element property.
    - `muted` : `muted` element property.
    - `playsInline` : `playsInline` element property.
    - `crossOrigin` : `crossOrigin` element property.

#### Different between rexVideo and rexVideoCanvas

- `rexVideo` plays video on DOM.
    - DOM object always above game canvas.
    - Won't be affected by webgl shader.
    - Right clicks to pop up a menu.    
- `rexVideoCanvas` plays video on canvas.
    - Can be placed between game objects via depth setting.
    - Can be affected by webgl shader.

### Custom class

- Define class    
    ```javascript
    class MyVideo extends Video {  // or VideoCanvas
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config) {
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
    var video = new MyVideo(scene, x, y, width, height, config);
    ```

### Resize

```javascript
video.resize(width, height);
```

### Events

- Load start
    ```javascript
    video.on('loadstart', function(video){ }, scope);
    ```
- Can play
    ```javascript
    video.on('canplay', function(video){ }, scope);
    ```
- Can play through
    ```javascript
    video.on('canplaythrough', function(video){ }, scope);
    ```
- Playing
    ```javascript
    video.on('playing', function(video){ }, scope);
    ```
- Pause
    ```javascript
    video.on('pause', function(video){ }, scope);
    ```
- Stalled
    ```javascript
    video.on('stalled', function(video){ }, scope);
    ```
- Ended
    ```javascript
    video.on('ended', function(video){ }, scope);
    ```
- Error
    ```javascript
    video.on('error', function(video){ }, scope);
    ```