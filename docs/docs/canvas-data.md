## Introduction

Get image data from texture, or text object.

- Author: Rex
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/canvasdata-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexcanvasdataplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/canvasdata)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexCanvasData from './plugins/canvasdata.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import CanvasDataPlugin from './plugins/canvasdata-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCanvasData',
            plugin: CanvasDataPlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Text object -> Bit map

```javascript
var canvasData = scene.plugins.get('rexCanvasData').textObjectToBitMap(textObject);
// var out = scene.plugins.get('rexCanvasData').textObjectToBitMap(textObject, out);
```

- `textObject` : [text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md)
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
    // var out = scene.plugins.get('rexCanvasData').textObjectToBitMap(textureKey, frameName, out);
    ```
- Texture of game object -> Color map
    ```javascript
    var canvasData = scene.plugins.get('rexCanvasData').textureTColorMap(gameObject);
    // var out = scene.plugins.get('rexCanvasData').textObjectToBitMap(gameObject, out);
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
            var alpha = canvasData.color32TAlpha(value);
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
    - `true`, or `false` in result of `textObjectToBitMap` method
    - Color32 in result of `textureTColorMap` method