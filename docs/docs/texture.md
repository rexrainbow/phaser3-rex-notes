## Introduction

Textures cache, built-in object of phaser.

- Author: Richard Davey

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [Loader](loader.md#image)

### Remove texture

```javascript
scene.textures.remove(key);
```

Remove texture stored in texture cache.

### Get texture

```javascript
var texture = scene.textures.get(key);
var image = texture.getSourceImage();
// var width = image.width;
// var height = image.height;
```

### Canvas texture

- Create canvas texture
    ```javascript
    var texture = scene.textures.createCanvas(key, width, height);
    ```
- Get canvas element
    ```javascript
    var canvas = texture.getSourceImage();
    var context = canvas.getContext('2d');
    ```
    [Canvas api](https://www.w3schools.com/html/html5_canvas.asp)
- Refresh canvas texture
    ```javascript
    texture.refresh();
    ```
- Generate
    ```javascript
    var config = {
        data: data,
        // 3x3:
        // [ '...',
        //   '...',
        //   '...' ]

        pixelWidth: 1,    // pixel width of each data
        pixelHeight: 1,   // pixel height of each data

        preRender: null,  // callback, function(canvas, ctx) {}
        postRender: null, // callback, function(canvas, ctx) {}
        
        canvas: null,  // create a canvas if null
        resizeCanvas: true,
        clearCanvas: true
    };
    var texture = scene.textures.generate(key, config);
    ```

### Get pixel

```javascript
var color = scene.textures.getPixel(x, y, key);
// var color = scene.textures.getPixel(x, y, key, frame);
```

Properties of `color`

- `r` : 0 ~ 255
- `g` : 0 ~ 255
- `b` : 0 ~ 255
- `a` : 0 ~ 255
- `color` : [color](color.md) integer

```javascript
var alpha = scene.textures.getPixelAlpha(x, y, key);
// var alpha = scene.textures.getPixelAlpha(x, y, key, frame);
```

alpha : 0 ~ 255

Return `null` if the coordinates were out of bounds.
