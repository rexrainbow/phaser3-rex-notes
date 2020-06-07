## Introduction

Bitmap of a text/canvas game object. Designed for emitting particles from text.

- Author: Rex
- Geometry object

## Live demo

- [Particles](https://codepen.io/rexrainbow/pen/eYJmxwp)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bitmapzone)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbitmapzoneplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbitmapzoneplugin.min.js', true);
    ```
- Add bitmap-zone geometry object
    ```javascript
    var bitmapZone = scene.plugins.get('rexbitmapzoneplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BitmapZonePlugin from 'phaser3-rex-plugins/plugins/bitmapzone-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexBitmapZone',
                plugin: BitmapZonePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add bitmap-zone geometry object
    ```javascript
    var bitmapZone = scene.plugins.get('rexBitmapZone').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import BitmapZone from 'phaser3-rex-plugins/plugins/bitmapzone.js';
    ```
- Add bitmap-zone geometry object
    ```javascript
    var bitmapZone = new BitmapZone(gameObject, config);
    ```

### Create shape

```javascript
var bitmapZone = scene.plugins.get('rexBitmapZone').add(gameObject, {
    // offsetX: undefined,
    // OffsetY: undefined
});
```

- `gameObject` : 
    - Any kind of text object : [Text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md). 
    - [Canvas](canvas.md) object
- `offsetX`, `offsetY` : Offset of bitmap data.
    - `undefined` : Set `offsetX` to `gameObject.displayOriginX`, and `offsetY` to `gameObject.displayOriginY`

### [Emit zone](particles.md#emit-zone)

```javascript
var particles = scene.add.particles(key,
[
    // emitter config
    {
        // blendMode:
        // scale:
        // speed:
        // garvityY:
        emitZone: {
            type: 'random',
            source: bitmapZone
        }
    }
]);
```

`bitmapZone` provides *getRandomPoint* method.

### Update content

```javascript
bitmapZone.setSource(gameObject, {
    // offsetX: undefined,
    // OffsetY: undefined
});
```
