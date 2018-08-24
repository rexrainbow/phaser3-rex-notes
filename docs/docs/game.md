## Boot

```javascript
var config = {
    width: 1024,
    height: 768,
    type: Phaser.AUTO,
    parent: null,

    scene: null
};
var game = new Phaser.Game(config);
```

### Configuration

```javascript
{
    width: 1024,
    height: 768,
    zoom: 1,
    resolution: 1,
    type: Phaser.AUTO,

    parent: null,
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
        }
        gamepad: false
    },

    backgroundColor: 0,
    render: {
        antialias: true,
        pixelArt: false,
        autoResize: false,
        roundPixels: false,
        transparent: false,
        clearBeforeRender: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'default', // 'high-performance', 'low-power' or 'default'
        batchSize: 2000
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

## Resize

```javascript
game.resize(width, height);
```

Also fires game.events `resize` event.

## Destroy

```javascript
game.destroy();
// game.destroy(removeCanvas, noReturn);
```

- Also fires game.events `destroy` event.
- `removeCanvas` : Set to `true` if you would like the parent canvas element removed from the DOM, or `false` to leave it in place.
- `noReturn` : If `true` all the core Phaser plugins are destroyed. You cannot create another instance of Phaser on the same web page if you do this.

## Pause / Resume events

- Pause (window is invisible) : game.events `pause` event
- Resume (window is visible) : game.events `resume` event

## Global data

Insatance of [data manager](datamanager.md) in `game.registry`, or `scene.registry` in each scene.