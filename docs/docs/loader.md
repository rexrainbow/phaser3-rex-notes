## Introduction

Load assets, built-in object of phaser.

- Author: Richard Davey

## Usage

### Loading in preload stage

```javascript
scene.load.image(key, url);
```

Loader in preload stage will start loading automatically by scene.

### Loading after preload stage

```javascript
scene.load.image(key, url);   // add task
scene.load.once('complete', callback);  // add callback of 'complete' event
scene.load.start();                     // start loading
```

### Events

- Start loading

    ```javascript
    scene.load.once('start', function(){});
    ```

- Loading progressing

    ```javascript
    scene.load.once('progress', function(progress){});
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

```javascript
scene.load.image(key, url);  // image
scene.load.svg(key, url);    // image in svg format
scene.load.html(key, url, width, height);  // image in html format
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

#### Script

```javascript
scene.load.script(key, url);
```

#### GLSL

```javascript
scene.load.glsl(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.shader;
var data = cache.get(key);
```

#### Binary

```javascript
scene.load.binary(key, url);
```

Get data from cache

```javascript
var cache = scene.cache.binary;
var data = cache.get(key);
```

#### Plugin

```javascript
scene.load.plugin(key, url);
```

### Release data

```javascritp
var cache = scene.cache.text;
cache.remove(key);
```

### Data in cache

```javascritp
var cache = scene.cache.text;
var hasData = cache.has(key);
```
