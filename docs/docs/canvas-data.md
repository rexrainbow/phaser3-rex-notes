## Introduction

Get image data from texture, or text object.

- Author: Rex
- Method only

## Live demos

- [Text to bit-map](https://codepen.io/rexrainbow/pen/RzzOjK)
- [Texture to color-map](https://codepen.io/rexrainbow/pen/dBBLvY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/canvasdata)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcanvasdataplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasdataplugin.min.js', true);
    ```
- Add canvas-data object
    ```javascript
    var canvasData = scene.plugins.get('rexcanvasdataplugin').canvasObjectToBitmap(gameObject);
    var canvasData = scene.plugins.get('rexcanvasdataplugin').textureTColorMap(textureKey, frameName);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CanvasDataPlugin from 'phaser3-rex-plugins/plugins/canvasdata-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCanvasData',
                plugin: CanvasDataPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add canvas-data object
    ```javascript
    var canvasData = scene.plugins.get('rexCanvasData').canvasObjectToBitmap(gameObject);
    var canvasData = scene.plugins.get('rexCanvasData').textureTColorMap(textureKey, frameName);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CanvasData from 'phaser3-rex-plugins/plugins/canvasdata.js';
    ```
- Add canvas-data object
    ```javascript
    var canvasdata = CanvasData.canvasObjectToBitmap(gameObject);
    var canvasdata = CanvasData.textureTColorMap(textureKey, frameName);
    ```

### Text/canvas object -> Bitmap

```javascript
var canvasData = scene.plugins.get('rexCanvasData').canvasObjectToBitmap(gameObject);
// var out = scene.plugins.get('rexCanvasData').canvasObjectToBitmap(gameObject, out);
```

- `gameObject` : 
    - Any kind of text object : [Text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md). 
    - [Canvas](canvas.md) object
- For each pixel data
    ```javascript
    canvasData.forEach(function(value, x, y, canvasData){

    }, scope);
    ```
    - `value` : `true`, or `false`

### Texture -> Color map

- Texture -> Color map
    ```javascript
    var canvasData = scene.plugins.get('rexCanvasData').textureTColorMap(textureKey, frameName);
    // var out = scene.plugins.get('rexCanvasData').canvasObjectToBitmap(textureKey, frameName, out);
    ```
- Texture of game object -> Color map
    ```javascript
    var canvasData = scene.plugins.get('rexCanvasData').textureTColorMap(gameObject);
    // var out = scene.plugins.get('rexCanvasData').canvasObjectToBitmap(gameObject, out);
    ```
- For each pixel data
    ```javascript
    canvasData.forEach(function(value, x, y, canvasData){

    }, scope);
    ```
    - `value` : Color32 integer = color integer + (alpha << 24)
        - Get color integer (0 ~ 0xffffff)
            ```javascript
            var color = value & 0xffffff;
            ```
            or
            ```javascript
            var color = canvasData.color32ToColorInt(value);
            ```
        - Get alpha (0 ~ 0xff)
            ```javascript
            var alpha = value >>> 24;
            ```
            ```javascript
            var alpha = canvasData.color32ToAlpha(value);
            ```

### Canvas data

#### For each pixel

- For each pixel data
    ```javascript
    canvasData.forEach(callback, scope);
    ```
    - `callback` : Callback for each pixel
        ```javascript
        function(value, x, y, canvasData) {
    
        }
        ```
- For each non zero pixel data
    ```javascript
    canvasData.forEachNonZero(callback, scope);
    ```

#### Get pixel data

```javascript
var data = canvasData.get(x, y);
```

- `data` :
    - `true`, or `false` in result of `canvasObjectToBitmap` method
    - Color32 in result of `textureTColorMap` method