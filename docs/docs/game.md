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
    scene: null,
    backgroundColor: 0x333333
}
```

or

```javascript
{
    autoRound: false,
    type: Phaser.AUTO,
    parent: null,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NO_CENTER
    },
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
        gamepad: false
    },

    backgroundColor: 0,
    render: {
        antialias: true,
        pixelArt: false,
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

## Global members

### Scene manager

Global [scene manager](scenemanager.md) in `game.scene`, or `scene.scene` in each scene.

### Global data

Insatance of [data manager](datamanager.md) in `game.registry`, or `scene.registry` in each scene.