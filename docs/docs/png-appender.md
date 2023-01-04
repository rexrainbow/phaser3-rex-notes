## Introduction

Append user data below tail of PNG data, or extract this user data from PNG data.

- Author: Rex
- Methods

## Live demos

- [Append-extract](https://codepen.io/rexrainbow/pen/zYLKKJP)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/png-appender)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexpngappenderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpngappenderplugin.min.js', true);
    ```
- Append, or extract data
    ```javascript
    var buffer = scene.plugins.get('rexpngappenderplugin').append(pngBuffer, data);
    var data = scene.plugins.get('rexpngappenderplugin').extract(pngBuffer);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PNGAppenderPlugin from 'phaser3-rex-plugins/plugins/pngappender-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPNGAppender',
                plugin: PNGAppenderPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Append, or extract data
    ```javascript
    var buffer = scene.plugins.get('rexPNGAppender').append(pngBuffer, data);
    var data = scene.plugins.get('rexPNGAppender').extract(pngBuffer);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import PNGAppender from 'phaser3-rex-plugins/plugins/pngappender.js';
    ```
- Append, or extract data
    ```javascript
    var buffer = PNGAppender.append(pngBuffer, data);
    var data = PNGAppender.extract(pngBuffer);
    ```

### Append data

```javascript
var resultBuffer = scene.plugins.get('rexPNGAppender').append(pngBuffer, data);
```

- `pngBuffer` : PNG data loaded from [binary loader](loader.md#binary).
- `data` : JSON. dictionary, array, string, number, or Uint8Array.
- `resultBuffer` : PNG data with custom data (`data`). 
    - Can add to texture cache via [`scene.load.image(...)`](loader.md#image)
        1. Create blob from `resultBuffer` : `var blob = new Blob([buffer], { type: 'image/png' })`
        1. Create object url from blob : `var url = window.URL.createObjectURL(blob)`
        1. Load texture from object url : `scene.load.image(textureKey, url)`
        1. Start loader if in *create* stage of scene : `scene.load.start()`
    - Can [download](https://www.npmjs.com/package/file-saver) and display on image viewer as normal PNG file.

### Extract data

```javascript
var data = scene.plugins.get('rexPNGAppender').extract(pngBuffer);
```

- `pngBuffer` : PNG data loaded from [binary loader](loader.md#binary).
