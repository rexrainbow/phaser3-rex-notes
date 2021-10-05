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

[Reference](https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig)

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
        autoCenter: Phaser.Scale.NO_CENTER
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
        pipeline:[]
    },

    physics: {
        default: false  // no physics system enabled
    },

    loader:{
        baseURL: '',
        path: '',
        enableParallel: true,
        maxParallelDownloads: 4,
        crossOrigin: undefined,
        responseType: '',
        async: true,
        user: '',
        password: '',
        timeout: 0
    },

    images: {
        default: 'data:image/png;base64....',
        missing: 'data:image/png;base64....'
    },

    dom: {
        createContainer: false,
        behindCanvas: false,
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
        forceSetTimeOut: false,
        deltaHistory: 10
    },

    disableContextMenu: false,
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
    }
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
