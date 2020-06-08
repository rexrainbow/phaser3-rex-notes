## Introduction

Particles' emitter zone from canvas bitmap of text/canvas game object.

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
- Add bitmap-zone object
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
- Add bitmap-zone object
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
- Add bitmap-zone object
    ```javascript
    var bitmapZone = new BitmapZone(gameObject, config);
    ```

### Create shape

```javascript
var bitmapZone = scene.plugins.get('rexBitmapZone').add(gameObject);
```

- `gameObject` :
    - Any kind of text object : [Text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).
    - [Canvas](canvas.md) object

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
bitmapZone.setSource(gameObject);
```
