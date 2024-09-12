## Boot

```javascript
var config = {
    type: Phaser.AUTO,
    parent: null,
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: null
};
var game = new Phaser.Game(config);
```

### Configuration

[Reference](https://newdocs.phaser.io/docs/3.60.0/Phaser.Types.Core.GameConfig)

```javascript
{
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: false,
    },
    scene: null,
    backgroundColor: 0x333333
}
```

or

```javascript
{
    type: Phaser.AUTO,
    parent: null,
    width: 800,
    height: 600,

    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NO_CENTER,
        resizeInterval: 500,
        // width:
        // height:
        // zoom:
        // parent:
        expandParent: true.
        // min: {width: 0, height: 0},
        // max: {width: 0, height: 0},
        // snap: {width: 0, height: 0},
        // autoRound: false,
        fullscreenTarget: null,
    },

    autoRound: false,
    canvas: null,
    canvasStyle: null,

    scene: null,

    callbacks: {
        preBoot: NOOP,
        postBoot: NOOP
    },

    seed: [ (Date.now() * Math.random()).toString() ],

    title: '',
    url: 'https://phaser.io',
    version: '',

    autoFocus: true,
    input: {
        keyboard: {
            target: window
        },
        mouse: {
            target: null,
            capture: true
        },
        activePointers: 1,
        touch: {
            target: null,
            capture: true
        },
        smoothFactor: 0,
        gamepad: false,
        windowEvents: true,
    },
    disableContextMenu: false,

    backgroundColor: 0,

    render: {
        antialias: true,
        antialiasGL: true,
        desynchronized: false,
        pixelArt: false,
        roundPixels: false,
        transparent: false,
        clearBeforeRender: true,
        preserveDrawingBuffer: false,
        premultipliedAlpha: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default', // 'high-performance', 'low-power' or 'default'
        batchSize: 4096,
        maxLights: 10,
        maxTextures: -1,
        mipmapFilter: 'LINEAR', // 'NEAREST', 'LINEAR', 'NEAREST_MIPMAP_NEAREST', 'LINEAR_MIPMAP_NEAREST', 'NEAREST_MIPMAP_LINEAR', 'LINEAR_MIPMAP_LINEAR'
        autoMobilePipeline: true,
        defaultPipeline: 'MultiPipeline',
        pipeline:[]
    },
    disablePreFX: false,
    disablePostFX: false,

    physics: {
        default: false,  // 'arcade', or 'matter'
        arcade: {...},   // See arcade-world#Configuration
        matter: {...},   // See matterjs-world#Configuration
    },

    loader:{
        baseURL: '',
        path: '',
        maxParallelDownloads: 4,
        crossOrigin: undefined,
        responseType: '',
        async: true,
        user: '',
        password: '',
        timeout: 0,
        maxRetries: 2,
        withCredentials: false,
        imageLoadType: 'XHR',    // 'HTMLImageElement' 
        localScheme: [ 'file://', 'capacitor://' ]
    },

    images: {
        default: 'data:image/png;base64....',
        missing: 'data:image/png;base64....',
        white: 'data:image/png;base64....',
    },

    audio: {
        disableWebAudio: false,
        context:
        noAudio: false,
    },

    dom: {
        createContainer: false,
        behindCanvas: false,
        pointerEvents: 'none'
    },

    plugins: {
        global: [
            //{key, plugin, start}
        ],
        scene: [
            // ...
        ]
    },

    pipeline: { key:PipelineClass },

    fps: {
        min: 10,
        target: 60,
        limit: 0,
        forceSetTimeOut: false,
        deltaHistory: 10,
        panicMax: 120,
        smoothStep: true,
    },

    banner: {
        hidePhaser: false,
        text: '#ffffff',
        background: [
            '#ff0000',
            '#ffff00',
            '#00ff00',
            '#00ffff',
            '#000000'
        ]
    },
    // banner: false,

    stableSort: -1
}
```

## Destroy

```javascript
game.destroy();
// game.destroy(removeCanvas, noReturn);
```

- `removeCanvas` : Set to `true` if you would like the parent canvas element removed from the DOM, or `false` to leave it in place.
- `noReturn` : If `true` all the core Phaser plugins are destroyed. You cannot create another instance of Phaser on the same web page if you do this.

## Global members

### Scene manager

Global [scene manager](scenemanager.md) in `game.scene`, or `scene.scene` in each scene.

### Global data

Instance of [data manager](datamanager.md) in `game.registry`, or `scene.registry` in each scene.

- Get
    ```javascript
    var value = scene.registry.get(key);
    // var value = game.registry.get(key);
    ```
- Set
    ```javascript
    scene.registry.set(key, value);
    // game.registry.set(key, value);
    ```
- Event
    - Set data event
        ```javascript
        scene.registry.events.on('setdata', function(parent, key, value){ /* ... */ });
        // game.registry.events.on('setdata', function(parent, key, value){ /* ... */ })
        ```
    - Change data event
        ```javascript
        scene.registry.events.on('changedata', function(parent, key, value, previousValue){ /* ... */ });
        // game.registry.events.on('changedata', function(parent, key, value, previousValue){ /* ... */ })
        ```
        ```javascript
        scene.registry.events.on('changedata-' + key, function(parent, value, previousValue){ /* ... */ });
        // game.registry.events.on('changedata-' + key, function(parent, value, previousValue){ /* ... */ });
        ```

## Game time

- The time that the current game step started at.
    ```javascript
    var time = game.getTime();
    // var time = scene.game.getTime();
    ```
- The current game frame.
    ```javascript
    var frameCount = game.getFrame();
    // var frameCount = scene.game.getFrame();
    ```
- The delta time, since the last game step. This is a clamped and smoothed average value.
    ```javascript
    var delta = game.loop.delta;
    // var delta = scene.game.loop.delta;
    ```

## Game config

```javascript
var config = game.config;
// var config = scene.game.config;
```

## Window size

- Width
    ```javascript
    var width = game.config.width;
    // var width = scene.game.config.width;
    ```
- Height
    ```javascript
    var height = game.config.height;
    // var height = scene.game.config.height;
    ```

## Pause / Resume

- Pause the entire game and emit a `PAUSE` event.
    ```javascript
    game.pause();
    ```
- Resume the entire game and emit a `RESUME` event.
    ```javascript
    game.resume();
    ```
- Get pause duration
    ```javascript
    var time = game.pauseDuration;
    ```
- Is paused
    ```javascript
    var isPaused = game.isPaused;
    ```

## Events

- Pause(window is invisible)/Resume(window is visible)
    ```javascript
    game.events.on('pause', function() {});
    ```
    ```javascript
    game.events.on('resume', function() {});
    ```
- Destroy event, triggered by `game.destroy()`
    ```javascript
    game.events.on('destroy', function() {})
    ```
- On window focused/blurred
    ```javascript
    game.events.on('focus', function() {})
    ```
    ```javascript
    game.events.on('blur', function(){ })
    ```
