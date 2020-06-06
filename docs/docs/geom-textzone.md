## Introduction

Bitmap of a text game object' canvas. Designed for emitting particles from text.

- Author: Rex
- Geometry object

## Live demo

- [Particles](https://codepen.io/rexrainbow/pen/eYJmxwp)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/textzone)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextextzoneplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextzoneplugin.min.js', true);
    ```
- Add text-zone geometry object
    ```javascript
    var textZone = scene.plugins.get('rextextzoneplugin').add(textObject);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TextZonePlugin from 'phaser3-rex-plugins/plugins/textzone-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTextZone',
                plugin: TextZonePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add text-zone geometry object
    ```javascript
    var textZone = scene.plugins.get('rexTextZone').add(textObject);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TextZone from 'phaser3-rex-plugins/plugins/textzone.js';
    ```
- Add text-zone geometry object
    ```javascript
    var textZone = new TextZone(textObject);
    ```

### Create shape

```javascript
var textZone = scene.plugins.get('rexTextZone').add(textObject);
```

- `textObject` : [Text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md). 

!!! warning "Don't destroy textObject"
    Position and display origin point of `textObject` are used for getting random point (*getRandomPoint*)

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
            source: textZone
        }
    }
]);
```

`textZone` provides *getRandomPoint* method.

### Update bitmap

Call this method when text content is changed.

```javascript
textZone.updateSource();
```
