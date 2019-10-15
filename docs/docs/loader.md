## Introduction

Load assets, built-in object of phaser.

- Author: Richard Davey

## Usage

### Loading in preload stage

```javascript
scene.load.image(key, url);
// scene.load.image(config); // config: {key, url}
```

Loader in preload stage will start loading automatically by scene.

### Loading after preload stage

```javascript
scene.load.image(key, url);   // add task
// scene.load.image(config); // config: {key, url}
scene.load.once('complete', callback);  // add callback of 'complete' event
scene.load.start();                     // start loading
```

### Set path

```javascript
scene.loader.setPath(path)
```

### Events

- Start loading
    ```javascript
    scene.load.once('start', function(){});
    ```
- Loading progressing
    ```javascript
    scene.load.on('progress', function(progress){});
    ```
- Loading a file object successful
    ```javascript
    scene.load.once('load', function(fileObj){});
    ```
- Loading a file object failed
    ```javascript
    scene.load.once('loaderror', function(fileObj){});
    ```
- All loading completed
    ```javascript
    scene.load.once('complete', function(){});
    ```

### Status of loader

- Ready to start loading
    ```javascript
    var isReady = scene.load.isReady();
    ```
- Is loading
    ```javascript
    var isLoading = scene.load.isLoading();
    ```

### File types

#### Image

- Image
    ```javascript
    scene.load.image(key, url);
    ```
- SVG
    ```javascript
    scene.load.svg(key, url);
    // scene.load.svg(key, url, {width, height});
    // scene.load.svg(key, url, {scale});
    ```
- Html texture
    ```javascript
    scene.load.htmlTexture(key, url, width, height);
    ```

Get data from texture cache

```javascript
var cache = scene.textures;
var data = cache.get(key);
```

#### Sprite sheet

```javascript
scene.load.spritesheet(key, url, {
    // frameWidth: frameWidth,
    // frameHeight: frameHeight,
    // startFrame: startFrame,
    // endFrame: endFrame,
    // margin: margin,
    // spacing: spacing
});
```

Get data from texture cache

```javascript
var cache = scene.textures;
var data = cache.get(key);
```

#### Texture atlas

```javascript
scene.load.atlas(key, textureURL, atlasURL);
```

Get data from texture cache

```javascript
var cache = scene.textures;
var data = cache.get(key);
```

#### Multi file texture atlas

```javascript
scene.load.multiatlas(key, textureURLs, atlasURLs);
```

#### Unity texture atlas

```javascript
scene.load.unityAtlas(key, textureURL, atlasURL);
```

#### Animation

```javascript
scene.load.animation(key, url);
```

#### Audio

```javascript
scene.load.audio(key, urls);
```

Get data from cache

```javascript
var cache = scene.cache.audio;
var data = cache.get(key);
```

#### Audio sprite

```javascript
scene.load.audioSprite(key, urls, json, config);
```

#### Video

```javascript
scene.load.video(key, url, loadEvent, asBlob, noAudio);
```

- `loadEvent` : The load event to listen for when *not* loading as a blob.
    - `'loadeddata'` : Data for the current frame is available. Default value.
    - `'canplay'` : The video is ready to start playing.
    - `'canplaythrough'` : The video can be played all the way through, without stopping.
- `asBlob` : Load the video as a data blob, or via the Video element? Default value is `false`.
- `noAudio` : Does the video have an audio track? If not you can enable auto-playing on it. Default value is `false`.

#### Bitmap font

```javascript
scene.load.bitmapFont(key, textureURL, xmlURL);
```

Get data from cache

```javascript
var cache = scene.cache.bitmapFont;
var data = cache.get(key);
```

#### Tile map

```javascript
scene.load.tilemapWeltmeister(key, url);  // JSON
scene.load.tilemapCSV(key, url);          // CSV
```

Get data from cache

```javascript
var cache = scene.cache.tilemap;
var data = cache.get(key);
```

#### Text

```javascript
scene.load.text(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.text;
var data = cache.get(key);
```

#### JSON

```javascript
scene.load.json(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.json;
var data = cache.get(key);
```

#### XML

```javascript
scene.load.xml(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.xml;
var data = cache.get(key);
```

#### HTML

```javascript
scene.load.html(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.html;
var data = cache.get(key);
```

#### CSS

```javascript
scene.load.css(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.css;
var data = cache.get(key);
```

#### Scene

```javascript
scene.load.sceneFile(key, url);
```

The `key` matches the **class name** in the JavaScript file.

#### Script

```javascript
scene.load.script(key, url);
```

##### Scripts

```javascript
scene.load.scripts(key, urlArray);
```

Add scripts in the exact order of `urlArray`.

#### GLSL

```javascript
scene.load.glsl(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.shader;
var data = cache.get(key);
```

A glsl file can contain multiple shaders, all separated by a frontmatter block.

```GLSL
---
name: 
type: 
---

void main(void)
{
}
```

#### Binary

```javascript
scene.load.binary(key, url, dataType);  // dataType: Uint8Array
// scene.load.binary(config); // config: {key, url, dataType}
```

Get data from cache

```javascript
var cache = scene.cache.binary;
var data = cache.get(key);
```

#### Plugin

```javascript
scene.load.plugin(key, url, true); // start plugin when loaded
```

- `url` : File url or class instance.

#### Scene plugin

```javascript
scene.load.scenePlugin(key, url, systemKey, sceneKey);
```

- `url` : File url or class instance.

#### File pack

Load files in JSON format.

```javascript
scene.load.pack(key, url, dataKey);
```

JSON pack file:

```javascript
{
    'dataKey': {
        // "prefix": "...",          // optional, extend key by prefix
        // "path": "...",            // optional, extend url by path
        // "defaultType": "image",   // optional, default file type
        'files': [
            {
                'type': 'image',
                'key': '...',
                'url': '...'
            },
            {
                'type': 'image',
                'key': '...',
                'url': '...'
            }
            // ...
        ]
    },

    'node0': {
        'node1': {
            'node2': {
                'files': [
                    // ....
                ]
            }
        }
    }
    // dataKey: 'node0.node1.node2'
}
```

File type:

- `animationJSON`
- `audio`
- `binary`
- `glsl`
- `html`
- `htmlTexture`
- `image`
- `json`
- `script`
- `spritesheet`
- `svg`
- `text`
- `tilemapCSV`
- `tilemapJSON`
- `xml`

### Release data

```javascript
var cache = scene.cache.text;
cache.remove(key);
```

### Data in cache

```javascript
var cache = scene.cache.text;
var hasData = cache.has(key);
```

### Replace

1. [Remove key](loader.md#release-data).
1. Load file again.