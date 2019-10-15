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

[Reference](https://photonstorm.github.io/phaser3-docs/global.html?fbclid=IwAR2qMGrPGJwu2t_ijZy64Kg6pEoDpofRYkuvwa6QxtwyVe-g9l0kG6DRhKM#GameConfig)

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
        pixelArt: false,
        roundPixels: false,
        transparent: false,
        clearBeforeRender: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default', // 'high-performance', 'low-power' or 'default'
        batchSize: 2000,
        desynchronized: false,
    },

    physics: {
        default: false  // no physics system enabled
    },
    //physics: {
    //    system: 'impact',
    //    setBounds: true,
    //    gravity: 0,
    //    cellSize: 64
    //},

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

- Also fires game.events `destroy` event.
- `removeCanvas` : Set to `true` if you would like the parent canvas element removed from the DOM, or `false` to leave it in place.
- `noReturn` : If `true` all the core Phaser plugins are destroyed. You cannot create another instance of Phaser on the same web page if you do this.

## Pause / Resume events

- Pause (window is invisible)
    ```javascript
    game.events.on('pause', function() {});
    ```
- Resume (window is visible)
    ```javascript
    game.events.on('resume', function() {});
    ```

## Global members

### Scene manager

Global [scene manager](scenemanager.md) in `game.scene`, or `scene.scene` in each scene.

### Global data

Instance of [data manager](datamanager.md) in `game.registry`, or `scene.registry` in each scene.

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